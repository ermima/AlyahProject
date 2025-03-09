<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

// routes/api.php


Route::get('/test', function () {
    return response()->json(['message' => 'Proxy is working!']);
});

// Public routes (no authentication required)
Route::post('/register', [AuthController::class, 'register']); // User registration
Route::post('/login', [AuthController::class, 'login']); // User login

Route::post('/example', function (Request $request) {
    $name = $request->input('name'); // Retrieve a parameter from the request
    return response()->json(['message' => "Hello, $name!"]);
});

// Protected routes (require authentication)
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);

    // Dashboard routes based on roles
    Route::get('/admin/dashboard', [AuthController::class, 'adminDashboard']);
    Route::get('/manager/dashboard', [AuthController::class, 'managerDashboard']);
    Route::get('/user/dashboard', [AuthController::class, 'userDashboard']);
});
