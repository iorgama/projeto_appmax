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

        //
        $request->merge([
            'type' => strtoupper($request->type)
        ]);

        if ($request->type === 'S' && $amount < $request->amount) {
            return response()->json(['error' => 'There is not enough stock to be removed.'], 422);
        }

        $inventory = $this->inventory->create($request->all());
        return response()->json($inventory, 201);
    }

    //Responsible for returning the quantity of products in the inventory.
    public function amountProduct($id)
    {
        // $inventories = DB::table('inventories')
        //     ->join('products', 'products.id', '=', 'inventories.product_id')
        //     ->select(
        //         DB::raw("COALESCE(SUM(CASE
        //                     WHEN type = 'E' THEN amount
        //                 END),0) -
        //                 COALESCE(SUM(CASE
        //                     WHEN type = 'S' THEN amount
        //                 END),0) AS amount")
        //     )->where('product_id', $id)
        //     ->get();

        $product = Product::find($id);
        $amount = $product->getAmount();

        return response()->json(['amount' => $amount]);
    }
}
