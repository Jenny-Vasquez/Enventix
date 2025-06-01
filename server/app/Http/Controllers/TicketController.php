<?php

namespace App\Http\Controllers;

use App\Models\Ticket;
use Illuminate\Http\Request;
use App\Models\Events;
use Illuminate\Support\Facades\Auth;

class TicketController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }



    public function getEventUser(Request $request)
    {
        // Obtener el ID del usuario autenticado desde el token JWT
        $user_id = $request->user()->id;

        // Obtener todas las entradas de ese usuario
        $entradas = Ticket::where('user_id', $user_id)->get();

        // Obtener los IDs de los eventos en los que el usuario ha comprado entradas
        $evento_ids = $entradas->pluck('events_id');

        // Obtener los eventos correspondientes
        $eventos = Ticket::whereIn('_id', $evento_ids)->get();

        return response()->json($eventos);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        // Validar los datos del pago
        $validated = $request->validate([
            'event_id' => 'required|exists:events,_id',
            'amount' => 'required|integer|min:1',
            'seats' => 'required|array|min:1',
            'seats.*.number' => 'required|integer',
            'seats.*.zoneName' => 'required|string',
        ]);

        $user = Auth::user(); // Obtener al usuario autenticado

        // Crear la entrada asociada al usuario y evento
        $entrada = new Ticket();
        $entrada->user_id = $user->id;
        $entrada->evento_id = $validated['event_id'];
        $entrada->cantidad = $validated['amount'];
        $entrada->purchase_date = now();
        $entrada->seats = $validated['seats'];

        // Guardar la entrada en la base de datos
        $entrada->save();

        return response()->json([
            'message' => 'Compra realizada con éxito',
            'entrada' => $entrada,
        ]);
    }

    public function getEventByUser($user_id)
    {
        $entradas = Ticket::where('user_id', $user_id)->get();
        return response()->json($entradas);
    }


    public function getSoldSeats($event_id)
    {
        // Buscar todas las entradas para el evento
        $entradas = Ticket::where('evento_id', $event_id)->get();

        // Extraer los asientos vendidos
        $asientosVendidos = $entradas->flatMap(function ($ticket) {
            return $ticket->seats ?? []; // aseguramos que no sea null
        });

        return response()->json($asientosVendidos);
    }

    public function getSeatsByEvent($event_id)
    {
        $tickets = Ticket::where('evento_id', $event_id)->get();
        return response()->json($tickets);
    }
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request) {}

    /**
     * Display the specified resource.
     */
    public function show(Ticket $ticket)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Ticket $ticket)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Ticket $ticket)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Ticket $ticket)
    {
        //
    }
}
