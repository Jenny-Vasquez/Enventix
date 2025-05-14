<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
   use  HasFactory, Notifiable;

    protected $fillable = [
        'name', 'email', 'password', 'role'
    ];

    protected $hidden = [
        'password', 'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function setRoleAttribute($value)
    {
        // Asegúrate de que el rol sea válido
        $validRoles = ['super-admin', 'seller', 'customer'];
        if (in_array($value, $validRoles)) {
            $this->attributes['role'] = $value;
        } else {
            $this->attributes['role'] = 'customer';  // Default role
        }
    }
}