<?php

namespace App\Http\Controllers;
use App\Models\Review;
use App\Models\Events;
use Illuminate\Http\Request;


class ReviewController extends Controller
{
    public function store(Request $request, Events $event)
    {
        $request->validate([
            'comment' => 'required|string',
            'rating' => 'required|integer|min:1|max:5',
        ]);
    
        return Review::create([
            'user_id' => $request->user()->id,
            'event_id' => $event->id,
            'comment' => $request->comment,
            'rating' => $request->rating,
        ]);
    }
    
    public function index(Request $request)
    {
        $reviews = Review::with('event')
            ->where('user_id', $request->user()->id)
            ->get();
    
        return response()->json($reviews);
    }
    
}
