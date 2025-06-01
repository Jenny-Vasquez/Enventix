<?php

namespace App\Http\Middleware;

use Illuminate\Auth\Middleware\Authenticate as Middleware;

class Authenticate extends Middleware
{
    protected function redirectTo($request)
    {
        // Para APIs, devolvemos JSON en vez de redirigir
        if (! $request->expectsJson()) {
            abort(response()->json(['error' => 'Unauthorized'], 401));
        }
    }
}
