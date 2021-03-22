<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Product;

class ReportController extends Controller
{
    public function products(Product $product)
    {
        $products = $product->get();
        return response()->json($products);
    }
}
