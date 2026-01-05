<?php

use App\Http\Controllers\ArticleController;
use App\Http\Controllers\PortfolioController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\BookController;
use App\Http\Controllers\PricingController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Home');
});

// Portfolio routes
Route::get('/portofolio', [PortfolioController::class, 'index'])->name('portfolio.index');
Route::get('/portofolio/{portfolio}', [PortfolioController::class, 'show'])->name('portfolio.show');

// Article routes
Route::get('/artikel', [ArticleController::class, 'index'])->name('article.index');
Route::get('/artikel/{article}', [ArticleController::class, 'show'])->name('article.show');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Book routes
Route::get('/books', [BookController::class, 'index'])->name('books.index');
Route::get('/books/{book}', [BookController::class, 'show'])->name('books.show');

// Pricing routes
Route::get('/harga', [PricingController::class, 'index'])->name('pricing.index');

// Sekolah Aku route
Route::get('/sekolah-aku', function () {
    return Inertia::render('SekolahAku/Index');
})->name('sekolah-aku');
