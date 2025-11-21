import React from "react";
import { Head, Link } from "@inertiajs/react";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";
import LoadingImage from "@/Components/LoadingImage";
import ReactMarkdown from "react-markdown";

interface ContentBlock {
    type: "text" | "image";
    content?: string;
    url?: string;
    caption?: string;
}

interface Article {
    id: number;
    title: string;
    slug: string;
    excerpt: string;
    featured_image: string;
    featured_image_url?: string;
    processed_content_blocks: ContentBlock[];
    category: string;
    tags: string[];
    published_at: string;
}

interface RelatedArticle {
    id: number;
    title: string;
    slug: string;
    excerpt: string;
    featured_image: string;
    featured_image_url?: string;
    category: string;
    published_at: string;
}

interface Props {
    article: Article;
    relatedArticles: RelatedArticle[];
}

export default function Show({ article, relatedArticles }: Props) {
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("id-ID", {
            day: "numeric",
            month: "long",
            year: "numeric",
        });
    };

    return (
        <div
            className="min-h-screen bg-cover bg-center bg-no-repeat relative"
            style={{ backgroundImage: "url('/images/BGHERO.jpg')" }}
        >
            <Head title={`${article.title} - DITECH CREATIVE`} />

            {/* Background overlay */}
            <div className="absolute inset-0 bg-black/50 z-0"></div>

            {/* Content */}
            <div className="relative z-10">
                <Navbar />

                <main className="relative">
                    {/* Article Header */}
                    <section className="pt-32 pb-12 px-4 sm:px-6 lg:px-8">
                        <div className="max-w-4xl mx-auto">
                            {/* Category & Date */}
                            <div className="flex items-center gap-4 mb-6">
                                <span className="px-4 py-1.5 bg-emerald-400/20 backdrop-blur-sm text-emerald-300 rounded-full text-sm font-semibold">
                                    {article.category}
                                </span>
                                <span className="text-gray-400 text-sm">
                                    {formatDate(article.published_at)}
                                </span>
                            </div>

                            {/* Title */}
                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                                {article.title}
                            </h1>

                            {/* Excerpt */}
                            <p className="text-xl text-gray-300 leading-relaxed mb-8">
                                {article.excerpt}
                            </p>

                            {/* Tags */}
                            {article.tags && article.tags.length > 0 && (
                                <div className="flex flex-wrap gap-2 mb-8">
                                    {article.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="px-4 py-1.5 bg-white/10 text-gray-300 rounded-lg text-sm font-medium"
                                        >
                                            #{tag}
                                        </span>
                                    ))}
                                </div>
                            )}

                            {/* Featured Image */}
                            <div className="relative overflow-hidden rounded-2xl mb-12" style={{ aspectRatio: '16/9' }}>
                                <LoadingImage
                                    src={article.featured_image_url || article.featured_image}
                                    alt={article.title}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                    </section>

                    {/* Article Content */}
                    <section className="pb-12 px-4 sm:px-6 lg:px-8">
                        <div className="max-w-4xl mx-auto">
                            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 sm:p-8 lg:p-12 border border-white/10">
                                {article.processed_content_blocks && article.processed_content_blocks.length > 0 ? (
                                    <div className="space-y-8">
                                        {article.processed_content_blocks.map((block, index) => (
                                            <div key={index}>
                                                {block.type === "text" && block.content && (
                                                    <div className="prose prose-invert prose-lg max-w-none">
                                                        <ReactMarkdown
                                                            components={{
                                                                h1: ({ node, ...props }) => (
                                                                    <h1 className="text-3xl font-bold text-white mb-4 mt-8" {...props} />
                                                                ),
                                                                h2: ({ node, ...props }) => (
                                                                    <h2 className="text-2xl font-bold text-white mb-4 mt-6" {...props} />
                                                                ),
                                                                h3: ({ node, ...props }) => (
                                                                    <h3 className="text-xl font-bold text-white mb-3 mt-4" {...props} />
                                                                ),
                                                                p: ({ node, ...props }) => (
                                                                    <p className="text-gray-300 leading-relaxed mb-4" {...props} />
                                                                ),
                                                                ul: ({ node, ...props }) => (
                                                                    <ul className="list-disc list-inside text-gray-300 mb-4 space-y-2" {...props} />
                                                                ),
                                                                ol: ({ node, ...props }) => (
                                                                    <ol className="list-decimal list-inside text-gray-300 mb-4 space-y-2" {...props} />
                                                                ),
                                                                li: ({ node, ...props }) => (
                                                                    <li className="text-gray-300" {...props} />
                                                                ),
                                                                a: ({ node, ...props }) => (
                                                                    <a className="text-emerald-400 hover:text-emerald-300 underline" {...props} />
                                                                ),
                                                                blockquote: ({ node, ...props }) => (
                                                                    <blockquote className="border-l-4 border-emerald-400 pl-4 italic text-gray-400 my-4" {...props} />
                                                                ),
                                                                code: ({ node, inline, ...props }: any) => (
                                                                    inline ? (
                                                                        <code className="bg-white/10 px-2 py-1 rounded text-emerald-300 text-sm" {...props} />
                                                                    ) : (
                                                                        <code className="block bg-white/10 p-4 rounded-lg text-emerald-300 text-sm overflow-x-auto" {...props} />
                                                                    )
                                                                ),
                                                            }}
                                                        >
                                                            {block.content}
                                                        </ReactMarkdown>
                                                    </div>
                                                )}

                                                {block.type === "image" && block.url && (
                                                    <div className="my-8">
                                                        <div className="relative overflow-hidden rounded-xl" style={{ aspectRatio: '16/9' }}>
                                                            <LoadingImage
                                                                src={block.url}
                                                                alt={block.caption || "Article image"}
                                                                className="w-full h-full object-cover"
                                                            />
                                                        </div>
                                                        {block.caption && (
                                                            <p className="text-center text-sm text-gray-400 italic mt-3">
                                                                {block.caption}
                                                            </p>
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-12">
                                        <p className="text-gray-400 text-lg">
                                            Konten artikel tidak tersedia
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </section>

                    {/* Related Articles */}
                    {relatedArticles && relatedArticles.length > 0 && (
                        <section className="pb-20 px-4 sm:px-6 lg:px-8">
                            <div className="max-w-7xl mx-auto">
                                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-8">
                                    Artikel Terkait
                                </h2>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {relatedArticles.map((relatedArticle) => (
                                        <Link
                                            key={relatedArticle.id}
                                            href={`/artikel/${relatedArticle.slug}`}
                                            className="group"
                                        >
                                            <div className="bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden hover:bg-white/10 transition-all duration-500 border border-white/10 hover:border-emerald-400/50 hover:shadow-2xl hover:shadow-emerald-400/20 h-full flex flex-col">
                                                {/* Image */}
                                                <div className="relative overflow-hidden" style={{ aspectRatio: '16/9' }}>
                                                    <LoadingImage
                                                        src={relatedArticle.featured_image_url || relatedArticle.featured_image}
                                                        alt={relatedArticle.title}
                                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                                    />

                                                    {/* Category Badge */}
                                                    <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-sm text-white px-4 py-1.5 rounded-full text-sm font-medium">
                                                        {relatedArticle.category}
                                                    </div>
                                                </div>

                                                {/* Content */}
                                                <div className="p-6 flex-1 flex flex-col">
                                                    <p className="text-sm text-emerald-400 mb-3">
                                                        {formatDate(relatedArticle.published_at)}
                                                    </p>

                                                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-emerald-400 transition-colors line-clamp-2 leading-tight">
                                                        {relatedArticle.title}
                                                    </h3>

                                                    <p className="text-gray-400 text-sm line-clamp-3 leading-relaxed">
                                                        {relatedArticle.excerpt}
                                                    </p>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </section>
                    )}

                    {/* Back to Articles */}
                    <section className="pb-20 px-4 sm:px-6 lg:px-8">
                        <div className="max-w-4xl mx-auto text-center">
                            <Link
                                href="/artikel"
                                className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl transition-all border border-white/20 hover:border-emerald-400/50"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                </svg>
                                Kembali ke Artikel
                            </Link>
                        </div>
                    </section>
                </main>

                <Footer />
            </div>
        </div>
    );
}
