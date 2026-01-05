<?php

namespace App\Filament\Widgets;

use App\Models\Article;
use App\Models\Book;
use App\Models\Portfolio; // Pastikan model ini ada
use App\Models\Visit;
use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class StatsOverview extends BaseWidget
{
    // REVISI: Hapus kata 'static' di sini agar sesuai dengan parent class
    protected ?string $pollingInterval = '15s';

    protected function getStats(): array
    {
        // --- 1. LOGIK PENGUNJUNG ---
        $visitorsToday = Visit::whereDate('created_at', Carbon::today())->count();
        $visitorsWeek = Visit::whereDate('created_at', '>=', Carbon::now()->subDays(7))->count();

        // --- 2. LOGIK HALAMAN TERPOPULER ---
        // Mencari URL yang paling banyak muncul di database visits
        $topPage = Visit::select('url', DB::raw('count(*) as total'))
            ->groupBy('url')
            ->orderByDesc('total')
            ->first();

        // Bersihkan tampilan URL agar tidak kepanjangan
        $displayUrl = '-';
        if ($topPage) {
            // Hapus domain utama agar hanya muncul path-nya
            $displayUrl = str_replace(config('app.url'), '', $topPage->url);
            // Jika kosong (halaman home), tulis 'Beranda'
            if ($displayUrl == '' || $displayUrl == '/') {
                $displayUrl = 'Beranda (Home)';
            }
        }

        return [
            // KARTU 1: Pengunjung
            Stat::make('Pengunjung Hari Ini', $visitorsToday)
                ->description($visitorsWeek . ' pengunjung 7 hari terakhir')
                ->descriptionIcon('heroicon-m-user-group')
                ->chart([7, 2, 10, 3, 15, 4, $visitorsToday]) 
                ->color('success'),

            // KARTU 2: Halaman Terpopuler
            Stat::make('Halaman Paling Sering Diakses', $displayUrl)
                ->description(($topPage ? $topPage->total : 0) . ' kali dilihat total')
                ->descriptionIcon('heroicon-m-cursor-arrow-rays')
                ->color('warning'), 

            // KARTU 3: Total Buku
            Stat::make('Total Buku', Book::count())
                ->description(Book::where('is_paid', true)->count() . ' Berbayar, ' . Book::where('is_paid', false)->count() . ' Gratis')
                ->descriptionIcon('heroicon-m-book-open')
                ->color('primary'),

            // KARTU 4: Total Artikel
            Stat::make('Total Artikel', Article::count())
                ->description('Artikel terpublikasi')
                ->descriptionIcon('heroicon-m-newspaper')
                ->color('info'),

            // KARTU 5: Total Portofolio
            Stat::make('Total Portofolio', Portfolio::count())
                ->description('Proyek yang telah dikerjakan')
                ->descriptionIcon('heroicon-m-briefcase')
                ->chart([1, 5, 3, 6, 2, 8]) 
                ->color('danger'),
        ];
    }
}