import React, { useEffect, useRef, useState } from "react";
import HTMLFlipBook from "react-pageflip";
import {
    BookOpenIcon,
    XMarkIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
} from "@heroicons/react/24/outline";

// --- TYPES ---
interface FlipbookModalProps {
    isOpen: boolean;
    onClose: () => void;
    bookTitle: string;
    fileUrl: string;
}

declare global {
    interface Window {
        pdfjsLib: any;
    }
}

export default function FlipbookModal({ isOpen, onClose, bookTitle, fileUrl }: FlipbookModalProps) {
    const flipRef = useRef<any>(null);
    const [pages, setPages] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState<string | null>(null);
    const [bookDim, setBookDim] = useState({ width: 300, height: 420 });

    // --- 1. RESPONSIVE SIZE LOGIC ---
    useEffect(() => {
        const calculateSize = () => {
            const isMobile = window.innerWidth < 768;
            const verticalMargin = isMobile ? 80 : 120;
            const horizontalMargin = isMobile ? 20 : 40;
            const screenH = window.innerHeight - verticalMargin;
            const screenW = window.innerWidth - horizontalMargin;
            const aspectRatio = 1.414; // A4 Ratio

            let h = screenH;
            let w = h / aspectRatio;

            if (isMobile) {
                if (w > screenW) {
                    w = screenW;
                    h = w * aspectRatio;
                }
            } else {
                if (w * 2 > screenW) {
                    w = screenW / 2;
                    h = w * aspectRatio;
                }
            }
            setBookDim({ width: Math.floor(w), height: Math.floor(h) });
        };

        if (isOpen) {
            calculateSize();
            window.addEventListener("resize", calculateSize);
        }
        return () => window.removeEventListener("resize", calculateSize);
    }, [isOpen]);

    // --- 2. LOAD PDF LOGIC ---
    useEffect(() => {
        if (!isOpen || !fileUrl) return;

        const loadPDF = async () => {
            try {
                setLoading(true);
                setPages([]);
                setProgress(0);
                setError(null);

                const pdf = await window.pdfjsLib.getDocument(fileUrl).promise;
                const total = pdf.numPages;
                const imgs: string[] = [];
                const scale = window.innerWidth < 768 ? 1.5 : 2.0;

                for (let i = 1; i <= total; i++) {
                    const page = await pdf.getPage(i);
                    const viewport = page.getViewport({ scale });
                    const canvas = document.createElement("canvas");
                    const ctx = canvas.getContext("2d")!;
                    canvas.width = viewport.width;
                    canvas.height = viewport.height;

                    await page.render({ canvasContext: ctx, viewport }).promise;
                    imgs.push(canvas.toDataURL("image/jpeg", 0.8));
                    setProgress(Math.round((i / total) * 100));
                }

                setPages(imgs);
                setLoading(false);
            } catch (e) {
                console.error(e);
                setError("Gagal memuat PDF. Pastikan file valid.");
                setLoading(false);
            }
        };

        if (!window.pdfjsLib) {
            const script = document.createElement("script");
            script.src = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.min.js";
            script.onload = () => {
                window.pdfjsLib.GlobalWorkerOptions.workerSrc = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js";
                loadPDF();
            };
            script.onerror = () => setError("Gagal memuat PDF.js Library");
            document.body.appendChild(script);
        } else {
            loadPDF();
        }
    }, [isOpen, fileUrl]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex flex-col animate-in fade-in duration-300">
            {/* Header */}
            <div className="flex justify-between items-center px-4 py-3 bg-gradient-to-b from-black/90 to-transparent z-20 absolute top-0 w-full">
                <h2 className="text-white font-bold text-sm md:text-lg truncate max-w-[70%]">
                    {bookTitle}
                </h2>
                <button onClick={onClose} className="p-2 bg-white/10 hover:bg-red-500/20 text-gray-300 hover:text-red-400 rounded-full transition-all backdrop-blur-md">
                    <XMarkIcon className="h-6 w-6" />
                </button>
            </div>

            {/* Body */}
            <div className="flex-1 flex items-center justify-center relative overflow-hidden w-full h-full pt-10 pb-8 px-2">
                {loading ? (
                    <div className="text-center text-white p-4">
                        <BookOpenIcon className="h-12 w-12 mx-auto mb-4 text-emerald-400 animate-bounce" />
                        <h3 className="text-lg font-bold mb-2">Menyiapkan Halaman...</h3>
                        <div className="w-48 md:w-64 h-1.5 bg-gray-800 rounded-full overflow-hidden mx-auto">
                            <div className="h-full bg-emerald-500 transition-all duration-300" style={{ width: `${progress}%` }}></div>
                        </div>
                        <p className="mt-2 text-xs text-gray-400">{progress}% selesai</p>
                    </div>
                ) : error ? (
                    <div className="text-center p-6 bg-white/10 rounded-2xl border border-red-500/30 mx-4">
                        <p className="text-red-400 text-base font-semibold mb-4">{error}</p>
                        <button onClick={onClose} className="px-6 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white text-sm">Tutup</button>
                    </div>
                ) : (
                    <>
                        {/* @ts-ignore */}
                        <HTMLFlipBook
                            ref={flipRef}
                            width={bookDim.width}
                            height={bookDim.height}
                            size="fixed"
                            showCover={true}
                            mobileScrollSupport={true}
                            className="shadow-[0_0_30px_rgba(0,0,0,0.8)]"
                            maxShadowOpacity={0.5}
                        >
                            {pages.map((p, i) => (
                                <div key={i} className="bg-white flex items-center justify-center overflow-hidden">
                                    <img src={p} alt={`Page ${i + 1}`} className="w-full h-full object-contain" loading="lazy" />
                                </div>
                            ))}
                        </HTMLFlipBook>

                        {/* Arrows */}
                        <button onClick={() => flipRef.current?.pageFlip()?.flipPrev()} className="absolute left-2 md:left-8 top-1/2 -translate-y-1/2 p-2 md:p-3 bg-black/40 hover:bg-emerald-500 text-white rounded-full backdrop-blur transition-all z-20 border border-white/10">
                            <ChevronLeftIcon className="h-6 w-6 md:h-8 md:w-8" />
                        </button>
                        <button onClick={() => flipRef.current?.pageFlip()?.flipNext()} className="absolute right-2 md:right-8 top-1/2 -translate-y-1/2 p-2 md:p-3 bg-black/40 hover:bg-emerald-500 text-white rounded-full backdrop-blur transition-all z-20 border border-white/10">
                            <ChevronRightIcon className="h-6 w-6 md:h-8 md:w-8" />
                        </button>
                    </>
                )}
            </div>

            {/* Footer Hint */}
            {!loading && !error && (
                <div className="absolute bottom-4 left-0 w-full text-center text-gray-500 text-[10px] md:text-xs pointer-events-none px-4">
                    Geser layar atau gunakan panah untuk membalik halaman
                </div>
            )}
        </div>
    );
}