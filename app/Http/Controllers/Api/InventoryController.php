<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreInventoryFormRequest;
use App\Models\Inventory;
use App\Models\Product;

class InventoryController extends Controller
{
    public function __construct(Inventory $inventory)
    {
        $this->inventory = $inventory;
    }

    //Responsible for registering our inventory movement
    public function store(StoreInventoryFormRequest $request)
    {
        $product = Product::find($request->product_id);
        $amount = $product->getAmount();

        $request->merge([
            'type' => strtoupper($request->type)
        ]);

        if ($request->type === 'S' && $amount < $request->amount) {
            return response()->json(['error' => 'Não tem quantidade suficiente para retirar do estoque.'], 422);
        }

        $inventory = $this->inventory->create($request->all());
        return response()->json($inventory, 201);
    }

    //Responsible for returning the quantity of products in the inventory.
    public function amountProduct($id)
    {

        $product = Product::find($id);
        $amount = $product->getAmount();

        return response()->json(['amount' => $amount]);
    }
}
