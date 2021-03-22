<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;
    protected $fillable = ['description', 'brand', 'model', 'color', 'sku'];

    public function inventories()
    {
        return $this->hasMany(Inventory::class);
    }

    public function getAmount()
    {
        $amount = 0;
        foreach ($this->inventories as $inventory) {
            if ($inventory->type === 'E') {
                $amount = $amount + $inventory->amount;
            } else {
                $amount = $amount - $inventory->amount;
            }
        }
        return $amount;
    }
}
