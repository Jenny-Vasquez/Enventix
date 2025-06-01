<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Middleware\RoleMiddleware;
use App\Http\Controllers\EventsController;
use App\Http\Controllers\TicketController;
use App\Http\Controllers\PlanController;
use App\Http\Controllers\ReviewController;

// Rutas públicas
Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);

// Rutas protegidas por JWT y roles
Route::middleware(['auth:api', RoleMiddleware::class . ':super-admin'])->get('/super-admin-dashboard', function () {
    return response()->json(['message' => 'Bienvenido Super Admin']);
});

Route::middleware(['auth:api'])->group(function () {
    Route::put('/user/profile', [AuthController::class, 'update']);


});

// Obtener usuario autenticado
Route::middleware('auth:api')->get('/user', [AuthController::class, 'user']);
Route::middleware('auth:api')->put('/user', [AuthController::class, 'update']);

// Obtener los eventos 
Route::get('/events', [EventsController::class, 'index']);
Route::get('/events/{id}', [EventsController::class, 'show']);
Route::middleware('auth:api')->post('/eventCreate', [EventsController::class, 'store']);
Route::middleware('auth:api')->get('/myEvents', [EventsController::class, 'myEvents']);

// Planos
Route::post('/plan-designs', [PlanController::class, 'store']);


// Tickets
Route::middleware('auth:api')->post('/tickets', [TicketController::class, 'create']);
Route::middleware('auth:api')->get('/tickets/{user_id}', [TicketController::class, 'getEventByUser']);

// Reviews
Route::middleware('auth:api')->group(function () {
    Route::post('/events/{event}/reviews', [ReviewController::class, 'store']);
    Route::get('/user/reviews', [ReviewController::class, 'index']);
    Route::get('/events/without-review', [EventsController::class, 'eventsWithoutReview']);
});


Route::get('ping', function () { return 'pong'; });