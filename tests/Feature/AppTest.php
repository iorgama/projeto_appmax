<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tests\TestCase;
use App\Models\Product;
use App\Models\User;

class AppTest extends TestCase
{

    private $email = 'admin@admin.com.br';

    /*Auth*/
    public function testUserNotFound()
    {
        $response = $this->json('POST', 'api/login', ['Accept' => 'application/json']);

        $response
            ->assertStatus(401)
            ->assertJson([
                "message" => 'Invalid Email or Password',
                "success" => false
            ]);
    }

    public function testLogin()
    {
        $this->email = 'admin@admin.com.br';
        $password = '123456';

        $response = $this->json('POST', 'api/login', [
            'email' => $this->email,
            'password' => $password
        ]);

        $response
            ->assertStatus(200)
            ->assertJsonStructure([
                'success', 'user',
                'token'
            ]);
    }

    public function testGetUser()
    {
        $user = User::where('email', $this->email)->first();
        $token = JWTAuth::fromUser($user);
        $baseUrl = 'api/usuario?token=' . $token;

        $response = $this->json('GET', $baseUrl . '/', []);

        $response->assertStatus(200);
    }

    /*Producs*/
    public function testGetProducts()
    {
        $user = User::where('email', $this->email)->first();
        $token = JWTAuth::fromUser($user);
        $baseUrl = 'api/usuario?token=' . $token;

        $this->json('GET', 'api/produtos?token=' . $token, ['Accept' => 'application/json'])
            ->assertStatus(200);
    }

    public function testInsertEmptyProduct()
    {
        $user = User::where('email', $this->email)->first();
        $token = JWTAuth::fromUser($user);
        $produto = [
            'description' => '',
            'brand' => '',
            'model' => '',
            'color' => '',
            'sku' => ''
        ];

        $response = $this->postJson('api/adicionar-produto', $produto, ['Authorization' => "Bearer $token"]);
        $response->assertStatus(422);
    }

    public function testUniqueSku()
    {
        $user = User::where('email', $this->email)->first();
        $token = JWTAuth::fromUser($user);
        $produto = [
            'description' => 'Notebook',
            'brand' => 'Dell',
            'model' => 'Alienware',
            'color' => 'Verde',
            'sku' => 'NOTDALVE'
        ];

        $response = $this->postJson('api/adicionar-produto', $produto, ['Authorization' => "Bearer $token"]);
        $response->assertJson([
            "message" => "The given data was invalid.",
            "errors" => [
                "sku" => [
                    "The sku has already been taken."
                ]
            ]
        ]);
        $response->assertStatus(422);
    }

    public function testInsertProducts()
    {
        $user = User::where('email', $this->email)->first();
        $token = JWTAuth::fromUser($user);
        $produto = [
            'description' => 'Notebook',
            'brand' => 'Dell',
            'model' => 'Alienware',
            'color' => 'Azul',
            'sku' => 'NOTDALA' . rand()
        ];

        $response = $this->postJson('api/adicionar-produto', $produto, ['Authorization' => "Bearer $token"]);
        $response->assertStatus(201);
    }
}
