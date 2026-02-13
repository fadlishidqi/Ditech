<?php

namespace App\Filament\Widgets;

use App\Models\Visit;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Widgets\TableWidget as BaseWidget;
use Illuminate\Support\Facades\DB;

class VisitorLocations extends BaseWidget
{
    protected static ?string $heading = 'Lokasi Pengunjung Terpopuler';
    protected static ?int $sort = 3;
    protected int|string|array $columnSpan = 'full';

    public function table(Table $table): Table
    {
        return $table
            ->query(
                Visit::query()
                    ->select([
                        DB::raw("CONCAT(country, '-', city) as record_key"),
                        'country',
                        'city',
                        DB::raw('COUNT(*) as total_visits'),
                    ])
                    ->whereNotNull('city')
                    ->where('city', '!=', 'Unknown')
                    ->groupBy('country', 'city')
                    ->orderByDesc('total_visits')
            )
            ->columns([
                Tables\Columns\TextColumn::make('country')
                    ->label('Negara')
                    ->icon('heroicon-m-globe-alt')
                    ->color('primary'),

                Tables\Columns\TextColumn::make('city')
                    ->label('Kota')
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

    /**
     * Filament v5 membutuhkan record key PUBLIC
     */
    public function getTableRecordKey($record): string
    {
        return (string) $record->record_key;
    }
}
