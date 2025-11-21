import React, { useState } from "react";
import { Head, Link, router } from "@inertiajs/react";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";
import LoadingImage from "@/Components/LoadingImage";

interface Portfolio {
    id: number;
    title: string;
    slug: string;
    description: string;
    image: string;
    category: string;
    client_name: string;
    technologies: string[];
    status: "ongoing" | "completed";
    is_featured: boolean;
    published_at: string;
}

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface PortfolioData {
    data: Portfolio[];
    links: PaginationLink[];
    current_page: number;
    last_page: number;
}

interface Props {
    portfolios: PortfolioData;
    categories: string[];
    filters: {
        category: string | null;
        status: string | null;
    };
}

export default function Index({ portfolios, categories, filters }: Props) {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(
        filters.category
    );
    const [selectedStatus, setSelectedStatus] = useState<string | null>(
        filters.status
    );

    const handleFilter = (category: string | null, status: string | null) => {
        router.get(
            "/portofolio",
            {
                category: category || undefined,
                status: status || undefined,
            },
            {
                preserveState: true,
                preserveScroll: true,
            }
        );
    };

    const handleCategoryChange = (category: string | null) => {
        setSelectedCategory(category);
        handleFilter(category, selectedStatus);
    };

    const handleStatusChange = (status: string | null) => {
        setSelectedStatus(status);
        handleFilter(selectedCategory, status);
    };

    const clearFilters = () => {
        setSelectedCategory(null);
        setSelectedStatus(null);
        router.get("/portofolio");
    };

    return (
        <div
            className="min-h-screen bg-cover bg-center bg-no-repeat relative"
            style={{ backgroundImage: "url('/images/BGHERO.jpg')" }}
        >
            <Head title="Portfolio - DITECH CREATIVE" />

            {/* Background overlay */}
            <div className="absolute inset-0 bg-black/50 z-0"></div>

            {/* Content */}
            <div className="relative z-10">
                <Navbar />

                <main className="relative">
                    {/* Hero Section */}
                    <section className="pt-32 pb-8 px-4 sm:px-6 lg:px-8">
                        <div className="max-w-7xl mx-auto text-center">
                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
                                Portfolio Kami
                            </h1>
                            <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto mb-8">
                                Jelajahi proyek-proyek yang telah kami kerjakan untuk berbagai klien
                            </p>
                        </div>
                    </section>

                    {/* Filters Section - Minimalist */}
                    <section className="pb-8 px-4 sm:px-6 lg:px-8">
                        <div className="max-w-7xl mx-auto">
                            <div className="flex flex-wrap items-center justify-center gap-2 mb-4">
                                {/* All Categories */}
                                <button
                                    onClick={() => handleCategoryChange(null)}
                                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                                        selectedCategory === null
                                            ? "bg-emerald-400 text-gray-900 shadow-lg shadow-emerald-400/50"
                                            : "bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm"
                                    }`}
                                >
                                    Semua Kategori
                                </button>

                                {/* Category Pills */}
                                {categories.map((category) => (
                                    <button
                                        key={category}
                                        onClick={() => handleCategoryChange(category)}
                                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                                            selectedCategory === category
                                                ? "bg-emerald-400 text-gray-900 shadow-lg shadow-emerald-400/50"
                                                : "bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm"
                                        }`}
                                    >
                                        {category}
                                    </button>
                                ))}
                            </div>

                            {/* Status Filter Pills */}
                            <div className="flex flex-wrap items-center justify-center gap-2">
                                <button
                                    onClick={() => handleStatusChange(null)}
                                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                                        selectedStatus === null
                                            ? "bg-emerald-400 text-gray-900 shadow-lg shadow-emerald-400/50"
                                            : "bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm"
                                    }`}
                                >
                                    Semua Status
                                </button>
                                <button
                                    onClick={() => handleStatusChange("completed")}
                                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                                        selectedStatus === "completed"
                                            ? "bg-emerald-400 text-gray-900 shadow-lg shadow-emerald-400/50"
                                            : "bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm"
                                    }`}
                                >
                                    Selesai
                                </button>
                                <button
                                    onClick={() => handleStatusChange("ongoing")}
                                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                                        selectedStatus === "ongoing"
                                            ? "bg-emerald-400 text-gray-900 shadow-lg shadow-emerald-400/50"
                                            : "bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm"
                                    }`}
                                >
                                    Sedang Berjalan
                                </button>

                                {/* Reset Filter */}
                                {(selectedCategory || selectedStatus) && (
                                    <button
                                        onClick={clearFilters}
                                        className="px-4 py-2 rounded-full text-sm font-medium bg-red-500/20 text-red-400 hover:bg-red-500/30 backdrop-blur-sm transition-all duration-300"
                                    >
                                        ✕ Reset
                                    </button>
                                )}
                            </div>
                        </div>
                    </section>

                    {/* Portfolio Grid */}
                    <section className="pb-16 px-4 sm:px-6 lg:px-8">
                        <div className="max-w-7xl mx-auto">
                            {portfolios.data.length === 0 ? (
                                <div className="text-center py-20">
                                    <p className="text-2xl text-white/60">
                                        Tidak ada portfolio yang ditemukan
                                    </p>
                                </div>
                            ) : (
                                <>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {portfolios.data.map((portfolio) => (
                                            <Link
                                                key={portfolio.id}
                                                href={`/portofolio/${portfolio.slug}`}
                                                className="group"
                                            >
                                                <div className="bg-white/10 backdrop-blur-md rounded-xl overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-emerald-400/30 transition-all duration-300 transform hover:-translate-y-2 border border-white/10">
                                                    {/* Image */}
                                                    <div className="relative h-48 overflow-hidden">
                                                        <LoadingImage
                                                            src={portfolio.image}
                                                            alt={portfolio.title}
                                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                                        />
                                                        {portfolio.is_featured && (
                                                            <div className="absolute top-3 right-3 bg-emerald-400 text-gray-900 px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                                                                ⭐ Featured
                                                            </div>
                                                        )}
                                                        <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium">
                                                            {portfolio.category}
                                                        </div>
                                                    </div>

                                                    {/* Content */}
                                                    <div className="p-5">
                                                        <div className="flex items-center gap-2 mb-3">
                                                            <span
                                                                className={`px-2 py-1 rounded-full text-xs font-medium ${
                                                                    portfolio.status === "completed"
                                                                        ? "bg-green-400/20 text-green-300"
                                                                        : "bg-yellow-400/20 text-yellow-300"
                                                                }`}
                                                            >
                                                                {portfolio.status === "completed"
                                                                    ? "✓ Selesai"
                                                                    : "⏳ Sedang Berjalan"}
                                                            </span>
                                                        </div>

                                                        <h3 className="text-lg font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors line-clamp-1">
                                                            {portfolio.title}
                                                        </h3>

                                                        <p className="text-gray-300 text-sm mb-3 line-clamp-2">
                                                            {portfolio.description}
                                                        </p>

                                                        {portfolio.client_name && (
                                                            <p className="text-gray-400 text-xs mb-3">
                                                                👤 {portfolio.client_name}
                                                            </p>
                                                        )}

                                                        {/* Technologies */}
                                                        <div className="flex flex-wrap gap-1.5">
                                                            {portfolio.technologies
                                                                .slice(0, 3)
                                                                .map((tech) => (
                                                                    <span
                                                                        key={tech}
                                                                        className="px-2 py-1 bg-white/10 text-gray-300 rounded-md text-xs"
                                                                    >
                                                                        {tech}
                                                                    </span>
                                                                ))}
                                                            {portfolio.technologies.length > 3 && (
                                                                <span className="px-2 py-1 bg-emerald-400/20 text-emerald-300 rounded-md text-xs font-medium">
                                                                    +{portfolio.technologies.length - 3}
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>

                                    {/* Pagination */}
                                    {portfolios.last_page > 1 && (
                                        <div className="mt-12 flex justify-center">
                                            <div className="flex gap-2 bg-white/10 backdrop-blur-md rounded-full p-2">
                                                {portfolios.links.map((link, index) => (
                                                    <button
                                                        key={index}
                                                        onClick={() => {
                                                            if (link.url) {
                                                                router.visit(link.url);
                                                            }
                                                        }}
                                                        disabled={!link.url}
                                                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                                                            link.active
                                                                ? "bg-emerald-400 text-gray-900 shadow-lg shadow-emerald-400/50"
                                                                : link.url
                                                                ? "text-white hover:bg-white/20"
                                                                : "text-gray-500 cursor-not-allowed"
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
