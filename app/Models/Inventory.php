<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Inventory extends Model
{
    use HasFactory;
    protected $fillable = ['amount', 'type', 'product_id'];

    /**
     * Get the product that owns the inventory.
     */
    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    //The method below returns the movement of products per day and warns about products that are in amount less than one hundred units.
    public function reportStock()
    {
        $inventories = DB::select("
            SELECT
                CASE
                    WHEN inventories.type = 'E' THEN 'Entrada'
                    ELSE 'Saída'
                END AS type,
                inventories.product_id,
                DATE_FORMAT( inventories.updated_at, '%d-%m-%y') AS date,    
                SUM(inventories.amount) AS daily_amount,
                CONCAT( products.description, ' / ', products.brand, ' / ', products.model, ' / ', products.color) AS description,    
                (CASE
                    WHEN 
                        (SELECT  SUM(IF(inventories.type = 'E',inventories.amount,(-1*inventories.amount))) AS TOTAL FROM `inventories` WHERE inventories.product_id =  products.id
                    ) < 100 THEN 'Produto com menos de 100 unidade'
                    ELSE 
                        ''
                END) AS low_amount    
            FROM
                `inventories`
            INNER JOIN `products` 
                ON products.id = inventories.product_id
            GROUP BY 
                date,
                inventories.type,
                inventories.product_id
            ORDER BY date
            DESC");
        return $inventories;
    }

    //The method below returns only the movement of products per day.
    // public function reportStock()
    // {
    //     $inventories = DB::table('inventories')
    //         ->join('products', 'products.id', '=', 'inventories.product_id')
    //         ->select(
    //             DB::raw('inventories.product_id, CASE WHEN inventories.type = "E" THEN "Entrada"
    //             ELSE "Saída" END AS type, DATE_FORMAT(inventories.created_at, "%d-%m-%y") as date, CONCAT(products.description, " / ", products.brand, " / ", products.model, " / ", products.color) as description, SUM(inventories.amount) as daily_amount')
    //         )
    //         ->groupBy('date', 'inventories.type', 'inventories.product_id')
    //         ->orderBy('date', 'DESC')
    //         ->get();
    // }
}
