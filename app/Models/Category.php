<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model {
    use HasFactory;

    protected $fillable = ['description'];
    protected $hidden = ['created_at', 'updated_at'];

    public function todos() {
        return $this->hasMany(Todo::class, 'category_id');
    }
}
