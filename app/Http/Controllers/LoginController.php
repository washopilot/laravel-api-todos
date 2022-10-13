<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class LoginController extends Controller {
    public function login() {
        if (!Auth::attempt(request()->only('email', 'password'))) {
            return response()->json([
                'message' => 'Login failed'
            ]);
        }

        return response()->json([
            'message' => 'Login Successful'
        ]);
    }

    public function logout(Request $request) {
        Auth::guard('web')->logout();
    }
}
