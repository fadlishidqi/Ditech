import React from "react";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";
import { Link } from "@inertiajs/react";

export default function Home() {
  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-no-repeat relative"
      style={{ backgroundImage: "url('/images/BGHERO.jpg')" }}
    >
      {/* Background overlay dengan opacity 50% */}
      <div className="absolute inset-0 bg-black/50 z-0"></div>
      
      {/* Content */}
      <div className="relative z-10">
        <Navbar />

        {/* HERO */}
        <main className="relative">
          {/* Section hero */}
          <section className="
            relative z-0
            min-h-[78vh]
            flex flex-col items-center justify-center
            px-6 text-center text-white
            pt-16
          ">
            <p className="mb-4 text-sm text-white/70">
              *Updated:{" "}
              {new Date().toLocaleDateString("id-ID", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}
            </p>

            <h1 className="mb-4 text-4xl font-bold leading-tight md:text-6xl lg:text-7xl">
              Solusi Digital Lebih Cepat
              <br />
              <span className="text-emerald-400">Walau Kamu Sibuk.</span>
            </h1>

            <p className="mx-auto mb-8 max-w-3xl text-base md:text-lg text-white/80">
              DITECH CREATIVE membantu bisnis & institusi membangun{" "}
              <span className="font-medium">website, mobile apps, UI/UX</span>, dan{" "}
              <span className="font-medium">implementasi IoT</span>—plus{" "}
              <span className="font-medium">penerbitan buku</span> dan{" "}
              <span className="font-medium">edukasi digital</span>. Berfokus pada
              eksekusi cepat, hasil terukur, dan pengalaman yang menyenangkan.
            </p>

            <div className="mb-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link
                href="/konsultasi"
                className="rounded-xl bg-blue-600 px-6 py-3 text-base font-semibold text-white shadow-lg shadow-blue-600/30 hover:bg-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-600/40 transition-all duration-300"
              >
                Konsultasikan kebutuhanmu. Gratis!
              </Link>

              <Link
                href="/produk"
                className="rounded-xl border-2 border-emerald-400 bg-transparent px-6 py-3 text-base font-semibold text-emerald-400 hover:bg-emerald-400 hover:text-black focus:outline-none focus:ring-4 focus:ring-emerald-400/40 transition-all duration-300"
              >
                Lihat Portfolio Kami
              </Link>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-white/60">
              <div className="flex items-center gap-2">
                <svg className="h-5 w-5 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>50+ Project Selesai</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="h-5 w-5 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>Tim Berpengalaman 5+ Tahun</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="h-5 w-5 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>Support 24/7</span>
              </div>
            </div>
          </section>

          

          {/* CTA Section */}
          <section className="py-16 px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Siap Memulai Project <span className="text-emerald-400">Digital</span> Anda?
              </h2>
              <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
                Konsultasikan kebutuhan digital Anda dengan tim expert kami. Gratis dan tanpa komitmen.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/konsultasi"
                  className="inline-flex items-center justify-center rounded-xl bg-emerald-500 px-8 py-4 text-lg font-semibold text-black hover:bg-emerald-400 focus:outline-none focus:ring-4 focus:ring-emerald-500/40 transition-all duration-300"
                >
                  Mulai Konsultasi Gratis
                  <svg className="ml-2 w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </Link>
                <Link
                  href="/tentang-kami"
                  className="inline-flex items-center justify-center rounded-xl border-2 border-white/30 bg-transparent px-8 py-4 text-lg font-semibold text-white hover:bg-white/10 focus:outline-none focus:ring-4 focus:ring-white/20 transition-all duration-300"
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