// resources/js/Pages/Home.tsx
import React, { useEffect, useRef, useState } from "react";
import { Head, Link } from "@inertiajs/react";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";
import AboutSection from "@/Components/Sections/AboutSection";
import VisiMisiSection from "@/Components/Sections/VisiMisiSection";
import TechStackCarousel from "@/Components/Sections/TechStackCarousel";
import Typewriter from '@/Components/Typewriter';
import LegalitasSection from "@/Components/Sections/LegalitasSection";

export default function Home() {
  const [isVisible, setIsVisible] = useState({
    hero: false,
    visiMisi: false,
    about: false,
    legalitas: false,
    cta: false,
  });

  const sectionRefs = {
    hero: useRef<HTMLDivElement>(null),
    visiMisi: useRef<HTMLDivElement>(null),
    about: useRef<HTMLDivElement>(null),
    legalitas: useRef<HTMLDivElement>(null),
    cta: useRef<HTMLDivElement>(null),
  };

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    Object.entries(sectionRefs).forEach(([key, ref]) => {
      if (key === "hero") return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({ ...prev, [key]: true }));
            observer.disconnect();
          }
        },
        { threshold: 0.3 }
      );

      if (ref.current) {
        observer.observe(ref.current);
        observers.push(observer);
      }
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      setIsVisible((prev) => ({ ...prev, hero: true }));
    });
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-no-repeat relative"
      style={{ backgroundImage: "url('/images/BGHERO.jpg')" }}
    >
      <Head title="Home" />
      
      {/* Background overlay */}
      <div className="absolute inset-0 bg-black/50 z-0"></div>
      
      {/* Content */}
      <div className="relative z-10">
        <Navbar />

        {/* HERO SECTION - Mobile Optimized */}
        <main className="relative">
          <section 
            ref={sectionRefs.hero}
            className="
              relative z-0
              min-h-[95vh] sm:min-h-[100vh]
              flex flex-col items-center justify-center
              px-4 sm:px-6 text-center text-white
              pt-24 sm:pt-38 pb-8
            "
          >
            {/* Updated Date */}
            <p className={`mb-4 text-xs sm:text-sm text-white/70 transition-opacity duration-1000 ${isVisible.hero ? 'opacity-100' : 'opacity-0'}`}>
              *Updated:{" "}
              {new Date().toLocaleDateString("id-ID", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}
            </p>

            {/* Main Title */}
            <h1 className={`mb-4 text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold leading-tight transition-transform duration-1000 ${isVisible.hero ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              Solusi Digital Lebih Cepat
              <br />
              <Typewriter
                className="text-emerald-400 mt-2 block"
                phrases={[
                  'Walau kamu sibuk.',
                  'Walau baru mulai.',
                  'Walau deadline mepet.',
                  'Walau budget terbatas.',
                  'Walau masih merintis.',
                ]}
                typingSpeed={60}
                deletingSpeed={40}
                pause={1200}
              />
            </h1>

            {/* Description */}
            <p className={`mx-auto mb-6 sm:mb-8 max-w-2xl lg:max-w-3xl text-sm sm:text-sm md:text-lg text-white/80 leading-relaxed transition-transform duration-1000 delay-150 ${isVisible.hero ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'} px-2`}>
              DITECH CREATIVE membantu bisnis & institusi membangun{" "}
              <span className="font-medium">website, mobile apps, UI/UX</span>,{" "}
              <span className="font-medium">implementasi IoT,</span>{" "}
              <span className="font-medium">penerbitan buku</span> dan{" "}
              <span className="font-medium">edukasi digital</span>. Berfokus pada
              eksekusi cepat, hasil terukur, dan pelayanan yang memuaskan.
            </p>

            {/* CTA Buttons */}
            <div className={`mb-6 sm:mb-8 flex flex-col sm:flex-row items-center gap-3 sm:gap-4 w-full max-w-lg transition-transform duration-1000 delay-300 ${isVisible.hero ? 'scale-100 opacity-100' : 'scale-90 opacity-0'}`}>
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
            <div className={`flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm text-white/60 mb-6 sm:mb-8 transition-opacity duration-1000 delay-500 ${isVisible.hero ? 'opacity-100' : 'opacity-0'} px-2`}>
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
            <div className={`w-full transition-transform duration-1000 delay-700 ${isVisible.hero ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <TechStackCarousel />
            </div>
          </section>

          {/* VISI MISI SECTION */}
          <div 
            ref={sectionRefs.visiMisi}
            className={`transition-all duration-1000 ${isVisible.visiMisi ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
          >
            <VisiMisiSection />
          </div>

          {/* ABOUT SECTION */}
          <div 
            ref={sectionRefs.about}
            className={`transition-all duration-1000 delay-150 ${isVisible.about ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
          >
            <AboutSection />
          </div>

          {/* LEGALITAS SECTION */}
          <div 
            ref={sectionRefs.legalitas}
            className={`transition-all duration-1000 delay-300 ${isVisible.legalitas ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
          >
            <LegalitasSection />
          </div>

          {/* CTA SECTION - Mobile Optimized */}
          <section 
            ref={sectionRefs.cta}
            className={`py-8 sm:py-12 lg:py-16 px-4 sm:px-6 transition-all duration-1000 delay-300 ${isVisible.cta ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
          >
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4 leading-tight">
                Siap Memulai Project <span className="text-emerald-400">Digital</span> Anda?
              </h2>
              <p className="text-sm sm:text-base lg:text-lg text-white/80 mb-4 sm:mb-6 lg:mb-8 max-w-lg sm:max-w-xl lg:max-w-2xl mx-auto px-2 leading-relaxed">
                Konsultasikan kebutuhan digital Anda dengan tim expert kami. Gratis dan tanpa komitmen.
              </p>
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 lg:gap-4 justify-center max-w-md sm:max-w-lg mx-auto">
                <Link
                  href="/konsultasi"
                  className="w-full sm:w-auto inline-flex items-center justify-center rounded-lg sm:rounded-xl bg-emerald-500 px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3 lg:py-4 text-sm sm:text-base lg:text-lg font-semibold text-black hover:bg-emerald-400 focus:outline-none focus:ring-4 focus:ring-emerald-500/40 transition-all duration-300 transform hover:scale-105"
                >
                  Mulai Konsultasi Gratis
                  <svg className="ml-2 w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </Link>
                <Link
                  href="/tentang-kami"
                  className="w-full sm:w-auto inline-flex items-center justify-center rounded-lg sm:rounded-xl border-2 border-white/30 bg-transparent px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3 lg:py-4 text-sm sm:text-base lg:text-lg font-semibold text-white hover:bg-white/10 focus:outline-none focus:ring-4 focus:ring-white/20 transition-all duration-300 transform hover:scale-105"
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