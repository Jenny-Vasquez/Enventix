<?php

namespace App\Models;
use MongoDB\Laravel\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;


class Review extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'event_id',
        'comment',
        'rating',
    ];

    /**
     * El usuario que hizo la reseña.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * El evento que fue reseñado.
     */
    public function event()
    {
        return $this->belongsTo(Events::class, 'event_id');
    }
}
