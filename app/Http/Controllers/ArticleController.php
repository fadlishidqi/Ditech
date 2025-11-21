<?php

namespace App\Http\Controllers;

use App\Models\Article;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ArticleController extends Controller
{
    /**
     * Display a listing of articles.
     */
    public function index(Request $request)
    {
        $query = Article::query()->published()->orderBy('sort_order')->orderBy('published_at', 'desc');

        // Search by title or excerpt
        if ($request->has('search') && $request->search) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhere('excerpt', 'like', "%{$search}%");
            });
        }

        // Filter by category if provided
        if ($request->has('category') && $request->category) {
            $query->category($request->category);
        }

        // Get all unique categories for filter
        $categories = Article::published()
            ->select('category')
            ->distinct()
            ->whereNotNull('category')
            ->pluck('category');

        $articles = $query->paginate(9)->withQueryString(); // 9 items for 3 column grid

        // Transform articles to include image URLs
        $articles->through(function ($article) {
            $article->featured_image_url = $article->featured_image_url;
            return $article;
        });

        return Inertia::render('Article/Index', [
            'articles' => $articles,
            'categories' => $categories,
            'filters' => [
                'search' => $request->search,
                'category' => $request->category,
            ],
        ]);
    }

    /**
     * Display the specified article.
     */
    public function show(Article $article)
    {
        // Only show published articles
        if (!$article->published_at || $article->published_at->isFuture()) {
            abort(404);
        }

        // Get related articles (same category, limit 3)
        $relatedArticles = Article::published()
            ->where('id', '!=', $article->id)
            ->where('category', $article->category)
            ->limit(3)
            ->get();

        // Add image URLs to article and related articles
        $article->featured_image_url = $article->featured_image_url;
        $article->processed_content_blocks = $article->processed_content_blocks;

        $relatedArticles->each(function ($related) {
            $related->featured_image_url = $related->featured_image_url;
        });

        return Inertia::render('Article/Show', [
            'article' => $article,
            'relatedArticles' => $relatedArticles,
        ]);
    }
}
