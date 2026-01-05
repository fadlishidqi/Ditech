<?php

namespace App\Filament\Resources\Pricings\Schemas;

use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;

class PricingForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Informasi Layanan')
                    ->schema([
                        TextInput::make('title')
                            ->label('Nama Paket / Layanan')
                            ->required()
                            ->maxLength(255),

                        TextInput::make('price')
                            ->label('Harga')
                            ->numeric()
                            ->prefix('Rp')
                            ->required(),
                            
                        Toggle::make('is_active')
                            ->label('Tampilkan di Website')
                            ->default(true),
                    ])
                    ->columns(2),

                Section::make('Visual & Detail')
                    ->schema([
                        FileUpload::make('image')
                            ->label('Gambar Utama')
                            ->disk('public')
                            ->image()
                            ->directory('pricings')
                            ->imageEditor()
                            ->columnSpanFull(),

                        RichEditor::make('description')
                            ->label('Rincian Deskripsi')
                            ->toolbarButtons([
                                'bold', 'italic', 'bulletList', 'orderedList', 'link', 'h2', 'h3'
                            ])
                            ->columnSpanFull(),
                    ])
                    ->columns(1),
            ])
            ->columns(1);
    }
}