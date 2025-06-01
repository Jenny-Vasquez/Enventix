<?php

namespace App\Models;

use MongoDB\Laravel\Eloquent\Model;

class Ticket extends Model
{
    protected $connection = 'mongodb';
    protected $collection = 'tickets';
    protected $fillable = ['user_id', 'event_id', 'purchase_date', 'amount', 'seats'];
    protected $casts = ['seats' => 'array'];
}
