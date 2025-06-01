<?php

namespace App\Models;

use MongoDB\Laravel\Eloquent\Model;

class Plan extends Model
{
    protected $connection = 'mongodb';
    protected $collection = 'events';

    protected $primaryKey = '_id';         // <- necesario para MongoDB
    public $incrementing = false;          // <- Mongo usa ObjectId, no entero auto-incremental
    protected $keyType = 'string';         // <- el ObjectId se convierte a string

    protected $fillable =  ['name', 'zones', 'creator'];
    protected $casts = [
        'zones' => 'array',
    ];
}
