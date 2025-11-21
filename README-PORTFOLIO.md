# Portfolio Feature Setup

Fitur portfolio dinamis sudah berhasil dibuat dengan Laravel best practices.

## Fitur yang Sudah Dibuat

### Backend (Laravel)
- **Migration**: Database schema lengkap untuk portfolios table (`database/migrations/2025_11_21_071208_create_portfolios_table.php`)
- **Model**: Portfolio model dengan casts, scopes, dan auto slug generation (`app/Models/Portfolio.php`)
- **Factory**: PortfolioFactory untuk testing dan seeding (`database/factories/PortfolioFactory.php`)
- **Seeder**: PortfolioSeeder untuk sample data (`database/seeders/PortfolioSeeder.php`)
- **Controller**: PortfolioController dengan index dan show methods (`app/Http/Controllers/PortfolioController.php`)
- **Routes**: Portfolio routes sudah ditambahkan di `routes/web.php`

### Frontend (React + TypeScript)
- **Portfolio Index Page**: Halaman daftar portfolio dengan filter dan pagination (`resources/js/Pages/Portfolio/Index.tsx`)
- **Portfolio Detail Page**: Halaman detail portfolio dengan image gallery dan related projects (`resources/js/Pages/Portfolio/Show.tsx`)

### Admin Panel (Filament)
- **Filament Resource**: CRUD lengkap untuk mengelola portfolio di admin panel
  - Form dengan validation (`app/Filament/Resources/Portfolios/Schemas/PortfolioForm.php`)
  - Table dengan filters dan bulk actions (`app/Filament/Resources/Portfolios/Tables/PortfoliosTable.php`)

## Cara Menjalankan

### 1. Setup Database

Konfigurasikan database di file `.env`:

```env
# Untuk MySQL
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=ditech
DB_USERNAME=root
DB_PASSWORD=your_password

# ATAU untuk SQLite
DB_CONNECTION=sqlite
DB_DATABASE=/path/to/database.sqlite
```

### 2. Run Migration

```bash
php artisan migrate
```

Migration ini akan membuat tabel `portfolios` dengan kolom:
- id
- title
- slug (unique, auto-generated)
- description (short)
- full_description (long text)
- image (main image URL)
- images (JSON array untuk galeri)
- category
- client_name
- project_url
- technologies (JSON array)
- status (ongoing/completed)
- is_featured (boolean)
- sort_order
- published_at
- timestamps
- soft deletes

### 3. Seed Sample Data (Opsional)

```bash
php artisan db:seed --class=PortfolioSeeder
```

Ini akan membuat:
- 15 portfolio items dengan data random
- 3 featured portfolio items

### 4. Build Frontend Assets

```bash
npm install
npm run build

# Untuk development
npm run dev
```

## Struktur URL

### Public URLs:
- **Portfolio List**: `/portofolio`
  - Filter by category: `/portofolio?category=Website`
  - Filter by status: `/portofolio?status=completed`
- **Portfolio Detail**: `/portofolio/{slug}`

### Admin URLs:
- **Admin Panel**: `/admin`
- **Portfolio Management**: `/admin/portfolios`

## Fitur Portfolio

### Halaman Index:
- Grid layout responsive
- Filter by category dan status
- Pagination
- Search functionality
- Status badge (Selesai/Sedang Berjalan)
- Featured badge
- Technology tags
- Client name
- Hover animations

### Halaman Detail:
- Image gallery dengan thumbnail navigation
- Full description
- Technology badges
- Project URL link (jika ada)
- Related projects (same category)
- Client information
- CTA section

### Admin Panel:
- Full CRUD operations
- Image URL management
- Technology tags input
- Category selection
- Status management
- Featured toggle
- Sort order
- Publish date
- Soft delete support
- Bulk actions
- Filters and search
- Preview link to public page

## Best Practices yang Diterapkan

1. **Model Best Practices**:
   - Fillable attributes untuk mass assignment protection
   - Type casting untuk JSON dan boolean fields
   - Query scopes untuk reusable queries
   - Auto slug generation
   - Route model binding dengan slug
   - Soft deletes

2. **Controller Best Practices**:
   - Resource methods (index, show)
   - Query optimization dengan eager loading
   - Pagination
   - Filter support
   - Published scope untuk security

3. **Frontend Best Practices**:
   - TypeScript untuk type safety
   - Component-based architecture
   - Responsive design
   - Loading states
   - Error handling
   - SEO-friendly URLs (slug-based)

4. **Database Best Practices**:
   - Proper indexing
   - Appropriate field types
   - JSON untuk arrays
   - Soft deletes
   - Timestamps
   - Foreign key naming conventions

## Teknologi yang Digunakan

- **Backend**: Laravel 12, Inertia.js, Filament 4.0
- **Frontend**: React 19, TypeScript, Tailwind CSS
- **Database**: MySQL/SQLite compatible
- **Admin**: Filament Admin Panel

## Next Steps

1. Konfigurasi database connection
2. Run migrations
3. (Optional) Run seeder untuk sample data
4. Build frontend assets
5. Access `/admin` untuk manage portfolios
6. Access `/portofolio` untuk melihat hasil

---

Fitur portfolio sudah siap digunakan! 🚀
