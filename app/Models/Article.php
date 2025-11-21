<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Str;

class Article extends Model
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
        'excerpt',
        'featured_image',
        'content_blocks',
        'category',
        'tags',
        'sort_order',
        'published_at',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'content_blocks' => 'array',
        'tags' => 'array',
        'published_at' => 'datetime',
    ];

    /**
     * Boot the model.
     */
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($article) {
            if (empty($article->slug)) {
                $article->slug = Str::slug($article->title);
            }

            // Auto-publish article jika published_at belum diset
            if (empty($article->published_at)) {
                $article->published_at = now();
            }
        });

        static::updating(function ($article) {
            if ($article->isDirty('title') && empty($article->slug)) {
                $article->slug = Str::slug($article->title);
            }
        });
    }

    /**
     * Scope a query to only include published articles.
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
     * Get the full URL for the featured image.
     */
    public function getFeaturedImageUrlAttribute()
    {
        if (empty($this->featured_image)) {
            return null;
        }

        // If it's already a full URL, return as is
        if (filter_var($this->featured_image, FILTER_VALIDATE_URL)) {
            return $this->featured_image;
        }

        // Otherwise, prepend storage URL
        return asset('storage/' . $this->featured_image);
    }

    /**
     * Process content blocks and convert image paths to full URLs.
     */
    public function getProcessedContentBlocksAttribute()
    {
        if (empty($this->content_blocks)) {
            return [];
        }

        return collect($this->content_blocks)->map(function ($block) {
            if ($block['type'] === 'image' && !empty($block['url'])) {
                // If it's already a full URL, return as is
                if (filter_var($block['url'], FILTER_VALIDATE_URL)) {
                    $block['url'] = $block['url'];
                } else {
                    // Otherwise, prepend storage URL
                    $block['url'] = asset('storage/' . $block['url']);
                }
            }
            return $block;
        })->toArray();
    }
}
