<?php

namespace App\Filament\Resources\Portfolios\Schemas;

use Filament\Forms\Components\DateTimePicker;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\MarkdownEditor;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TagsInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Components\Section;
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
                            ->label('Deskripsi Lengkap'),
                    ])
                    ->columns(1), // Membuat isian di dalam section ini vertikal

                Section::make('Media')
                    ->schema([
                        FileUpload::make('image')
                            ->label('Gambar Utama')
                            ->disk('public') // Penting: agar muncul di frontend
                            ->image()
                            ->directory('portfolios')
                            ->imageEditor()
                            ->imageCropAspectRatio('4:5')
                            ->maxSize(5120)
                            ->visibility('public') // Penting: izin akses user
                            ->required()
                            ->helperText('Upload gambar utama portfolio (max 5MB)'),

                        FileUpload::make('images')
                            ->label('Galeri Gambar')
                            ->disk('public')
                            ->image()
                            ->multiple()
                            ->directory('portfolios/gallery')
                            ->imageEditor()
                            ->maxSize(5120)
                            ->maxFiles(10)
                            ->reorderable()
                            ->visibility('public')
                            ->helperText('Upload hingga 10 gambar untuk galeri (max 5MB per gambar)'),
                    ])
                    ->columns(1),

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
                    ->columns(1),

                Section::make('Pengaturan')
                    ->schema([
                        TextInput::make('sort_order')
                            ->label('Urutan')
                            ->numeric()
                            ->default(0)
                            ->helperText('Urutan tampilan (angka lebih kecil = lebih depan)'),
                    ])
                    ->columns(1),
            ])
            ->columns(1);
    }
}