<?php

namespace Database\Factories;

use App\Models\Category;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Todo>
 */
class TodoFactory extends Factory {
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition() {
        return [
            'todo' => fake()->words(3, true),
            'status' => fake()->randomElement(['complete', 'incomplete']),
            'category_id' => Category::all()->random()->id
        ];
    }
}
