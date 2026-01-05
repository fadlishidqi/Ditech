import LoadingImage from "@/Components/LoadingImage";
import {
    ArrowDownTrayIcon,
    BookOpenIcon,
    ShoppingCartIcon,
} from "@heroicons/react/24/outline";

interface Book {
    id: number;
    title: string;
    author: string;
    publisher: string;
    year: number;
    e_isbn: string | null;
    description: string;
    cover_image_url: string;
    file_url: string | null;
    category: string;
    is_paid: boolean;
    price: number | null;
}

interface BookDetailCardProps {
    book: Book;
    onReadClick: () => void;
}

export default function BookDetailCard({ book, onReadClick }: BookDetailCardProps) {

    const handleBuyClick = () => {
        const adminPhone = "6281398169073";
        const message = `Halo Admin, saya ingin membeli buku:
Judul: *${book.title}*
Harga: Rp ${new Intl.NumberFormat('id-ID').format(book.price || 0)}

Mohon infonya.`;
        const whatsappUrl = `https://wa.me/${adminPhone}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    };

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
                    
                    {/* Badge Status */}
                    <div className="absolute top-2 right-2">
                        {book.is_paid ? (
                            <span className="bg-amber-500 text-white text-xs font-bold px-2 py-1 rounded shadow">
                                PREMIUM
                            </span>
                        ) : (
                            <span className="bg-emerald-500 text-white text-xs font-bold px-2 py-1 rounded shadow">
                                FREE
                            </span>
                        )}
                    </div>
                </div>
            </div>

            {/* INFO */}
            <div className="md:col-span-2 flex flex-col justify-center">
                {/* Kategori Badge */}
                <div className="mb-3 flex justify-center md:justify-start">
                    <span className="bg-emerald-500/20 text-emerald-300 px-3 py-1 rounded-full text-xs font-semibold border border-emerald-500/30 uppercase tracking-wider">
                        {book.category}
                    </span>
                </div>

                <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight text-center md:text-left text-white">
                    {book.title}
                </h1>

                {/* DETAIL INFORMASI */}
                <div className="bg-white/5 rounded-2xl p-5 border border-white/5 mb-6">
                    <div className="grid grid-cols-2 gap-y-4 gap-x-8 text-sm md:text-base">
                        
                        {/* Penulis */}
                        <div className="flex flex-col">
                            <span className="text-gray-400 text-xs uppercase tracking-wide mb-1">Penulis</span>
                            <span className="font-medium text-white">{book.author}</span>
                        </div>

                        {/* Penerbit */}
                        <div className="flex flex-col">
                            <span className="text-gray-400 text-xs uppercase tracking-wide mb-1">Penerbit</span>
                            <span className="font-medium text-white">{book.publisher || "-"}</span>
                        </div>

                        {/* Tahun Terbit */}
                        <div className="flex flex-col">
                            <span className="text-gray-400 text-xs uppercase tracking-wide mb-1">Tahun Terbit</span>
                            <span className="font-medium text-white">{book.year || "-"}</span>
                        </div>

                        {/* E-ISBN */}
                        <div className="flex flex-col">
                            <span className="text-gray-400 text-xs uppercase tracking-wide mb-1">E-ISBN</span>
                            <span className="font-medium text-white">{book.e_isbn || "-"}</span>
                        </div>
                    </div>
                </div>

                {/* Harga (Jika Berbayar) */}
                {book.is_paid && book.price && (
                    <div className="mb-6 text-center md:text-left">
                         <span className="text-3xl font-bold text-amber-400">
                            Rp {new Intl.NumberFormat('id-ID').format(book.price)}
                         </span>
                    </div>
                )}

                <h3 className="text-lg font-semibold text-emerald-400 mb-2 text-center md:text-left">
                    Sinopsis
                </h3>
                <p className="text-gray-300 mb-8 whitespace-pre-line leading-relaxed text-sm md:text-base text-justify md:text-left">
                    {book.description || "Tidak ada deskripsi."}
                </p>

                {/* Buttons Logic */}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                    {book.is_paid ? (
                        <button
                            onClick={handleBuyClick}
                            className="w-full sm:w-auto bg-amber-500 hover:bg-amber-400 text-white px-6 py-3.5 rounded-xl font-bold flex items-center justify-center transition-all shadow-lg shadow-amber-500/30 active:scale-95"
                        >
                            <ShoppingCartIcon className="h-5 w-5 mr-2" />
                            Beli Sekarang
                        </button>
                    ) : (
                        book.file_url ? (
                            <>
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
                            </>
                        ) : (
                            <div className="inline-block bg-gray-800/50 px-6 py-3 rounded-xl text-gray-400 border border-gray-700 text-center">
                                File buku belum tersedia
                            </div>
                        )
                    )}
                </div>
            </div>
        </div>
    );
}