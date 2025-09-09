// resources/js/Pages/Home.tsx
import React from "react";
import { Head, Link } from "@inertiajs/react";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";
import AboutSection from "@/Components/Sections/AboutSection";
import VisiMisiSection from "@/Components/Sections/VisiMisiSection";
import TechStackCarousel from "@/Components/Sections/TechStackCarousel";
import Typewriter from '@/Components/Typewriter';

export default function Home() {
  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-no-repeat relative"
      style={{ backgroundImage: "url('/images/BGHERO.jpg')" }}
    >
      <Head title="Home - DITECH CREATIVE" />
      
      {/* Background overlay dengan opacity 50% */}
      <div className="absolute inset-0 bg-black/50 z-0"></div>
      
      {/* Content */}
      <div className="relative z-10">
        <Navbar />

        {/* HERO SECTION */}
        <main className="relative">
          <section className="
            relative z-0
            min-h-[100vh]
            flex flex-col items-center justify-center
            px-4 sm:px-6 text-center text-white
            pt-32 pb-8
          ">
            {/* Updated Date */}
            <p className="mb-4 text-xs sm:text-sm text-white/70 opacity-0 animate-fade-in delay-200">
              *Updated:{" "}
              {new Date().toLocaleDateString("id-ID", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}
            </p>

            {/* Main Title */}
            <h1 className="mb-4 text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold leading-tight opacity-0 animate-slide-in-bottom delay-300">
              Solusi Digital Lebih Cepat
              <br />
              <Typewriter
                className="text-emerald-400 mt-2 block"
                phrases={[
                  'Walau kamu sibuk.',
                  'Walau kamu tidak ada waktu.',
                  'Walau masih merintis.',
                  'Walau deadline mepet.',
                  'Walau budget terbatas.',
                ]}
                typingSpeed={60}
                deletingSpeed={40}
                pause={1200}
              />
            </h1>

            {/* Description */}
            <p className="mx-auto mb-6 sm:mb-8 max-w-2xl lg:max-w-3xl text-sm sm:text-base md:text-lg text-white/80 leading-relaxed opacity-0 animate-slide-in-bottom delay-500 px-2">
              DITECH CREATIVE membantu bisnis & institusi membangun{" "}
              <span className="font-medium">website, mobile apps, UI/UX</span>, dan{" "}
              <span className="font-medium">implementasi IoT</span>—plus{" "}
              <span className="font-medium">penerbitan buku</span> dan{" "}
              <span className="font-medium">edukasi digital</span>. Berfokus pada
              eksekusi cepat, hasil terukur, dan pengalaman yang menyenangkan.
            </p>

            {/* CTA Buttons */}
            <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row items-center gap-3 sm:gap-4 w-full max-w-lg opacity-0 animate-zoom-in delay-700">
              <Link
                href="/konsultasi"
                className="w-full sm:w-auto rounded-xl bg-blue-600 px-4 sm:px-6 py-3 text-sm sm:text-base font-semibold text-white shadow-lg shadow-blue-600/30 hover:bg-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-600/40 transition-all duration-300 transform hover:scale-105"
              >
                Konsultasikan kebutuhanmu. Gratis!
              </Link>

              <Link
                href="/produk"
                className="w-full sm:w-auto rounded-xl border-2 border-emerald-400 bg-transparent px-4 sm:px-6 py-3 text-sm sm:text-base font-semibold text-emerald-400 hover:bg-emerald-400 hover:text-black focus:outline-none focus:ring-4 focus:ring-emerald-400/40 transition-all duration-300 transform hover:scale-105"
              >
                Lihat Portfolio Kami
              </Link>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm text-white/60 mb-6 sm:mb-8 opacity-0 animate-fade-in delay-1000 px-2">
              <div className="flex items-center gap-2">
                <svg className="h-4 w-4 sm:h-5 sm:w-5 text-emerald-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="whitespace-nowrap">50+ Project Selesai</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="h-4 w-4 sm:h-5 sm:w-5 text-emerald-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="whitespace-nowrap">Tim Berpengalaman 5+ Tahun</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="h-4 w-4 sm:h-5 sm:w-5 text-emerald-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="whitespace-nowrap">Support 24/7</span>
              </div>
            </div>

            {/* Tech Stack Carousel */}
            <div className="w-full opacity-0 animate-slide-in-bottom delay-[1200ms]">
              <TechStackCarousel />
            </div>
          </section>

          {/* VISI MISI SECTION */}
          <div className="opacity-0 animate-fade-in-up delay-[1400ms]">
            <VisiMisiSection />
          </div>

          {/* ABOUT SECTION */}
          <div className="opacity-0 animate-fade-in-up delay-[1600ms]">
            <AboutSection />
          </div>

          {/* CTA SECTION */}
          <section className="py-12 sm:py-16 px-4 sm:px-6 opacity-0 animate-fade-in-up delay-[1800ms]">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
                Siap Memulai Project <span className="text-emerald-400">Digital</span> Anda?
              </h2>
              <p className="text-base sm:text-lg text-white/80 mb-6 sm:mb-8 max-w-xl sm:max-w-2xl mx-auto px-2">
                Konsultasikan kebutuhan digital Anda dengan tim expert kami. Gratis dan tanpa komitmen.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center max-w-lg mx-auto">
                <Link
                  href="/konsultasi"
                  className="w-full sm:w-auto inline-flex items-center justify-center rounded-xl bg-emerald-500 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold text-black hover:bg-emerald-400 focus:outline-none focus:ring-4 focus:ring-emerald-500/40 transition-all duration-300 transform hover:scale-105"
                >
                  Mulai Konsultasi Gratis
                  <svg className="ml-2 w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </Link>
                <Link
                  href="/tentang-kami"
                  className="w-full sm:w-auto inline-flex items-center justify-center rounded-xl border-2 border-white/30 bg-transparent px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold text-white hover:bg-white/10 focus:outline-none focus:ring-4 focus:ring-white/20 transition-all duration-300 transform hover:scale-105"
                >
                  Tentang Kami
                </Link>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </div>
  );
}