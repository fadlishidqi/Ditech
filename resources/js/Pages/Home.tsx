import React from "react";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";
import { Link } from "@inertiajs/react";

export default function Home() {
  const bgUrl =
    "https://images.unsplash.com/photo-1637946175491-53bca31c90ba?q=80&w=1600&auto=format&fit=crop&ixlib=rb-4.1.0";

  return (
    <div className="bg-black">
      <Navbar />

      {/* HERO */}
      <main className="relative">
        {/* Section hero dengan 1 gambar bg */}
        <section
          className="
            relative z-0
            min-h-[78vh]
            flex flex-col items-center justify-center
            px-6 text-center text-white
            pt-16
          "
          style={{ backgroundImage: `url('${bgUrl}')` }}
        >
          {/* bg cover + overlay gelap */}
          <div className="absolute inset-0 -z-10 bg-black/80" />
          <div className="absolute inset-0 -z-20 bg-center bg-cover" style={{ backgroundImage: `url('${bgUrl}')` }} />

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
              className="rounded-xl bg-blue-600 px-6 py-3 text-base font-semibold text-white shadow-lg shadow-blue-600/30 hover:bg-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-600/40"
            >
              Konsultasikan kebutuhanmu. Gratis!
            </Link>
            <Link
              href="/portfolio"
              className="rounded-xl border border-white/20 px-6 py-3 text-base font-semibold text-white/90 hover:bg-white/10"
            >
              Lihat Portofolio
            </Link>
          </div>

          <div className="flex items-center justify-center gap-3">
            <div className="-space-x-3">
              {["1", "2", "3", "4"].map((k) => (
                <img
                  key={k}
                  className="inline-block h-9 w-9 rounded-full border border-black/40"
                  src={`https://i.pravatar.cc/72?img=${10 + Number(k)}`}
                  alt=""
                  loading="lazy"
                />
              ))}
            </div>
            <div className="text-white/90">
              <span className="mr-1 align-middle">⭐</span>
              <span className="font-semibold">4.9/5</span>{" "}
              <span className="text-white/60">· Review dari 120+ klien & mitra</span>
            </div>
          </div>
        </section>
      </main>

      {/* SECTION RINGKAS */}
      <section className="bg-white">
        <div className="mx-auto grid max-w-6xl gap-6 px-6 py-16 md:grid-cols-3">
          {[
            {
              title: "Website & Mobile Apps",
              desc: "Dari landing page cepat sampai sistem terpadu—Next.js/Laravel/Flutter siap produksi.",
            },
            {
              title: "UI/UX & Brand",
              desc: "Riset, wireframe, desain sistem & komponen, hingga handoff ke developer.",
            },
            {
              title: "IoT & Otomasi",
              desc: "Integrasi sensor/ESP32, dashboard, dan automasi proses sesuai kebutuhan.",
            },
          ].map((f) => (
            <div key={f.title} className="rounded-2xl border border-gray-200 p-6 shadow-sm">
              <h3 className="mb-2 text-lg font-semibold text-gray-900">{f.title}</h3>
              <p className="text-gray-600">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
