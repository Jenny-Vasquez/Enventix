<?php

namespace App\Http\Controllers;

use App\Models\Events;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;


class EventsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        $events = Events::all();
        return response()->json($events);
        //  return response()->json(['status' => 'ok']);
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
            'title' => 'required|string',
            'location' => 'required|string',
            // 'organizer' => 'required|string',
            'tags' => 'nullable|array',
            'tags.*' => 'string',
            'date' => 'required|date',
            'time' => 'required|string', 
            'description' => 'nullable|string',
            'image' => 'nullable|image|max:2048',
            'plan_id' => 'nullable|string|exists:plans,id'
        ]);

        // Validar que el plan pertenezca al usuario autenticado (si se proporciona)
        if (isset($validated['plan_id'])) {
            $plan = \App\Models\Plan::where('id', $validated['plan_id'])
                ->where('user_id', $user->id)
                ->first();

            if (!$plan) {
                return response()->json(['error' => 'El plano seleccionado no es válido o no te pertenece.'], 403);
            }
        }

        // Guarda la imagen si se subió
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('event-images', 'public');
            $validated['image'] = $imagePath;
        }

        $validated['organizer'] = [
            'id' => $user->id,
            'name' => $user->name,
        ];

        $event = Events::create($validated);

        return response()->json([
            'message' => 'Evento creado exitosamente',
            'event' => $event
        ], 201);
    }


    /**
     * Display the specified resource.
     */
    public function show(Events $events, $id)
    {
        $event = $events::find($id);

        if (!$event) {
            return response()->json(['mensaje' => 'Evento no encontrado'], 404);
        }

        return response()->json($event);
    }


    public function myEvents(Request $request)
    {
        $user = Auth::user();

        if (!$user) {
            return response()->json(['error' => 'No autenticado'], 401);
        }

        // Buscar eventos donde el organizer.id coincida con el id del usuario
        //esto es porque el id y el nombre del organizador se están guardando como una cadena JSON (string)
        $events = Events::where('organizer', 'like', '%"id":"' . $user->id . '"%')->get();

        return response()->json($events);
    }




    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Events $events)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Events $events)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Events $events)
    {
        //
    }
}
