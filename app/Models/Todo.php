<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Todo extends Model {
    use HasFactory;

    protected $fillable = ['todo', 'status', 'category_id'];
    protected $hidden = ['created_at', 'updated_at'];

    public function category() {
        return $this->belongsTo(Category::class, 'category_id');
    }
}
