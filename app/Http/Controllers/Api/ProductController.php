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

    // public function updateAmount(UpdateProductFormRequest $request, $id)
    // {
    //     if (!$product = $this->product->find($id)) {
    //         return response()->json(['error' => 'Not found'], 404);
    //     }

    //     if ($product->amount >= $request->amount) {
    //         $request->merge([
    //             'amount' => $product->amount - $request->amount,
    //         ]);
    //     } else {
    //         return response()->json(['error' => 'There is not enough stock to be removed.'], 422);
    //     }

    //     $product->update($request->all());

    //     return response()->json($product);
    // }
}
