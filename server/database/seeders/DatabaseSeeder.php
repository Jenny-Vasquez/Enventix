<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'admin1 User',
            'email' => 'adminuser1@user.com',
            'password' => Hash::make('user12345'),
            'role' => 'super-admin',
        ]);
      
        User::factory()->create([
            'name' => 'admin2 User',
            'email' => 'adminuser2@user.com',
            'password' => Hash::make('user12345'),
            'role' => 'super-admin',
        ]);
      
        User::factory()->create([
            'name' => 'admin3 User',
            'email' => 'adminuser3@user.com',
            'password' => Hash::make('user12345'),
            'role' => 'super-admin',
        ]);
    }
}
