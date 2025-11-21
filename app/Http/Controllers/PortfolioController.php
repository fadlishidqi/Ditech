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

        // Filter by category if provided
        if ($request->has('category') && $request->category) {
            $query->category($request->category);
        }

        // Filter by status if provided
        if ($request->has('status') && $request->status) {
            $query->where('status', $request->status);
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
