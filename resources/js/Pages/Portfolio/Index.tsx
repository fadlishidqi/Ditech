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
        <>
            <Head title="Portfolio - DITECH CREATIVE" />
            <Navbar />

            <main className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
                {/* Hero Section */}
                <section className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-7xl mx-auto text-center">
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
                            Portfolio Kami
                        </h1>
                        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                            Jelajahi proyek-proyek yang telah kami kerjakan
                            untuk berbagai klien
                        </p>
                    </div>
                </section>

                {/* Filters Section */}
                <section className="pb-8 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-7xl mx-auto">
                        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
                            <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
                                {/* Category Filter */}
                                <div className="flex-1 w-full lg:w-auto">
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Kategori
                                    </label>
                                    <div className="flex flex-wrap gap-2">
                                        <button
                                            onClick={() =>
                                                handleCategoryChange(null)
                                            }
                                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                                                selectedCategory === null
                                                    ? "bg-emerald-400 text-gray-900"
                                                    : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                                            }`}
                                        >
                                            Semua
                                        </button>
                                        {categories.map((category) => (
                                            <button
                                                key={category}
                                                onClick={() =>
                                                    handleCategoryChange(
                                                        category
                                                    )
                                                }
                                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                                                    selectedCategory === category
                                                        ? "bg-emerald-400 text-gray-900"
                                                        : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                                                }`}
                                            >
                                                {category}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Status Filter */}
                                <div className="w-full lg:w-auto">
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Status
                                    </label>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() =>
                                                handleStatusChange(null)
                                            }
                                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                                                selectedStatus === null
                                                    ? "bg-emerald-400 text-gray-900"
                                                    : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                                            }`}
                                        >
                                            Semua
                                        </button>
                                        <button
                                            onClick={() =>
                                                handleStatusChange("completed")
                                            }
                                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                                                selectedStatus === "completed"
                                                    ? "bg-emerald-400 text-gray-900"
                                                    : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                                            }`}
                                        >
                                            Selesai
                                        </button>
                                        <button
                                            onClick={() =>
                                                handleStatusChange("ongoing")
                                            }
                                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                                                selectedStatus === "ongoing"
                                                    ? "bg-emerald-400 text-gray-900"
                                                    : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                                            }`}
                                        >
                                            Sedang Berjalan
                                        </button>
                                    </div>
                                </div>

                                {/* Clear Filters */}
                                {(selectedCategory || selectedStatus) && (
                                    <button
                                        onClick={clearFilters}
                                        className="px-4 py-2 rounded-lg text-sm font-medium bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-all"
                                    >
                                        Reset Filter
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Portfolio Grid */}
                <section className="pb-16 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-7xl mx-auto">
                        {portfolios.data.length === 0 ? (
                            <div className="text-center py-20">
                                <p className="text-2xl text-gray-400">
                                    Tidak ada portfolio yang ditemukan
                                </p>
                            </div>
                        ) : (
                            <>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {portfolios.data.map((portfolio) => (
                                        <Link
                                            key={portfolio.id}
                                            href={`/portofolio/${portfolio.slug}`}
                                            className="group"
                                        >
                                            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-emerald-400/20 transition-all duration-300 transform hover:-translate-y-2">
                                                {/* Image */}
                                                <div className="relative h-48 overflow-hidden">
                                                    <LoadingImage
                                                        src={portfolio.image}
                                                        alt={portfolio.title}
                                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                                    />
                                                    {portfolio.is_featured && (
                                                        <div className="absolute top-4 right-4 bg-emerald-400 text-gray-900 px-3 py-1 rounded-full text-xs font-bold">
                                                            Featured
                                                        </div>
                                                    )}
                                                    <div className="absolute top-4 left-4 bg-gray-900/80 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium">
                                                        {portfolio.category}
                                                    </div>
                                                </div>

                                                {/* Content */}
                                                <div className="p-6">
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <span
                                                            className={`px-2 py-1 rounded text-xs font-medium ${
                                                                portfolio.status ===
                                                                "completed"
                                                                    ? "bg-green-500/20 text-green-400"
                                                                    : "bg-yellow-500/20 text-yellow-400"
                                                            }`}
                                                        >
                                                            {portfolio.status ===
                                                            "completed"
                                                                ? "Selesai"
                                                                : "Sedang Berjalan"}
                                                        </span>
                                                    </div>

                                                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">
                                                        {portfolio.title}
                                                    </h3>

                                                    <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                                                        {portfolio.description}
                                                    </p>

                                                    {portfolio.client_name && (
                                                        <p className="text-gray-500 text-xs mb-3">
                                                            Client:{" "}
                                                            {
                                                                portfolio.client_name
                                                            }
                                                        </p>
                                                    )}

                                                    {/* Technologies */}
                                                    <div className="flex flex-wrap gap-2">
                                                        {portfolio.technologies
                                                            .slice(0, 3)
                                                            .map((tech) => (
                                                                <span
                                                                    key={tech}
                                                                    className="px-2 py-1 bg-gray-700/50 text-gray-300 rounded text-xs"
                                                                >
                                                                    {tech}
                                                                </span>
                                                            ))}
                                                        {portfolio.technologies
                                                            .length > 3 && (
                                                            <span className="px-2 py-1 bg-gray-700/50 text-gray-300 rounded text-xs">
                                                                +
                                                                {portfolio
                                                                    .technologies
                                                                    .length - 3}
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
                                        <div className="flex gap-2">
                                            {portfolios.links.map(
                                                (link, index) => (
                                                    <button
                                                        key={index}
                                                        onClick={() => {
                                                            if (link.url) {
                                                                router.visit(
                                                                    link.url
                                                                );
                                                            }
                                                        }}
                                                        disabled={!link.url}
                                                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                                                            link.active
                                                                ? "bg-emerald-400 text-gray-900"
                                                                : link.url
                                                                ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                                                                : "bg-gray-800 text-gray-600 cursor-not-allowed"
                                                        }`}
                                                        dangerouslySetInnerHTML={{
                                                            __html: link.label,
                                                        }}
                                                    />
                                                )
                                            )}
                                        </div>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
}
