<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Middleware\RoleMiddleware;  


Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);

//Routes protected by roles
Route::middleware(['auth:sanctum', RoleMiddleware::class.':super-admin'])->get('/super-admin-dashboard', function () {
    return response()->json(['message' => 'Bienvenido Super Admin']);
});

Route::middleware(['auth:sanctum', RoleMiddleware::class.':seller'])->get('/seller-dashboard', function () {
    return response()->json(['message' => 'Bienvenido Seller']);
});

Route::middleware(['auth:sanctum', RoleMiddleware::class.':customer'])->get('/customer-dashboard', function () {
    return response()->json(['message' => 'Bienvenido Customer']);
});


Route::get('ping', function () { return 'pong'; });