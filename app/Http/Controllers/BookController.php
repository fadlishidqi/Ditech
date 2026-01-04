<?php

namespace App\Http\Controllers;

use App\Models\Book;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BookController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Book::query()->visible()->orderBy('sort_order')->orderBy('created_at', 'desc');

        if ($request->has('search') && $request->search) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhere('author', 'like', "%{$search}%");
            });
        }

        if ($request->has('category') && $request->category) {
            $query->category($request->category);
        }

        $categories = Book::visible()
            ->select('category')
            ->distinct()
            ->whereNotNull('category')
            ->pluck('category');

        $books = $query->paginate(12)->withQueryString();

        // Transform URL gambar
        $books->through(function ($book) {
            $book->cover_image_url = $book->cover_image_url;
            return $book;
        });

        return Inertia::render('Book/Index', [
            'books' => $books,
            'categories' => $categories,
            'filters' => [
                'search' => $request->search,
                'category' => $request->category,
            ],
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Book $book)
    {
        if (!$book->is_visible) {
            abort(404);
        }

        $book->cover_image_url = $book->cover_image_url;
        $book->file_url = $book->file_url;

        return Inertia::render('Book/Show', [
            'book' => $book,
        ]);
    }
}