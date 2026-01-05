<?php

namespace App\Filament\Resources\Pricings\Tables;

use Filament\Actions\DeleteAction;
use Filament\Actions\EditAction;
use Filament\Actions\ViewAction;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Columns\ToggleColumn;
use Filament\Tables\Table;

class PricingsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                ImageColumn::make('image')
                    ->label('Gambar')
                    ->square(),

                TextColumn::make('title')
                    ->label('Nama Paket')
                    ->searchable()
                    ->sortable()
                    ->weight('bold'),

                TextColumn::make('price')
                    ->label('Harga')
                    ->money('IDR')
                    ->sortable(),

                ToggleColumn::make('is_active')
                    ->label('Aktif'),
            ])
            ->filters([
            ])
            ->actions([
                ViewAction::make(),
                EditAction::make(),
                DeleteAction::make(),
            ])
            ->bulkActions([
            ]);
    }
}