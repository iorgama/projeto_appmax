<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Product;
use App\Http\Requests\StoreProductFormRequest;

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

    public function store(StoreProductFormRequest $request)
    {
        $product = $this->product->create($request->all());
        return response()->json($product, 201);
    }

    public function destroy($id)
    {
        if (!$product = $this->product->find($id)) {
            return response()->json(['error' => 'Not found'], 404);
        }

        $product->delete();

        return response()->json(['Sucess' => true], 204);
    }
}
