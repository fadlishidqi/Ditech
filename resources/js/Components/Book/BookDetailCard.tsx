import React from "react";
import LoadingImage from "@/Components/LoadingImage";
import {
    UserIcon,
    BuildingOfficeIcon,
    ArrowDownTrayIcon,
    BookOpenIcon,
} from "@heroicons/react/24/outline";

interface Book {
    id: number;
    title: string;
    author: string;
    publisher: string;
    year: number;
    description: string;
    cover_image_url: string;
    file_url: string | null;
    category: string;
}

interface BookDetailCardProps {
    book: Book;
    onReadClick: () => void;
}

export default function BookDetailCard({ book, onReadClick }: BookDetailCardProps) {
    return (
        <div className="bg-white/5 backdrop-blur-md rounded-3xl p-5 md:p-8 grid md:grid-cols-3 gap-8 md:gap-10 border border-white/10 shadow-2xl">
            {/* COVER */}
            <div className="flex justify-center md:justify-start md:items-start">
                <div className="relative w-[180px] md:w-full max-w-[280px] shadow-[0_10px_30px_rgba(0,0,0,0.5)] rounded-xl overflow-hidden mx-auto">
                    <LoadingImage
                        src={book.cover_image_url}
                        alt={book.title}
                        className="w-full h-auto object-cover aspect-[2/3]"
                    />
                </div>
            </div>

            {/* INFO */}
            <div className="md:col-span-2 flex flex-col justify-center">
                <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight text-center md:text-left">
                    {book.title}
                </h1>

                {/* Badges */}
                <div className="flex flex-wrap gap-3 mb-6 text-xs md:text-sm justify-center md:justify-start">
                    <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1 rounded-full">
                        <UserIcon className="h-3.5 w-3.5 text-emerald-400" />
                        <span>{book.author}</span>
                    </div>
                    <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1 rounded-full">
                        <BuildingOfficeIcon className="h-3.5 w-3.5 text-emerald-400" />
                        <span>{book.publisher || "-"}</span>
                    </div>
                    <div className="bg-emerald-500/20 text-emerald-300 px-3 py-1 rounded-full font-semibold border border-emerald-500/30">
                        {book.category}
                    </div>
                </div>

                <div className="border-t border-white/10 my-4 md:my-6"></div>

                <h3 className="text-lg font-semibold text-emerald-400 mb-2 text-center md:text-left">
                    Sinopsis
                </h3>
                <p className="text-gray-300 mb-8 whitespace-pre-line leading-relaxed text-sm md:text-base text-justify md:text-left">
                    {book.description || "Tidak ada deskripsi."}
                </p>

                {/* Buttons */}
                {book.file_url ? (
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                        <button
                            onClick={onReadClick}
                            className="w-full sm:w-auto bg-emerald-500 hover:bg-emerald-400 text-white px-6 py-3.5 rounded-xl font-bold flex items-center justify-center transition-all shadow-lg shadow-emerald-500/30 active:scale-95"
                        >
                            <BookOpenIcon className="h-5 w-5 mr-2" />
                            Baca Sekarang
                        </button>

                        <a
                            href={book.file_url}
                            download
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full sm:w-auto bg-white/5 border border-white/20 hover:bg-white/10 text-white px-6 py-3.5 rounded-xl font-bold flex items-center justify-center transition-all active:scale-95"
                        >
                            <ArrowDownTrayIcon className="h-5 w-5 mr-2" />
                            Download PDF
                        </a>
                    </div>
                ) : (
                    <div className="inline-block bg-gray-800/50 px-6 py-3 rounded-xl text-gray-400 border border-gray-700 text-center">
                        File buku belum tersedia
                    </div>
                )}
            </div>
        </div>
    );
}