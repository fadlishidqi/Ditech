<?php

namespace App\Filament\Widgets;

use App\Models\Visit;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Widgets\TableWidget as BaseWidget;
use Illuminate\Support\Facades\DB;

class VisitorLocations extends BaseWidget
{
    // Judul Widget
    protected static ?string $heading = 'Lokasi Pengunjung Terpopuler';
    
    // Urutan Widget di Dashboard (setelah chart)
    protected static ?int $sort = 3;
    
    // Lebar Widget (Full Width)
    protected int | string | array $columnSpan = 'full';

    public function table(Table $table): Table
    {
        return $table
            ->query(
                // Query Grouping: Hitung jumlah kunjungan per Kota & Negara
                Visit::query()
                    ->select('country', 'city', DB::raw('count(*) as total_visits'))
                    ->whereNotNull('city')
                    ->where('city', '!=', 'Unknown') // Sembunyikan yang tidak terdeteksi
                    ->groupBy('country', 'city')
                    ->orderByDesc('total_visits')
            )
            ->columns([
                Tables\Columns\TextColumn::make('country')
                    ->label('Negara')
                    ->searchable()
                    ->icon('heroicon-m-globe-alt')
                    ->color('primary'),

                Tables\Columns\TextColumn::make('city')
                    ->label('Kota')
                    ->searchable()
                    ->weight('bold'),

                Tables\Columns\TextColumn::make('total_visits')
                    ->label('Jumlah Kunjungan')
                    ->badge()
                    ->color('success')
                    ->sortable(),
            ])
            ->paginated([5, 10])
            ->defaultPaginationPageOption(5);
    }
}