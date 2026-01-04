import React, { useState } from "react";
import { Head, Link } from "@inertiajs/react";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

// Import komponen pecahan kita
import BookDetailCard from "@/Components/Book/BookDetailCard";
import FlipbookModal from "@/Components/Book/FlipbookModal";

interface Book {
    id: number;
    title: string;
    slug: string;
    author: string;
    publisher: string;
    year: number;
    description: string;
    cover_image_url: string;
    file_url: string | null;
    category: string;
    tags: string[];
    created_at: string;
}

interface Props {
    book: Book;
}

export default function BookShow({ book }: Props) {
    const [isReading, setIsReading] = useState(false);

    return (
        <div
            className="min-h-screen bg-cover bg-center relative"
            style={{ backgroundImage: "url('/images/BGHERO.jpg')" }}
        >
            <Head title={book.title} />
            <div className="absolute inset-0 bg-black/50" />

            <div className="relative z-10 min-h-screen flex flex-col">
                <Navbar />

                <main className="flex-grow pt-24 md:pt-32 pb-12 px-4 w-full max-w-6xl mx-auto text-white">
                    {/* Breadcrumb / Back Button */}
                    <Link
                        href="/books"
                        className="inline-flex items-center text-gray-300 hover:text-white mb-6 transition-colors text-sm md:text-base"
                    >
                        <ArrowLeftIcon className="h-4 w-4 mr-2" />
                        Kembali ke Daftar Buku
                    </Link>

                    {/* Component: Kartu Detail Buku */}
                    <BookDetailCard 
                        book={book} 
                        onReadClick={() => setIsReading(true)} 
                    />
                </main>

                <Footer />
            </div>

            {/* Component: Modal Reader */}
            {book.file_url && (
                <FlipbookModal
                    isOpen={isReading}
                    onClose={() => setIsReading(false)}
                    bookTitle={book.title}
                    fileUrl={book.file_url}
                />
            )}
        </div>
    );
}