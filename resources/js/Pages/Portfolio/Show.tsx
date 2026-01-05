// resources/js/Pages/Portfolio/Show.tsx
import React, { useState } from "react";
import { Head, Link } from "@inertiajs/react";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";
import LoadingImage from "@/Components/LoadingImage";

interface Portfolio {
    id: number;
    title: string;
    slug: string;
    description: string;
    full_description: string;
    image: string;
    images: string[];
    image_url?: string;
    images_url?: string[];
    category: string;
    client_name: string;
    project_url: string | null;
    technologies: string[];
    status: "ongoing" | "completed";
    is_featured: boolean;
    published_at: string;
}

interface Props {
    portfolio: Portfolio;
    relatedPortfolios: Portfolio[];
}

export default function Show({ portfolio, relatedPortfolios }: Props) {
    const [selectedImage, setSelectedImage] = useState<string>(
        portfolio.image_url || portfolio.image
    );
    const allImages = [
        portfolio.image_url || portfolio.image,
        ...(portfolio.images_url || portfolio.images || [])
    ];

    return (
        <div
            className="min-h-screen bg-cover bg-center bg-no-repeat relative"
            style={{ backgroundImage: "url('/images/BGHERO.jpg')" }}
        >
            <Head title={`${portfolio.title} - Portfolio - DITECH CREATIVE`} />

            {/* Background overlay */}
            <div className="absolute inset-0 bg-black/50 z-0"></div>

            {/* Content */}
            <div className="relative z-10">
                <Navbar />

                <main className="relative">
                    {/* Back Button */}
                    <section className="pt-28 pb-6 px-4 sm:px-6 lg:px-8">
                        <div className="max-w-7xl mx-auto animate-fadeIn" style={{ animationFillMode: 'both' }}>
                            <Link
                                href="/portofolio"
                                className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md text-white hover:bg-white/20 rounded-full transition-all duration-300 border border-white/10 hover:pr-6"
                            >
                                <svg
                                    className="w-4 h-4"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M10 19l-7-7m0 0l7-7m-7 7h18"
                                    />
                                </svg>
                                Kembali ke Portfolio
                            </Link>
                        </div>
                    </section>

                    {/* Hero Section */}
                    <section className="pb-12 px-4 sm:px-6 lg:px-8">
                        <div className="max-w-7xl mx-auto">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                {/* Image Gallery - Left Side */}
                                <div className="animate-slideInFromBottom" style={{ animationDelay: '100ms', animationFillMode: 'both' }}>
                                    <div className="sticky top-24">
                                        {/* Main Image - Portrait 4:5 ratio */}
                                        <div className="bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden shadow-2xl mb-4 border border-white/10">
                                            <div className="relative" style={{ aspectRatio: '4/5' }}>
                                                <LoadingImage
                                                    src={selectedImage}
                                                    alt={portfolio.title}
                                                    className="w-full h-full object-cover transition-all duration-500"
                                                />
                                            </div>
                                        </div>

                                        {/* Thumbnail Gallery */}
                                        {allImages.length > 1 && (
                                            <div className="grid grid-cols-4 gap-3">
                                                {allImages.map((image, index) => (
                                                    <button
                                                        key={index}
                                                        onClick={() => setSelectedImage(image)}
                                                        className={`rounded-xl overflow-hidden transition-all duration-300 border-2 ${selectedImage === image
                                                                ? "border-emerald-400 shadow-lg shadow-emerald-400/50 scale-105"
                                                                : "border-white/10 opacity-70 hover:opacity-100 hover:border-emerald-400/30"
                                                            }`}
                                                    >
                                                        <div style={{ aspectRatio: '4/5' }}>
                                                            <LoadingImage
                                                                src={image}
                                                                alt={`${portfolio.title} ${index + 1}`}
                                                                className="w-full h-full object-cover"
                                                            />
                                                        </div>
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Content - Right Side */}
                                <div className="animate-slideInFromBottom" style={{ animationDelay: '200ms', animationFillMode: 'both' }}>
                                    {/* Category & Status */}
                                    <div className="flex items-center flex-wrap gap-3 mb-8">
                                        <span className="px-5 py-2 bg-emerald-400/15 text-emerald-300 rounded-xl text-sm font-semibold border border-emerald-400/20">
                                            {portfolio.category}
                                        </span>
                                        <span
                                            className={`px-5 py-2 rounded-xl text-sm font-semibold border ${portfolio.status === "completed"
                                                    ? "bg-green-500/15 text-green-300 border-green-500/20"
                                                    : "bg-yellow-500/15 text-yellow-300 border-yellow-500/20"
                                                }`}
                                        >
                                            {portfolio.status === "completed" ? "Selesai" : "Sedang Berjalan"}
                                        </span>
                                        {portfolio.is_featured && (
                                            <span className="px-5 py-2 bg-purple-500/15 text-purple-300 rounded-xl text-sm font-semibold border border-purple-500/20">
                                                Featured
                                            </span>
                                        )}
                                    </div>

                                    {/* Title */}
                                    <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight">
                                        {portfolio.title}
                                    </h1>

                                    {/* Description */}
                                    <p className="text-lg text-gray-300 mb-10 leading-relaxed">
                                        {portfolio.description}
                                    </p>

                                    {/* Technologies */}
                                    <div className="mb-10">
                                        <h3 className="text-xl font-bold text-white mb-4">
                                            Teknologi yang Digunakan
                                        </h3>
                                        <div className="flex flex-wrap gap-2.5">
                                            {portfolio.technologies.map((tech) => (
                                                <span
                                                    key={tech}
                                                    className="px-4 py-2 bg-white/10 text-gray-300 rounded-lg text-sm font-medium backdrop-blur-sm border border-white/10 hover:bg-white/15 transition-colors"
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Project URL */}
                                    {portfolio.project_url && (
                                        <div className="mb-10">
                                            <a
                                                href={portfolio.project_url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-2 px-8 py-4 bg-emerald-400 text-gray-900 rounded-xl font-bold hover:bg-emerald-300 transition-all duration-300 shadow-lg shadow-emerald-400/40 hover:shadow-emerald-400/60 active:scale-95"
                                            >
                                                Kunjungi Website
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                                    />
                                                </svg>
                                            </a>
                                        </div>
                                    )}

                                    {/* Full Description */}
                                    {portfolio.full_description && (
                                        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 animate-fadeIn" style={{ animationDelay: '300ms', animationFillMode: 'both' }}>
                                            <h3 className="text-xl font-bold text-white mb-4">
                                                Tentang Proyek
                                            </h3>
                                            <div
                                                className="text-gray-300 prose prose-invert max-w-none leading-relaxed text-base"
                                                dangerouslySetInnerHTML={{
                                                    __html: portfolio.full_description.replace(/\n/g, "<br>"),
                                                }}
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Related Projects */}
                    {relatedPortfolios.length > 0 && (
                        <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-white/10">
                            <div className="max-w-7xl mx-auto">
                                <h2 className="text-4xl font-bold text-white mb-12 text-center animate-slideInFromBottom" style={{ animationDelay: '400ms', animationFillMode: 'both' }}>
                                    Proyek Terkait
                                </h2>

                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {relatedPortfolios.map((related, index) => (
                                        <Link
                                            key={related.id}
                                            href={`/portofolio/${related.slug}`}
                                            className="group animate-slideInFromBottom"
                                            style={{
                                                animationDelay: `${500 + (index * 100)}ms`,
                                                animationFillMode: 'both'
                                            }}
                                        >
                                            <div className="bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden hover:bg-white/10 transition-all duration-500 border border-white/10 hover:border-emerald-400/50 hover:shadow-2xl hover:shadow-emerald-400/20">
                                                {/* Image - Portrait 4:5 ratio */}
                                                <div className="relative overflow-hidden" style={{ aspectRatio: '4/5' }}>
                                                    <LoadingImage
                                                        src={related.image}
                                                        alt={related.title}
                                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                                    />
                                                    <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-sm text-white px-4 py-1.5 rounded-full text-sm font-medium">
                                                        {related.category}
                                                    </div>
                                                </div>

                                                {/* Content */}
                                                <div className="p-6">
                                                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-emerald-400 transition-colors line-clamp-2 leading-tight">
                                                        {related.title}
                                                    </h3>

                                                    <p className="text-gray-400 text-sm mb-4 line-clamp-2 leading-relaxed">
                                                        {related.description}
                                                    </p>

                                                    {/* Technologies */}
                                                    <div className="flex flex-wrap gap-2">
                                                        {related.technologies
                                                            .slice(0, 3)
                                                            .map((tech) => (
                                                                <span
                                                                    key={tech}
                                                                    className="px-3 py-1 bg-white/10 text-gray-300 rounded-lg text-xs font-medium"
                                                                >
                                                                    {tech}
                                                                </span>
                                                            ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </section>
                    )}
                </main>

                <Footer />
            </div>
        </div>
    );
}