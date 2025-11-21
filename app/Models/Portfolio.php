<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Str;

class Portfolio extends Model
{
    use HasFactory, SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'title',
        'slug',
        'description',
        'full_description',
        'image',
        'images',
        'category',
        'project_url',
        'technologies',
        'status',
        'sort_order',
        'published_at',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'images' => 'array',
        'technologies' => 'array',
        'published_at' => 'datetime',
    ];

    /**
     * Boot the model.
     */
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($portfolio) {
            if (empty($portfolio->slug)) {
                $portfolio->slug = Str::slug($portfolio->title);
            }

            // Auto-publish portfolio jika published_at belum diset
            if (empty($portfolio->published_at)) {
                $portfolio->published_at = now();
            }
        });

        static::updating(function ($portfolio) {
            if ($portfolio->isDirty('title') && empty($portfolio->slug)) {
                $portfolio->slug = Str::slug($portfolio->title);
            }
        });
    }

    /**
     * Scope a query to only include published portfolios.
     */
    public function scopePublished($query)
    {
        return $query->whereNotNull('published_at')
            ->where('published_at', '<=', now());
    }

    /**
     * Scope a query to filter by category.
     */
    public function scopeCategory($query, $category)
    {
        return $query->where('category', $category);
    }

    /**
     * Get the route key for the model.
     */
    public function getRouteKeyName()
    {
        return 'slug';
    }

    /**
     * Get the full URL for the main image.
     */
    public function getImageUrlAttribute()
    {
        if (empty($this->image)) {
            return null;
        }

        // If it's already a full URL, return as is
        if (filter_var($this->image, FILTER_VALIDATE_URL)) {
            return $this->image;
        }

        // Otherwise, prepend storage URL
        return asset('storage/' . $this->image);
    }

    /**
     * Get the full URLs for gallery images.
     */
    public function getImagesUrlAttribute()
    {
        if (empty($this->images)) {
            return [];
        }

        return collect($this->images)->map(function ($image) {
            // If it's already a full URL, return as is
            if (filter_var($image, FILTER_VALIDATE_URL)) {
                return $image;
            }

            // Otherwise, prepend storage URL
            return asset('storage/' . $image);
        })->toArray();
    }
}
