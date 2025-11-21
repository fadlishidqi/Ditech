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
        portfolio.image
    );
    const allImages = [portfolio.image, ...(portfolio.images || [])];

    return (
        <>
            <Head title={`${portfolio.title} - Portfolio - DITECH CREATIVE`} />
            <Navbar />

            <main className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
                {/* Back Button */}
                <section className="pt-24 pb-8 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-7xl mx-auto">
                        <Link
                            href="/portofolio"
                            className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors"
                        >
                            <svg
                                className="w-5 h-5"
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
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                            {/* Image Gallery */}
                            <div>
                                <div className="sticky top-24">
                                    {/* Main Image */}
                                    <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl overflow-hidden shadow-2xl mb-4">
                                        <LoadingImage
                                            src={selectedImage}
                                            alt={portfolio.title}
                                            className="w-full h-[400px] object-cover"
                                        />
                                    </div>

                                    {/* Thumbnail Gallery */}
                                    {allImages.length > 1 && (
                                        <div className="grid grid-cols-4 gap-4">
                                            {allImages.map((image, index) => (
                                                <button
                                                    key={index}
                                                    onClick={() =>
                                                        setSelectedImage(image)
                                                    }
                                                    className={`rounded-lg overflow-hidden transition-all ${
                                                        selectedImage === image
                                                            ? "ring-2 ring-emerald-400"
                                                            : "opacity-60 hover:opacity-100"
                                                    }`}
                                                >
                                                    <LoadingImage
                                                        src={image}
                                                        alt={`${portfolio.title} ${index + 1}`}
                                                        className="w-full h-20 object-cover"
                                                    />
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Content */}
                            <div>
                                {/* Category & Status */}
                                <div className="flex items-center gap-3 mb-4">
                                    <span className="px-3 py-1 bg-emerald-400/20 text-emerald-400 rounded-full text-sm font-medium">
                                        {portfolio.category}
                                    </span>
                                    <span
                                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                                            portfolio.status === "completed"
                                                ? "bg-green-500/20 text-green-400"
                                                : "bg-yellow-500/20 text-yellow-400"
                                        }`}
                                    >
                                        {portfolio.status === "completed"
                                            ? "Selesai"
                                            : "Sedang Berjalan"}
                                    </span>
                                    {portfolio.is_featured && (
                                        <span className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm font-medium">
                                            Featured
                                        </span>
                                    )}
                                </div>

                                {/* Title */}
                                <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
                                    {portfolio.title}
                                </h1>

                                {/* Client */}
                                {portfolio.client_name && (
                                    <p className="text-gray-400 mb-6">
                                        <span className="font-semibold text-gray-300">
                                            Client:
                                        </span>{" "}
                                        {portfolio.client_name}
                                    </p>
                                )}

                                {/* Description */}
                                <p className="text-xl text-gray-300 mb-8">
                                    {portfolio.description}
                                </p>

                                {/* Technologies */}
                                <div className="mb-8">
                                    <h3 className="text-lg font-semibold text-white mb-3">
                                        Teknologi yang Digunakan
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {portfolio.technologies.map((tech) => (
                                            <span
                                                key={tech}
                                                className="px-4 py-2 bg-gray-700/50 text-gray-300 rounded-lg text-sm font-medium"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Project URL */}
                                {portfolio.project_url && (
                                    <div className="mb-8">
                                        <a
                                            href={portfolio.project_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-400 text-gray-900 rounded-lg font-semibold hover:bg-emerald-300 transition-colors"
                                        >
                                            Kunjungi Website
                                            <svg
                                                className="w-5 h-5"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
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
                                    <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 mb-8">
                                        <h3 className="text-lg font-semibold text-white mb-3">
                                            Tentang Proyek
                                        </h3>
                                        <div
                                            className="text-gray-300 prose prose-invert max-w-none"
                                            dangerouslySetInnerHTML={{
                                                __html: portfolio.full_description.replace(
                                                    /\n/g,
                                                    "<br>"
                                                ),
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
                    <section className="py-16 px-4 sm:px-6 lg:px-8 border-t border-gray-700">
                        <div className="max-w-7xl mx-auto">
                            <h2 className="text-3xl font-bold text-white mb-8">
                                Proyek Terkait
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {relatedPortfolios.map((related) => (
                                    <Link
                                        key={related.id}
                                        href={`/portofolio/${related.slug}`}
                                        className="group"
                                    >
                                        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-emerald-400/20 transition-all duration-300 transform hover:-translate-y-2">
                                            {/* Image */}
                                            <div className="relative h-48 overflow-hidden">
                                                <LoadingImage
                                                    src={related.image}
                                                    alt={related.title}
                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                                />
                                                <div className="absolute top-4 left-4 bg-gray-900/80 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium">
                                                    {related.category}
                                                </div>
                                            </div>

                                            {/* Content */}
                                            <div className="p-6">
                                                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">
                                                    {related.title}
                                                </h3>

                                                <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                                                    {related.description}
                                                </p>

                                                {/* Technologies */}
                                                <div className="flex flex-wrap gap-2">
                                                    {related.technologies
                                                        .slice(0, 3)
                                                        .map((tech) => (
                                                            <span
                                                                key={tech}
                                                                className="px-2 py-1 bg-gray-700/50 text-gray-300 rounded text-xs"
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

                {/* CTA Section */}
                <section className="py-16 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto">
                        <div className="bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-2xl p-8 sm:p-12 text-center shadow-2xl">
                            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                                Punya Proyek?
                            </h2>
                            <p className="text-lg text-gray-800 mb-8">
                                Mari diskusikan bagaimana kami dapat membantu
                                mewujudkan ide Anda
                            </p>
                            <Link
                                href="/#contact"
                                className="inline-block px-8 py-3 bg-gray-900 text-white rounded-lg font-semibold hover:bg-gray-800 transition-colors"
                            >
                                Hubungi Kami
                            </Link>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
}
