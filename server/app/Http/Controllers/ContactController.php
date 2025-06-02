<?php

namespace App\Http\Controllers;

use App\Models\Incidencia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class ContactController extends Controller
{
    public function store(Request $request)
    {
        Log::info('Formulario recibido', $request->all());

        Incidencia::create($request->only(['email', 'telefono', 'asunto', 'descripcion']));
        return response()->json(['message' => 'Incidencia registrada'], 201);
    }

    public function index(Request $request)
    {
        if ($request->user()->role !== 'super-admin') {
            return response()->json(['error' => 'No autorizado'], 403);
        }

        return Incidencia::all();
    }

    public function show(Request $request, $id)
    {
        if ($request->user()->role !== 'super-admin') {
            return response()->json(['error' => 'No autorizado'], 403);
        }

        return Incidencia::find($id);
    }

    public function destroy(Request $request, $id)
    {
        if ($request->user()->role !== 'super-admin') {
            return response()->json(['error' => 'No autorizado'], 403);
        }

        Incidencia::find($id)?->delete();
        return response()->noContent();
    }
}
