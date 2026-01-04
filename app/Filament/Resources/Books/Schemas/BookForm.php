<?php

namespace App\Filament\Resources\Books\Schemas;

use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TagsInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;
use Illuminate\Support\Str;

class BookForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Informasi Buku')
                    ->schema([
                        TextInput::make('title')
                            ->label('Judul Buku')
                            ->required()
                            ->maxLength(255)
                            ->live(onBlur: true)
                            ->afterStateUpdated(fn ($state, $set) => $set('slug', Str::slug($state))),

                        TextInput::make('slug')
                            ->label('Slug')
                            ->required()
                            ->maxLength(255)
                            ->unique(ignoreRecord: true),

                        TextInput::make('author')
                            ->label('Penulis')
                            ->required(),

                        TextInput::make('publisher')
                            ->label('Penerbit'),

                        TextInput::make('year')
                            ->label('Tahun Terbit')
                            ->numeric()
                            ->length(4),
                    ])
                    ->columns(2),

                Section::make('File & Cover')
                    ->schema([
                        FileUpload::make('cover_image')
                            ->label('Cover Buku')
                            ->disk('public')
                            ->image()
                            ->directory('books/covers')
                            ->imageEditor()
                            ->imageCropAspectRatio('2:3')
                            ->maxSize(2048)
                            ->visibility('public')
                            ->required(),

                        FileUpload::make('file_source')
                            ->label('File Buku (PDF)')
                            ->disk('public')
                            ->directory('books/files')
                            ->acceptedFileTypes(['application/pdf'])
                            ->maxSize(20480)
                            ->visibility('public')
                            ->helperText('Upload file buku digital (PDF, max 20MB).'),
                    ])
                    ->columns(2),

                Section::make('Detail')
                    ->schema([
                        Textarea::make('description')
                            ->label('Sinopsis')
                            ->rows(5)
                            ->columnSpanFull(),

                        Select::make('category')
                            ->options([
                                'Teknologi' => 'Teknologi',
                                'Bisnis' => 'Bisnis',
                                'Desain' => 'Desain',
                                'Novel' => 'Novel',
                                'Pendidikan' => 'Pendidikan',
                                'Lainnya' => 'Lainnya',
                            ])
                            ->searchable()
                            ->required(),

                        TagsInput::make('tags')
                            ->placeholder('New Tag'),
                    ])
                    ->columns(1),

                Section::make('Pengaturan Tampilan')
                    ->schema([
                        Toggle::make('is_visible')
                            ->label('Tampilkan Buku Ini?')
                            ->default(true)
                            ->helperText('Jika dimatikan, buku tidak akan muncul di website.'),

                        TextInput::make('sort_order')
                            ->label('Urutan')
                            ->numeric()
                            ->default(0),
                    ])
                    ->columns(2),
            ])
            ->columns(1);
    }
}