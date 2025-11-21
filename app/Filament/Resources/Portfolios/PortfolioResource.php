<?php

namespace App\Filament\Resources\Portfolios;

use App\Filament\Resources\Portfolios\Pages\CreatePortfolio;
use App\Filament\Resources\Portfolios\Pages\EditPortfolio;
use App\Filament\Resources\Portfolios\Pages\ListPortfolios;
use App\Models\Portfolio;
use Filament\Forms\Components\DateTimePicker;
use Filament\Forms\Components\MarkdownEditor;
use Filament\Forms\Components\Section;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TagsInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Columns\BadgeColumn;
use Filament\Tables\Columns\BooleanColumn;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Filters\TernaryFilter;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use Illuminate\Support\Str;

class PortfolioResource extends Resource
{
    protected static ?string $model = Portfolio::class;

    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';

    protected static ?string $navigationLabel = 'Portfolio';

    protected static ?string $modelLabel = 'Portfolio';

    protected static ?string $pluralModelLabel = 'Portfolios';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
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
                            ->helperText('URL gambar utama portfolio (Recommended: 1080x1350)'),

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
                            ->helperText('Masukkan teknologi yang digunakan, tekan Enter setelap setiap item')
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
                            ->helperText('Kosongkan untuk draft')
                            ->default(now()),
                    ])
                    ->columns(3),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                ImageColumn::make('image')
                    ->label('Gambar')
                    ->square()
                    ->size(60),

                TextColumn::make('title')
                    ->label('Judul')
                    ->searchable()
                    ->sortable()
                    ->limit(30)
                    ->weight('bold'),

                BadgeColumn::make('category')
                    ->label('Kategori')
                    ->colors([
                        'primary' => 'Website',
                        'success' => 'Mobile App',
                        'warning' => 'E-Commerce',
                        'danger' => 'Design',
                    ])
                    ->searchable(),

                BadgeColumn::make('status')
                    ->label('Status')
                    ->formatStateUsing(fn (string $state): string => match ($state) {
                        'completed' => 'Selesai',
                        'ongoing' => 'Sedang Berjalan',
                        default => $state,
                    })
                    ->colors([
                        'success' => 'completed',
                        'warning' => 'ongoing',
                    ]),

                BooleanColumn::make('is_featured')
                    ->label('Featured')
                    ->sortable(),

                TextColumn::make('published_at')
                    ->label('Tanggal Publikasi')
                    ->dateTime('d M Y')
                    ->sortable()
                    ->toggleable(),

                TextColumn::make('created_at')
                    ->label('Dibuat')
                    ->dateTime('d M Y H:i')
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                SelectFilter::make('category')
                    ->label('Kategori')
                    ->options([
                        'Website' => 'Website',
                        'Mobile App' => 'Mobile App',
                        'Desktop App' => 'Desktop App',
                        'E-Commerce' => 'E-Commerce',
                        'CMS' => 'CMS',
                        'API' => 'API',
                        'Design' => 'Design',
                    ]),

                SelectFilter::make('status')
                    ->label('Status')
                    ->options([
                        'ongoing' => 'Sedang Berjalan',
                        'completed' => 'Selesai',
                    ]),

                TernaryFilter::make('is_featured')
                    ->label('Featured'),

                Tables\Filters\TrashedFilter::make(),
            ])
            ->actions([
                Tables\Actions\ViewAction::make()
                    ->url(fn (Portfolio $record): string => route('portfolio.show', $record))
                    ->openUrlInNewTab(),
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                    Tables\Actions\ForceDeleteBulkAction::make(),
                    Tables\Actions\RestoreBulkAction::make(),
                ]),
            ])
            ->defaultSort('sort_order', 'asc');
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => ListPortfolios::route('/'),
            'create' => CreatePortfolio::route('/create'),
            'edit' => EditPortfolio::route('/{record}/edit'),
        ];
    }

    public static function getRecordRouteBindingEloquentQuery(): Builder
    {
        return parent::getRecordRouteBindingEloquentQuery()
            ->withoutGlobalScopes([
                SoftDeletingScope::class,
            ]);
    }
}
