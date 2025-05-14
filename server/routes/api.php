<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Middleware\RoleMiddleware;  // Si usas RoleMiddleware directamente

// Rutas de autenticación
Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);

// Rutas protegidas por roles
Route::middleware(['auth:sanctum', RoleMiddleware::class.':super-admin'])->get('/super-admin-dashboard', function () {
    return response()->json(['message' => 'Bienvenido Super Admin']);
});

Route::middleware(['auth:sanctum', RoleMiddleware::class.':seller'])->get('/seller-dashboard', function () {
    return response()->json(['message' => 'Bienvenido Seller']);
});

Route::middleware(['auth:sanctum', RoleMiddleware::class.':customer'])->get('/customer-dashboard', function () {
    return response()->json(['message' => 'Bienvenido Customer']);
});

