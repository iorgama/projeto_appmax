<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Inventory;

class ReportController extends Controller
{
    public function reportStock(Inventory $inventory)
    {
        $inventories = $inventory->reportStock();
        return response()->json($inventories);
    }
}
