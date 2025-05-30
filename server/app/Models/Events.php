<?php

namespace App\Models;

use MongoDB\Laravel\Eloquent\Model;

class Events extends Model
{
   
    protected $connection = 'mongodb';
    protected $collection = 'events';
    protected $fillable = [
        'title', 'location', 'organizer', 'tags', 'date', 'description', 'image'
    ];
    protected $casts = [
        'organizer' => 'array',
    ];

}
