<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Product;

class ProductController extends Controller
{
    private $product;

    public function __construct(Product $product)
    {
        $this->product = $product;
    }
    public function index()
    {
        $products = $this->product::all();
        return response()->json($products);
    }

    public function store(Request $request)
    {
        $product = $this->product->create($request->all());
        return response()->json($product, 201);
    }
}
