import { Head, Link } from "@inertiajs/react";
import Navbar from "@/Components/Navbar";
import { AcademicCapIcon, SparklesIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

export default function Index() {
  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-no-repeat relative"
      style={{ backgroundImage: "url('/images/BGHERO.jpg')" }}
    >
      <Head title="Sekolah Aku" />
      
      <div className="absolute inset-0 bg-black/70 z-0 backdrop-blur-[2px]"></div>
      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />

        {/* MAIN CONTENT - Coming Soon */}
        <main className="flex-grow flex flex-col items-center justify-center px-4 sm:px-6 text-center">
            
            <div className="mb-8 relative">
                <div className="absolute inset-0 bg-emerald-500 blur-2xl opacity-20 animate-pulse rounded-full"></div>
                <div className="relative bg-white/5 border border-white/10 p-6 rounded-3xl backdrop-blur-md shadow-2xl animate-[bounce_3s_infinite]">
                    <AcademicCapIcon className="w-16 h-16 md:w-20 md:h-20 text-emerald-400" />
                </div>
            </div>

            {/* Title */}
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 tracking-tight drop-shadow-lg">
                Sekolah <span className="text-emerald-400">Aku</span>
            </h1>

            {/* Status Badge */}
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-bold tracking-wider mb-8 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                <SparklesIcon className="w-5 h-5 animate-spin-slow" />
                <span>SEGERA HADIR</span>
            </div>

            {/* Description */}
            <p className="text-gray-300 text-lg md:text-xl max-w-2xl leading-relaxed mb-10 drop-shadow-md">
                Kami sedang membangun ekosistem belajar digital yang interaktif dan menyenangkan. 
                Tunggu tanggal mainnya!
            </p>

            {/* Action Button */}
            <Link
                href="/"
                className="group relative inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-emerald-500 text-black font-bold text-lg hover:bg-emerald-400 transition-all duration-300 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40 hover:-translate-y-1 active:scale-95"
            >
                <ArrowLeftIcon className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                <span>Kembali ke Beranda</span>
            </Link>
        </main>
      </div>
    </div>
  );
}