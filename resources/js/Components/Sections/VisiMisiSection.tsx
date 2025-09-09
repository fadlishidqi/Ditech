// resources/js/Components/Sections/VisiMisiSection.tsx
import React from 'react';

interface VisiMisiSectionProps {
  visiTitle?: string;
  visiDescription?: string;
  misiTitle?: string;
  misiPoints?: string[];
  values?: Array<{
    icon: string;
    title: string;
    description: string;
  }>;
}

export default function VisiMisiSection({
  visiTitle = "Visi",
  visiDescription = "Kami berkomitmen untuk menciptakan solusi digital dan edukasi yang berkualitas tinggi dalam setiap layanan kami, mulai dari pengembangan mobile apps, website, UI/UX design, implementasi IoT, penerbitan buku, hingga konsultasi minat bakat. Dengan menerapkan standar profesional dan terus mengikuti perkembangan teknologi serta metode pembelajaran, kami memastikan setiap solusi yang kami berikan dapat membantu efisiensi, pertumbuhan bisnis, dan pengembangan diri klien.",
  misiTitle = "Misi",
  misiPoints = [
    "Mengembangkan solusi teknologi berkualitas dan tepat guna untuk memenuhi kebutuhan klien",
    "Mendorong transformasi digital melalui layanan pengembangan aplikasi dan website yang inovatif",
    "Membangun kemitraan jangka panjang dengan klien melalui pelayanan profesional",
    "Mengembangkan talenta digital terbaik melalui pembelajaran berkelanjutan",
    "Berkontribusi dalam pengembangan ekosistem teknologi digital di Indonesia"
  ]
}: VisiMisiSectionProps) {
  return (
    <section className="py-16 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Visi & <span className="text-emerald-400">Misi</span> Kami
          </h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Komitmen kami dalam menghadirkan solusi teknologi terdepan
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Visi Card */}
          <div className="relative overflow-hidden group rounded-xl border border-white/20 bg-white/10 backdrop-blur-sm p-8 transition-all duration-300 hover:bg-white/15">
            {/* Shiny overlay */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-[-20deg] group-hover:animate-shiny"
            />
            <div className="flex items-center mb-6 relative z-10">
              <div className="w-16 h-16 bg-emerald-400 rounded-lg flex items-center justify-center mr-4">
                <svg className="w-8 h-8 text-black" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white">{visiTitle}</h3>
            </div>
            <p className="text-white/80 text-lg leading-relaxed relative z-10">
              {visiDescription}
            </p>
          </div>

          {/* Misi Card */}
          <div className="relative overflow-hidden group rounded-xl border border-white/20 bg-white/10 backdrop-blur-sm p-8 transition-all duration-300 hover:bg-white/15">
            {/* Shiny overlay */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-[-20deg] group-hover:animate-shiny"
            />
            <div className="flex items-center mb-6 relative z-10">
              <div className="w-16 h-16 bg-emerald-400 rounded-lg flex items-center justify-center mr-4">
                <svg className="w-8 h-8 text-black" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
                  <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white">{misiTitle}</h3>
            </div>
            <div className="space-y-4 relative z-10">
              {misiPoints.map((point, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-white/80">
                    {point}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
