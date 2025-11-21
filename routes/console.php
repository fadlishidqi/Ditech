<?php

use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');

Artisan::command('debug:articles', function () {
    $this->info('=== Debugging Articles ===');

    try {
        $total = \App\Models\Article::count();
        $this->info("Total articles in database: {$total}");

        if ($total > 0) {
            $this->info("\n--- All Articles ---");
            \App\Models\Article::all()->each(function ($article) {
                $this->line("ID: {$article->id}");
                $this->line("Title: {$article->title}");
                $this->line("Slug: {$article->slug}");
                $this->line("Published At: " . ($article->published_at ? $article->published_at->format('Y-m-d H:i:s') : 'NULL'));
                $this->line("Is Future: " . ($article->published_at && $article->published_at->isFuture() ? 'YES' : 'NO'));
                $this->line("---");
            });

            $published = \App\Models\Article::published()->count();
            $this->info("\nPublished articles (visible to users): {$published}");

            if ($published > 0) {
                $this->info("\n--- Published Articles ---");
                \App\Models\Article::published()->get()->each(function ($article) {
                    $this->line("- {$article->title} (slug: {$article->slug})");
                });
            } else {
                $this->warn("\n⚠️  No published articles found!");
                $this->warn("Make sure your articles have 'published_at' set to a past date/time.");
            }
        } else {
            $this->warn("No articles found in database!");
        }

    } catch (\Exception $e) {
        $this->error("Error: " . $e->getMessage());
    }
})->purpose('Debug articles in database');
