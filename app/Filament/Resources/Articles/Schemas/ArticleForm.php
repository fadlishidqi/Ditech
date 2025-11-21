<?php

namespace App\Filament\Resources\Articles\Schemas;

use Filament\Forms\Components\DateTimePicker;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\MarkdownEditor;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TagsInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;
use Illuminate\Support\Str;

class ArticleForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Informasi Dasar')
                    ->schema([
                        TextInput::make('title')
                            ->label('Judul Artikel')
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

                        Textarea::make('excerpt')
                            ->label('Ringkasan Artikel')
                            ->required()
                            ->rows(3)
                            ->maxLength(500)
                            ->helperText('Ringkasan singkat yang akan ditampilkan di halaman daftar artikel'),
                    ])
                    ->columns(1),

                Section::make('Gambar Unggulan')
                    ->schema([
                        FileUpload::make('featured_image')
                            ->label('Gambar Unggulan')
                            ->disk('public')
                            ->image()
                            ->directory('articles/featured')
                            ->imageEditor()
                            ->imageCropAspectRatio('16:9')
                            ->maxSize(5120)
                            ->visibility('public')
                            ->required()
                            ->helperText('Upload gambar unggulan artikel dengan rasio 16:9 (max 5MB)'),
                    ])
                    ->columns(1),

                Section::make('Konten Artikel')
                    ->description('Susun konten artikel dengan kombinasi teks dan gambar')
                    ->schema([
                        Repeater::make('content_blocks')
                            ->label('Blok Konten')
                            ->schema([
                                Select::make('type')
                                    ->label('Tipe Konten')
                                    ->options([
                                        'text' => 'Teks/Paragraf',
                                        'image' => 'Gambar',
                                    ])
                                    ->required()
                                    ->live()
                                    ->default('text'),

                                MarkdownEditor::make('content')
                                    ->label('Konten Teks')
                                    ->visible(fn ($get) => $get('type') === 'text')
                                    ->required(fn ($get) => $get('type') === 'text')
                                    ->columnSpanFull(),

                                FileUpload::make('url')
                                    ->label('Upload Gambar')
                                    ->disk('public')
                                    ->image()
                                    ->directory('articles/content')
                                    ->imageEditor()
                                    ->imageCropAspectRatio('16:9')
                                    ->maxSize(5120)
                                    ->visibility('public')
                                    ->visible(fn ($get) => $get('type') === 'image')
                                    ->required(fn ($get) => $get('type') === 'image')
                                    ->helperText('Upload gambar dengan rasio 16:9 (max 5MB)'),

                                TextInput::make('caption')
                                    ->label('Caption Gambar')
                                    ->visible(fn ($get) => $get('type') === 'image')
                                    ->maxLength(255),
                            ])
                            ->collapsible()
                            ->cloneable()
                            ->reorderable()
                            ->addActionLabel('Tambah Blok Konten')
                            ->defaultItems(1)
                            ->columnSpanFull(),
                    ])
                    ->columns(1),

                Section::make('Kategori & Tags')
                    ->schema([
                        Select::make('category')
                            ->label('Kategori')
                            ->options([
                                'Teknologi' => 'Teknologi',
                                'Web Development' => 'Web Development',
                                'Mobile Development' => 'Mobile Development',
                                'UI/UX Design' => 'UI/UX Design',
                                'IoT' => 'IoT',
                                'Tutorial' => 'Tutorial',
                                'Tips & Tricks' => 'Tips & Tricks',
                                'Berita' => 'Berita',
                                'Lainnya' => 'Lainnya',
                            ])
                            ->searchable()
                            ->required(),

                        TagsInput::make('tags')
                            ->label('Tags')
                            ->helperText('Masukkan tag, tekan Enter setelah setiap item')
                            ->placeholder('laravel'),
                    ])
                    ->columns(1),

                Section::make('Pengaturan')
                    ->schema([
                        TextInput::make('sort_order')
                            ->label('Urutan')
                            ->numeric()
                            ->default(0)
                            ->helperText('Urutan tampilan (angka lebih kecil = lebih depan)'),

                        DateTimePicker::make('published_at')
                            ->label('Tanggal Publikasi')
                            ->default(now())
                            ->helperText('Artikel akan otomatis dipublikasikan pada tanggal ini'),
                    ])
                    ->columns(2),
            ])
            ->columns(1);
    }
}
