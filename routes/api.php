<?php

use App\Http\Controllers\Api\InventoryController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\ReportController;
use App\Http\Controllers\Auth\AuthApiController;
use Illuminate\Support\Facades\Route;


Route::post('/login', [AuthApiController::class, 'login']);

Route::group([
  'middleware' => 'auth:api',
], function () {
  //users
  Route::get('/usuario', [AuthApiController::class, 'getAuthenticatedUser']);
  //products
  Route::get('/produto/{id}', [ProductController::class, 'getProductById']);
  Route::get('/produtos', [ProductController::class, 'getProducts']);
  Route::post('/adicionar-produto', [ProductController::class, 'store']);
  Route::put('/atualizar-produto/{id}', [ProductController::class, 'update']);
  Route::delete('/remover-produto/{id}', [ProductController::class, 'destroy']);
  //inventory
  Route::post('/movimentacao-estoque', [InventoryController::class, 'store']);
  Route::get('/verifica-quantidade-estoque/{id}', [InventoryController::class, 'amountProduct']);
  //reports
  Route::get('/relatorio-entrada-saida', [ReportController::class, 'reportStock']);
});
