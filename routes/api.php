<?php

use App\Http\Controllers\Api\ProductController;
use Illuminate\Support\Facades\Route;

Route::get('/produtos', [ProductController::class, 'index']);
Route::post('/adicionar-produtos', [ProductController::class, 'store']);
Route::delete('/baixar-produtos/{id}', [ProductController::class, 'destroy']);
