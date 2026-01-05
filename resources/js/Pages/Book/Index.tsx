// resources/js/Pages/Book/Index.tsx
import React, { useState } from "react";
import { Head, Link, router } from "@inertiajs/react";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";
import LoadingImage from "@/Components/LoadingImage";

// Interface disesuaikan dengan data Buku
interface Book {
    id: number;
    title: string;
    slug: string;
    author: string;
    year: number;
    description: string;
    cover_image_url: string;
    category: string;
    tags: string[];
    created_at: string;
}

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface BookData {
    data: Book[];
    links: PaginationLink[];
    current_page: number;
    last_page: number;
}

interface Props {
    books: BookData;
    categories: string[];
    filters: {
        category: string | null;
        search: string | null;
    };
}

export default function BookIndex({ books, categories, filters }: Props) {
    const [search, setSearch] = useState<string>(filters.search || "");
    const [openCategory, setOpenCategory] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<string>(
        filters.category || ""
    );

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get(
            "/books",
            {
                search: search || undefined,
                category: selectedCategory || undefined,
            },
            {
                preserveState: true,
                preserveScroll: true,
            }
        );
    };

    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const category = e.target.value;
        setSelectedCategory(category);
        router.get(
            "/books",
            {
                search: search || undefined,
                category: category || undefined,
            },
            {
                preserveState: true,
                preserveScroll: true,
            }
        );
    };

    return (
        <div
            className="min-h-screen bg-cover bg-center bg-no-repeat relative"
            style={{ backgroundImage: "url('/images/BGHERO.jpg')" }}
        >
            <Head title="Buku Digital" />

            {/* Background overlay */}
            <div className="absolute inset-0 bg-black/50 z-0"></div>

            {/* Content */}
            <div className="relative z-10">
                <Navbar />

                <main className="relative">
                    {/* Hero Section */}
                    <section className="pt-32 pb-12 px-4 sm:px-6 lg:px-8">
                        <div className="max-w-7xl mx-auto text-center">
                            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight">
                                Buku <span className="text-emerald-400">Digital</span>
                            </h1>
                            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                                Koleksi buku, ebook, dan referensi pembelajaran yang dikurasi khusus untuk pengembangan skill Anda.
                            </p>
                        </div>
                    </section>

                    {/* Search & Filter Section */}
                    <section className="pb-12 px-4 sm:px-6 lg:px-8">
                        <div className="max-w-4xl mx-auto">
                            <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
                                {/* Search Input */}
                                <div className="flex-1">
                                    <input
                                        type="text"
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        placeholder="Cari judul atau penulis..."
                                        className="w-full px-6 py-3.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all"
                                    />
                                </div>

                                {/* Category Filter */}
                                <div className="relative sm:w-56">
                                    {/* Trigger */}
                                    <button
                                        type="button"
                                        onClick={() => setOpenCategory(!openCategory)}
                                        className="
                                            w-full px-5 py-3.5
                                            bg-white/10 backdrop-blur-xl
                                            border border-white/20
                                            rounded-xl
                                            text-white font-medium
                                            flex items-center justify-between
                                            transition-all duration-300
                                            hover:border-emerald-400/50
                                            focus:outline-none
                                            focus:ring-2 focus:ring-emerald-400
                                        "
                                    >
                                        <span>
                                            {selectedCategory || "Semua Kategori"}
                                        </span>

                                        <svg
                                            className={`w-5 h-5 transition-transform duration-300 ${
                                                openCategory ? "rotate-180" : ""
                                            }`}
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            viewBox="0 0 24 24"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </button>

                                    {/* Dropdown Panel */}
                                    {openCategory && (
                                        <div
                                            className="
                                                absolute z-50 mt-3 w-full
                                                rounded-2xl
                                                bg-[#1a1f26]/95 backdrop-blur-xl
                                                border border-white/10
                                                shadow-2xl shadow-black/40
                                                overflow-hidden
                                            "
                                        >
                                            {/* Semua Kategori */}
                                            <button
                                                onClick={() => {
                                                    setSelectedCategory("");
                                                    setOpenCategory(false);
                                                    router.get(
                                                        "/books",
                                                        {
                                                            search: search || undefined,
                                                            category: undefined,
                                                        },
                                                        {
                                                            preserveState: true,
                                                            preserveScroll: true,
                                                        }
                                                    );
                                                }}
                                                className="
                                                    w-full px-5 py-3
                                                    flex items-center justify-between
                                                    text-left
                                                    text-white
                                                    transition
                                                    hover:bg-white/5
                                                "
                                            >
                                                Semua Kategori
                                                {!selectedCategory && (
                                                    <svg
                                                        className="w-4 h-4 text-white"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        strokeWidth="3"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                                    </svg>
                                                )}
                                            </button>

                                            {categories.map((category) => (
                                                <button
                                                    key={category}
                                                    onClick={() => {
                                                        setSelectedCategory(category);
                                                        setOpenCategory(false);
                                                        router.get(
                                                            "/books",
                                                            {
                                                                search: search || undefined,
                                                                category: category,
                                                            },
                                                            {
                                                                preserveState: true,
                                                                preserveScroll: true,
                                                            }
                                                        );
                                                    }}
                                                    className={`
                                                        w-full px-5 py-3
                                                        flex items-center justify-between
                                                        text-left
                                                        transition
                                                        hover:bg-white/5
                                                        ${
                                                            selectedCategory === category
                                                                ? "bg-white/5 text-white"
                                                                : "text-white/80"
                                                        }
                                                    `}
                                                >
                                                    {category}
                                                    {selectedCategory === category && (
                                                        <svg
                                                            className="w-4 h-4 text-white"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            strokeWidth="3"
                                                            viewBox="0 0 24 24"
                                                        >
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                                        </svg>
                                                    )}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* Search Button */}
                                <button
                                    type="submit"
                                    className="px-8 py-3.5 bg-emerald-400 hover:bg-emerald-300 text-gray-900 font-semibold rounded-xl transition-all shadow-lg shadow-emerald-400/30 hover:shadow-emerald-400/50"
                                >
                                    Cari
                                </button>
                            </form>
                        </div>
                    </section>

                    {/* Book Grid */}
                    <section className="pb-20 px-4 sm:px-6 lg:px-8">
                        <div className="max-w-7xl mx-auto">
                            {books.data.length === 0 ? (
                                <div className="text-center py-32">
                                    <p className="text-2xl text-white/70 font-light">
                                        Tidak ada buku yang ditemukan
                                    </p>
                                </div>
                            ) : (
                                <>
                                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
                                        {books.data.map((book) => (
                                            <Link
                                                key={book.id}
                                                href={`/books/${book.slug}`}
                                                className="group"
                                            >
                                                <div className="bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden hover:bg-white/10 transition-all duration-500 border border-white/10 hover:border-emerald-400/50 hover:shadow-2xl hover:shadow-emerald-400/20 h-full flex flex-col">
                                                    {/* Image - 2:3 ratio (Standar Cover Buku) */}
                                                    <div className="relative overflow-hidden" style={{ aspectRatio: '2/3' }}>
                                                        <LoadingImage
                                                            src={book.cover_image_url}
                                                            alt={book.title}
                                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                                        />

                                                        {/* Category Badge */}
                                                        <div className="absolute top-2 left-2 bg-black/70 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium">
                                                            {book.category}
                                                        </div>
                                                    </div>

                                                    {/* Content */}
                                                    <div className="p-4 flex-1 flex flex-col">
                                                        <h3 className="text-lg font-bold text-white mb-2 line-clamp-2 leading-tight">
                                                            {book.title}
                                                        </h3>
                                                        
                                                        {/* Author */}
                                                        <p className="text-xs text-emerald-400 mb-2 uppercase tracking-wide font-semibold">
                                                            {book.author}
                                                        </p>

                                                        {/* Metadata Row */}
                                                        <div className="mt-auto pt-3 border-t border-white/10 flex items-center justify-between text-xs text-gray-400">
                                                            <span>{book.year ? `Tahun ${book.year}` : 'N/A'}</span>
                                                            <span className="hidden sm:inline group-hover:translate-x-1 transition-transform text-emerald-400 font-medium">
                                                                Lihat Detail &rarr;
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>

                                    {/* Pagination */}
                                    {books.last_page > 1 && (
                                        <div className="mt-16 flex justify-center">
                                            <div className="flex gap-2 bg-white/5 backdrop-blur-md rounded-2xl p-2 border border-white/10">
                                                {books.links.map((link, index) => (
                                                    <button
                                                        key={index}
                                                        onClick={() => {
                                                            if (link.url) {
                                                                router.visit(link.url);
                                                            }
                                                        }}
                                                        disabled={!link.url}
                                                        className={`min-w-[44px] px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                                                            link.active
                                                                ? "bg-emerald-400 text-gray-900 shadow-lg shadow-emerald-400/40"
                                                                : link.url
                                                                ? "text-white hover:bg-white/10"
                                                                : "text-gray-600 cursor-not-allowed"
                                                        }`}
                                                        dangerouslySetInnerHTML={{
                                                            __html: link.label,
                                                        }}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    </section>
                </main>

                <Footer />
            </div>
        </div>
    );
}