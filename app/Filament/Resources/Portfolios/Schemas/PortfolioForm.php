<?php

namespace App\Filament\Resources\Portfolios\Schemas;

use Filament\Forms\Components\DateTimePicker;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\MarkdownEditor;
use Filament\Forms\Components\Section;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TagsInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;
use Illuminate\Support\Str;

class PortfolioForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Informasi Dasar')
                    ->schema([
                        TextInput::make('title')
                            ->label('Judul')
                            ->required()
                            ->maxLength(255)
                            ->live(onBlur: true)
                            ->afterStateUpdated(fn ($state, $set) => $set('slug', Str::slug($state))),

                        TextInput::make('slug')
                            ->label('Slug')
                            ->required()
                            ->maxLength(255)
                            ->unique(ignoreRecord: true)
                            ->helperText('URL-friendly version of the title'),

                        Textarea::make('description')
                            ->label('Deskripsi Singkat')
                            ->required()
                            ->rows(3)
                            ->maxLength(500),

                        MarkdownEditor::make('full_description')
                            ->label('Deskripsi Lengkap')
                            ->columnSpanFull(),
                    ])
                    ->columns(2),

                Section::make('Media')
                    ->schema([
                        TextInput::make('image')
                            ->label('URL Gambar Utama')
                            ->url()
                            ->maxLength(255)
                            ->helperText('URL gambar utama portfolio'),

                        TagsInput::make('images')
                            ->label('Galeri Gambar (URL)')
                            ->helperText('Masukkan URL gambar tambahan, tekan Enter setelah setiap URL')
                            ->placeholder('https://example.com/image.jpg'),
                    ]),

                Section::make('Detail Proyek')
                    ->schema([
                        Select::make('category')
                            ->label('Kategori')
                            ->options([
                                'Website' => 'Website',
                                'Mobile App' => 'Mobile App',
                                'Desktop App' => 'Desktop App',
                                'E-Commerce' => 'E-Commerce',
                                'CMS' => 'CMS',
                                'API' => 'API',
                                'Design' => 'Design',
                            ])
                            ->searchable(),

                        TextInput::make('client_name')
                            ->label('Nama Klien')
                            ->maxLength(255),

                        TextInput::make('project_url')
                            ->label('URL Proyek')
                            ->url()
                            ->maxLength(255),

                        Select::make('status')
                            ->label('Status')
                            ->options([
                                'ongoing' => 'Sedang Berjalan',
                                'completed' => 'Selesai',
                            ])
                            ->required()
                            ->default('completed'),

                        TagsInput::make('technologies')
                            ->label('Teknologi')
                            ->helperText('Masukkan teknologi yang digunakan, tekan Enter setelah setiap item')
                            ->placeholder('Laravel')
                            ->required(),
                    ])
                    ->columns(2),

                Section::make('Pengaturan')
                    ->schema([
                        Toggle::make('is_featured')
                            ->label('Featured')
                            ->helperText('Tampilkan di portfolio featured'),

                        TextInput::make('sort_order')
                            ->label('Urutan')
                            ->numeric()
                            ->default(0)
                            ->helperText('Urutan tampilan (angka lebih kecil = lebih depan)'),

                        DateTimePicker::make('published_at')
                            ->label('Tanggal Publikasi')
                            ->helperText('Kosongkan untuk draft'),
                    ])
                    ->columns(3),
            ]);
    }
}
