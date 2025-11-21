<?php

namespace App\Http\Controllers;

use App\Models\Portfolio;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PortfolioController extends Controller
{
    /**
     * Display a listing of portfolios.
     */
    public function index(Request $request)
    {
        $query = Portfolio::query()->published()->orderBy('sort_order')->orderBy('published_at', 'desc');

        // Search by title, description, or technologies
        if ($request->has('search') && $request->search) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhere('description', 'like', "%{$search}%")
                  ->orWhere('full_description', 'like', "%{$search}%");
            });
        }

        // Filter by category if provided
        if ($request->has('category') && $request->category) {
            $query->category($request->category);
        }

        // Get all unique categories for filter
        $categories = Portfolio::published()
            ->select('category')
            ->distinct()
            ->whereNotNull('category')
            ->pluck('category');

        $portfolios = $query->paginate(12)->withQueryString();

        return Inertia::render('Portfolio/Index', [
            'portfolios' => $portfolios,
            'categories' => $categories,
            'filters' => [
                'search' => $request->search,
                'category' => $request->category,
                'status' => $request->status,
            ],
        ]);
    }

    /**
     * Display the specified portfolio.
     */
    public function show(Portfolio $portfolio)
    {
        // Only show published portfolios
        if (!$portfolio->published_at || $portfolio->published_at->isFuture()) {
            abort(404);
        }

        // Get related portfolios (same category, limit 3)
        $relatedPortfolios = Portfolio::published()
            ->where('id', '!=', $portfolio->id)
            ->where('category', $portfolio->category)
            ->limit(3)
            ->get();

        return Inertia::render('Portfolio/Show', [
            'portfolio' => $portfolio,
            'relatedPortfolios' => $relatedPortfolios,
        ]);
    }
}
