<?php

namespace Tests;

use Illuminate\Foundation\Testing\TestCase as BaseTestCase;
use Tymon\JWTAuth\Facades\JWTAuth;
use App\Models\User;

abstract class TestCase extends BaseTestCase
{
    use CreatesApplication;

    public function setUp(): void
    {
        parent::setUp();
    }

    public function tearDown(): void
    {
        parent::tearDown();
    }

    public function getTokenForUser(User $user): string
    {
        return JWTAuth::fromUser($user);
    }

    public function user(): User
    {
        $user = User::query()->firstWhere('email', 'test-user@example.com');

        if ($user) {
            return $user;
        }

        $user = [
            'email' => 'admin@admin.com.br',
            'password'  => '123456'
        ];

        return $user;
    }
}
