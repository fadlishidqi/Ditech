<?php

namespace App\Console\Commands;

use App\Models\Article;
use Illuminate\Console\Command;

class FixArticlePublishedDate extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'article:fix-dates';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Fix article published_at dates that are NULL or in the future';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('🔍 Checking articles...');

        // Get all articles
        $totalArticles = Article::count();
        $this->info("Total articles in database: {$totalArticles}");

        if ($totalArticles === 0) {
            $this->warn('No articles found in database!');
            return Command::SUCCESS;
        }

        // Find articles with NULL published_at
        $nullArticles = Article::whereNull('published_at')->get();
        $nullCount = $nullArticles->count();

        // Find articles with future published_at
        $futureArticles = Article::where('published_at', '>', now())->get();
        $futureCount = $futureArticles->count();

        // Find already published articles
        $publishedCount = Article::published()->count();

        $this->newLine();
        $this->line("✅ Already published (visible): {$publishedCount}");
        $this->line("⚠️  NULL published_at: {$nullCount}");
        $this->line("⏰ Future published_at: {$futureCount}");
        $this->newLine();

        if ($nullCount === 0 && $futureCount === 0) {
            $this->info('✨ All articles are properly published! No fix needed.');
            return Command::SUCCESS;
        }

        // Ask for confirmation
        if (!$this->confirm('Do you want to fix these articles by setting published_at to now?', true)) {
            $this->info('Operation cancelled.');
            return Command::SUCCESS;
        }

        $fixed = 0;

        // Fix NULL articles
        if ($nullCount > 0) {
            $this->info("\n🔧 Fixing articles with NULL published_at...");
            foreach ($nullArticles as $article) {
                $article->published_at = now();
                $article->save();
                $this->line("  ✓ Fixed: {$article->title}");
                $fixed++;
            }
        }

        // Fix future articles
        if ($futureCount > 0) {
            $this->info("\n🔧 Fixing articles with future published_at...");
            foreach ($futureArticles as $article) {
                $oldDate = $article->published_at->format('Y-m-d H:i:s');
                $article->published_at = now();
                $article->save();
                $this->line("  ✓ Fixed: {$article->title} (was: {$oldDate})");
                $fixed++;
            }
        }

        $this->newLine();
        $this->info("✨ Done! Fixed {$fixed} articles.");

        $newPublishedCount = Article::published()->count();
        $this->info("📊 Now {$newPublishedCount} articles are visible to users.");

        return Command::SUCCESS;
    }
}
