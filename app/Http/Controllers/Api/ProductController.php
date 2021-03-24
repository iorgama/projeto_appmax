<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Product;
use App\Http\Requests\StoreProductFormRequest;
use App\Http\Requests\UpdateProductFormRequest;

class ProductController extends Controller
{
    private $product;

    public function __construct(Product $product)
    {
        $this->product = $product;
    }

    //Responsible for returning our products.
    public function getProducts()
    {
        $products = $this->product::all();
        return response()->json($products);
    }

    //Responsible for registering our products.
    public function store(StoreProductFormRequest $request)
    {
        $product = $this->product->create($request->all());
        return response()->json($product, 201);
    }

    public function update(Request $request, $id)
    {
        if (!$product = $this->product->find($id)) {
            return response()->json(['error' => 'Not found'], 404);
        }
        $product->update($request->all());

        return response()->json($product);
    }

    public function getProductById($id)
    {
        if (!$product = $this->product->find($id)) {
            return response()->json(['error' => 'Not found'], 404);
        }
        return response()->json($product);
    }

    public function destroy($id)
    {
        if (!$product = $this->product->find($id)) {
            return response()->json(['error' => 'Not found'], 404);
        }

        // delete related   
        $product->inventories()->delete();

        $product->delete();

        return response()->json(['Sucess' => true], 204);
    }
}
