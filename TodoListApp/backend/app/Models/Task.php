<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Task extends Model
{
    use HasFactory, SoftDeletes;

    protected $dates = ['deleted_at'];


    protected $fillable = ['title', 'order', 'status'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }


    public function scopeByUser($query, $user)
    {
        return $query->where('user_id', $user->id);
    }

    public function scopeByStatus($query, $status)
    {
        return $query->where('status', $status);
    }

    public function scopeOrderByOrder($query)
    {
        return $query->orderBy('order');
    }

    public function scopeOrderByStatus($query)
    {
        return $query->orderBy('status');
    }

    public function scopeOrderByTitle($query)
    {
        return $query->orderBy('title');
    }
}
