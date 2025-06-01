<?php

namespace App\Http\Controllers;

use App\Models\Plan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class PlanController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = Auth::user();

        if (!$user) {
            return response()->json(['error' => 'Usuario no autenticado'], 401);
        }

        if ($user->role !== 'seller') {
            return response()->json(['error' => 'Acceso no autorizado'], 403);
        }

        $plans = Plan::where('user_id', $user->id)->get()->map(function ($plan) {
            return [
                'id' => (string) $plan->_id, // <- convierte ObjectId a string
                'name' => $plan->name,
                'zones' => $plan->zones,
                'creator' => $plan->creator,
                'user_id' => $plan->user_id,
            ];
        });
        
        return response()->json(['plans' => $plans]);

    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $user = Auth::user();

        if (!$user) {
            return response()->json(['error' => 'Usuario no autenticado'], 401);
        }

        if ($user->role !== 'seller') {
            return response()->json(['error' => 'Acceso no autorizado'], 403);
        }

        $validated = $request->validate([
            'name' => 'required|string',
            'zones' => 'required',
        ]);

        // Verifica si `zones` es una cadena JSON
        if (is_string($validated['zones'])) {
            // Si es un string, lo decodifica a un array
            $decodedZones = json_decode($validated['zones'], true);

            if (json_last_error() !== JSON_ERROR_NONE) {
                return response()->json(['error' => 'Formato JSON inválido en zones'], 422);
            }

            // Sobrescribe el campo zones con el array decodificado
            $validated['zones'] = $decodedZones;
        } elseif (is_array($validated['zones'])) {
            // Si ya es un array, no hace falta decodificar
            $validated['zones'] = $validated['zones'];
        } else {
            return response()->json(['error' => 'El campo zones debe ser un array o un JSON válido'], 422);
        }

        // Agrega los datos del creador
        $validated['creator'] = [
            'id' => $user->id,
            'name' => $user->name,
        ];

        // Crea el nuevo diseño
        $plan = new Plan($validated);
        $plan->user_id = $user->id;

        // Guarda el nuevo plan
        $plan->save();

        return response()->json([
            'message' => 'Diseño guardado exitosamente',
            'plan' => $plan,
        ], 201);
    }


    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $design = Plan::find($id);

        if (!$design) {
            return response()->json(['message' => 'Diseño no encontrado'], 404);
        }

        return response()->json($design);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Plan $plan)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Plan $plan)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Plan $plan)
    {
        //
    }
}
