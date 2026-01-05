<?php

namespace App\Filament\Widgets;

use App\Models\Visit;
use Filament\Widgets\ChartWidget;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class VisitorsChart extends ChartWidget
{
    protected ?string $heading = 'Statistik Pengunjung (7 Hari Terakhir)';
    
    protected int | string | array $columnSpan = 'full';
    
    protected static ?int $sort = 2;

    protected function getData(): array
    {
        $data = Visit::select(DB::raw('DATE(created_at) as date'), DB::raw('count(*) as count'))
            ->where('created_at', '>=', Carbon::now()->subDays(6))
            ->groupBy('date')
            ->orderBy('date', 'asc')
            ->get();

        $labels = [];
        $counts = [];

        for ($i = 6; $i >= 0; $i--) {
            $date = Carbon::now()->subDays($i)->format('Y-m-d');
            $labels[] = Carbon::now()->subDays($i)->format('d M');
            
            $found = $data->firstWhere('date', $date);
            $counts[] = $found ? $found->count : 0;
        }

        return [
            'datasets' => [
                [
                    'label' => 'Jumlah Kunjungan',
                    'data' => $counts,
                    'backgroundColor' => '#10b981', // Warna Emerald
                    'borderColor' => '#10b981',
                    'fill' => true,
                ],
            ],
            'labels' => $labels,
        ];
    }

    protected function getType(): string
    {
        return 'line'; 
    }
}