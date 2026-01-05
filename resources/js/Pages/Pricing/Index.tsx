import React from 'react';
import { Head } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';

interface PricingItem {
    id: number;
    title: string;
    price: number;
    image: string | null;
    description: string | null;
}

interface Props {
    pricings: PricingItem[];
}

export default function PricingIndex({ pricings }: Props) {
    
    // Helper format Rupiah
    const formatRupiah = (number: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(number);
    };

    return (
        <div
            className="min-h-screen bg-cover bg-center bg-no-repeat relative"
            style={{ backgroundImage: "url('/images/BGHERO.jpg')" }}
        >
            <Head title="Daftar Harga - DITECH CREATIVE" />

            {/* Background overlay gelap */}
            <div className="absolute inset-0 bg-black/50 z-0"></div>

            {/* Content Container */}
            <div className="relative z-10 flex flex-col min-h-screen">
                <Navbar />

                <main className="flex-grow">
                    {/* Hero Section */}
                    <section className="pt-32 pb-12 px-4 sm:px-6 lg:px-8">
                        <div className="max-w-7xl mx-auto text-center">
                            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight">
                                Penawaran Spesial
                            </h1>
                            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                                Solusi digital terbaik dengan harga yang kompetitif untuk kebutuhan bisnis Anda
                            </p>
                        </div>
                    </section>

                    {/* Pricing Grid */}
                    <section className="pb-20 px-4 sm:px-6 lg:px-8">
                        <div className="max-w-7xl mx-auto">
                            {pricings.length === 0 ? (
                                <div className="text-center py-32">
                                    <p className="text-2xl text-white/70 font-light">
                                        Belum ada paket harga yang tersedia saat ini.
                                    </p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {pricings.map((item) => (
                                        <div
                                            key={item.id}
                                            className="group flex flex-col h-full"
                                        >
                                            <div className="bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden hover:bg-white/10 transition-all duration-500 border border-white/10 hover:border-emerald-400/50 hover:shadow-2xl hover:shadow-emerald-400/20 flex flex-col h-full">
                                                
                                                {/* Image - Ratio 4:3 sesuai request */}
                                                <div className="relative overflow-hidden w-full" style={{ aspectRatio: '4/3' }}>
                                                    {item.image ? (
                                                        <img
                                                            src={`/storage/${item.image}`}
                                                            alt={item.title}
                                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                                        />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center bg-gray-800 text-gray-500">
                                                            <span className="text-sm">No Image</span>
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Card Content */}
                                                <div className="p-6 flex-1 flex flex-col">
                                                    {/* Title */}
                                                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors line-clamp-2 leading-tight">
                                                        {item.title}
                                                    </h3>

                                                    {/* Price Tag */}
                                                    <div className="text-2xl font-bold text-emerald-400 mb-4">
                                                        {formatRupiah(Number(item.price))}
                                                    </div>

                                                    <hr className="border-white/10 mb-4" />

                                                    {/* Description */}
                                                    <div
                                                        className="prose prose-invert prose-sm text-gray-300 leading-relaxed flex-grow"
                                                        dangerouslySetInnerHTML={{ __html: item.description || '' }}
                                                    />

                                                    {/* Action Button */}
                                                    <div className="mt-6 pt-4 border-t border-white/10">
                                                        <a 
                                                            href="https://wa.me/6281234567890" // Ganti dengan nomor WA Anda
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="block w-full text-center bg-emerald-500 hover:bg-emerald-400 text-gray-900 font-bold py-3 rounded-xl transition-all shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40"
                                                        >
                                                            Pesan Sekarang
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </section>
                </main>

                <Footer />
            </div>
        </div>
    );
}