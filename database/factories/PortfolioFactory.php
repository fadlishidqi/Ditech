<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Portfolio>
 */
class PortfolioFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $title = fake()->sentence(rand(3, 6));
        $categories = ['Website', 'Mobile App', 'Desktop App', 'E-Commerce', 'CMS', 'API', 'Design'];
        $technologies = [
            ['Laravel', 'Vue.js', 'MySQL', 'Tailwind CSS'],
            ['React', 'Node.js', 'MongoDB', 'Express'],
            ['Flutter', 'Firebase', 'Dart'],
            ['Next.js', 'TypeScript', 'PostgreSQL', 'Prisma'],
            ['WordPress', 'PHP', 'MySQL'],
            ['React Native', 'Expo', 'Firebase'],
        ];
        $statuses = ['ongoing', 'completed'];

        return [
            'title' => $title,
            'slug' => \Illuminate\Support\Str::slug($title),
            'description' => fake()->paragraph(),
            'full_description' => fake()->paragraphs(rand(3, 5), true),
            'image' => 'https://picsum.photos/seed/' . fake()->unique()->numberBetween(1, 1000) . '/800/600',
            'images' => [
                'https://picsum.photos/seed/' . fake()->unique()->numberBetween(1001, 2000) . '/800/600',
                'https://picsum.photos/seed/' . fake()->unique()->numberBetween(2001, 3000) . '/800/600',
                'https://picsum.photos/seed/' . fake()->unique()->numberBetween(3001, 4000) . '/800/600',
            ],
            'category' => fake()->randomElement($categories),
            'client_name' => fake()->company(),
            'project_url' => fake()->boolean(70) ? fake()->url() : null,
            'technologies' => fake()->randomElement($technologies),
            'status' => fake()->randomElement($statuses),
            'is_featured' => fake()->boolean(30),
            'sort_order' => fake()->numberBetween(0, 100),
            'published_at' => fake()->boolean(90) ? fake()->dateTimeBetween('-1 year', 'now') : null,
        ];
    }
}
