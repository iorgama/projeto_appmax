<?php

use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Auth\AuthApiController;
use Illuminate\Support\Facades\Route;


Route::post('/auth', [AuthApiController::class, 'login']);
Route::group([
  'middleware' => 'auth:api',
], function () {
  Route::get('/me', [AuthApiController::class, 'getAuthenticatedUser']);
  Route::get('/produtos', [ProductController::class, 'index']);
  Route::post('/adicionar-produtos', [ProductController::class, 'store']);
  Route::put('/baixar-produtos/{id}', [ProductController::class, 'updateAmount']);
  // Route::delete('/remover-produto/{id}', [ProductController::class, 'destroy']);
});
