<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Middleware\RoleMiddleware;

// Rutas públicas
Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);

// Rutas protegidas por JWT y roles
Route::middleware(['auth:api', RoleMiddleware::class . ':super-admin'])->get('/super-admin-dashboard', function () {
    return response()->json(['message' => 'Bienvenido Super Admin']);
});

Route::middleware(['auth:api', RoleMiddleware::class . ':seller'])->get('/seller-dashboard', function () {
    return response()->json(['message' => 'Bienvenido Seller']);
});

Route::middleware(['auth:api', RoleMiddleware::class . ':customer'])->get('/customer-dashboard', function () {
    return response()->json(['message' => 'Bienvenido Customer']);
});

// Obtener usuario autenticado
Route::middleware('auth:api')->get('/user', [AuthController::class, 'user']);


Route::get('ping', function () { return 'pong'; });