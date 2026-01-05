<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Str;

class Book extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'title',
        'slug',
        'author',
        'publisher',
        'year',
        'is_paid',
        'price',
        'e_isbn',
        'file_source',
        'description',
        'cover_image',
        'is_visible',
        'category',
        'tags',
        'sort_order',
    ];

    protected $casts = [
        'is_visible' => 'boolean',
        'is_paid' => 'boolean',
        'tags' => 'array',
        'year' => 'integer',
        'price' => 'integer'
    ];

    /**
     * Boot the model.
     */
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($book) {
            if (empty($book->slug)) {
                $book->slug = Str::slug($book->title);
            }
        });

        static::updating(function ($book) {
            if ($book->isDirty('title') && empty($book->slug)) {
                $book->slug = Str::slug($book->title);
            }
        });
    }

    /**
     * Scope a query to only include visible books.
     */
    public function scopeVisible($query)
    {
        return $query->where('is_visible', true);
    }

    /**
     * Scope a query to filter by category.
     */
    public function scopeCategory($query, $category)
    {
        return $query->where('category', $category);
    }

    public function getRouteKeyName()
    {
        return 'slug';
    }

    /**
     * Get the full URL for the cover image.
     */
    public function getCoverImageUrlAttribute()
    {
        if (empty($this->cover_image)) {
            return null;
        }

        if (filter_var($this->cover_image, FILTER_VALIDATE_URL)) {
            return $this->cover_image;
        }

        return asset('storage/' . $this->cover_image);
    }

    /**
     * Get the full URL for the digital book file.
     */
    public function getFileUrlAttribute()
    {
        if (empty($this->file_source)) {
            return null;
        }

        if (filter_var($this->file_source, FILTER_VALIDATE_URL)) {
            return $this->file_source;
        }

        return asset('storage/' . $this->file_source);
    }
}