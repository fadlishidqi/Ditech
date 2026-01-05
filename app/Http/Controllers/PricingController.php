<?php

namespace App\Http\Controllers;

use App\Models\Pricing;
use Inertia\Inertia;

class PricingController extends Controller
{
    public function index()
    {
        // Ambil semua data harga, urutkan terbaru
        $pricings = Pricing::latest()->get();

        return Inertia::render('Pricing/Index', [
            'pricings' => $pricings
        ]);
    }
}