<?php

namespace Database\Seeders;

use App\Models\Portfolio;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PortfolioSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create 15 portfolio items
        Portfolio::factory()->count(15)->create();

        // Create some featured portfolio items specifically
        Portfolio::factory()
            ->count(3)
            ->create([
                'is_featured' => true,
                'published_at' => now(),
            ]);
    }
}
