// resources/js/Components/Sections/AboutSection.tsx
import React from 'react';

export default function AboutSection() {
  return (
    <section id="about" className="py-8 relative overflow-hidden backdrop-blur-sm">
      <div className="relative container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Tentang <span className="text-emerald-400">Kami</span>
            </h2>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Solusi digital kreatif untuk bisnis dan pengembangan diri Anda
            </p>
          </div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Left: Teks */}
            <div className="space-y-6">
              <div className="space-y-6">
                <div className="space-y-4 text-lg text-white/80 leading-relaxed">
                  <p>
                    Kami percaya teknologi harus bisa membantu bisnis tumbuh berkembang tanpa hambatan. Karena itu kami hadir dengan <span className="text-emerald-400 font-medium">layanan digital yang lengkap dan berkualitas</span> mulai dari pembuatan aplikasi mobile, website responsif, desain UI/UX, implementasi IoT, hingga penerbitan buku.
                  </p>
                  <p>
                    Tidak hanya itu, kami juga mendukung sisi legalitas dengan layanan <span className="text-emerald-400 font-medium">penerbitan hak cipta (HAKI)</span> agar karya dan inovasi Anda terlindungi secara resmi. Semua kami kerjakan dengan standar profesional dan mengikuti tren teknologi terbaru, supaya solusi yang diberikan benar-benar bermanfaat untuk <span className="text-emerald-400 font-medium">efisiensi kerja, perkembangan bisnis, dan pengembangan diri</span>.
                  </p>
                  <p>
                    Tim kami terdiri dari anak muda kreatif dengan beragam pengalaman di bidang teknologi dan pendidikan. Dari sinilah <span className="text-emerald-400 font-medium">ide-ide unik</span> lahir yang siap membantu Anda menemukan solusi terbaik sesuai kebutuhan.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Gallery */}
            <div className="relative">
              <div className="grid grid-cols-2 gap-4 h-[500px]">
                {/* Kiri (gambar besar, diam) */}
                <div className="relative overflow-hidden rounded-2xl">
                  <div className="h-full w-full overflow-hidden [clip-path:polygon(10%_0,100%_0,90%_100%,0_100%)]">
                    <img
                      src="https://images.unsplash.com/photo-1531973576160-7125cd663d86?q=80&w=1470&auto=format&fit=crop"
                      alt="Collaboration"
                      className="w-full h-full object-cover transition-all duration-500 hover:brightness-110"
                    />
                  </div>
                </div>

                {/* Kanan (5 gambar + duplikat) */}
                <div className="relative h-full overflow-hidden rounded-2xl group">
                  <div className="h-full w-full [clip-path:polygon(10%_0,100%_0,90%_100%,0_100%)] overflow-hidden">
                    <div
                      className="
                        absolute top-0 left-0 right-0
                        flex flex-col w-full space-y-4
                        animate-marquee-vert will-change-transform
                        group-hover:[animation-play-state:paused]
                      "
                    >
                      {/* === SET 1 (5 gambar asli) === */}
                      <div className="h-[240px] flex-shrink-0">
                        <img src="https://images.unsplash.com/photo-1487017159836-4e23ece2e4cf?q=80&w=1471&auto=format&fit=crop" alt="Workspace" className="w-full h-full object-cover" />
                      </div>
                      <div className="h-[240px] flex-shrink-0">
                        <img src="https://images.unsplash.com/photo-1497215641119-bbe6d71ebaae?q=80&w=687&auto=format&fit=crop" alt="Innovation" className="w-full h-full object-cover" />
                      </div>
                      <div className="h-[240px] flex-shrink-0">
                        <img src="https://images.unsplash.com/photo-1596658591534-591d75e2f2f7?auto=format&fit=crop&q=80" alt="Team" className="w-full h-full object-cover" />
                      </div>
                      <div className="h-[240px] flex-shrink-0">
                        <img src="https://images.unsplash.com/photo-1499257398700-43669759a540?auto=format&fit=crop&q=80" alt="Meeting" className="w-full h-full object-cover" />
                      </div>
                      <div className="h-[240px] flex-shrink-0">
                        <img src="https://images.unsplash.com/photo-1511376979163-f804dff7ad7b?q=80&w=687&auto=format&fit=crop" alt="Coding" className="w-full h-full object-cover" />
                      </div>

                      {/* === SET 2 (duplikat persis SET 1) === */}
                      <div className="h-[240px] flex-shrink-0" aria-hidden>
                        <img src="https://images.unsplash.com/photo-1487017159836-4e23ece2e4cf?q=80&w=1471&auto=format&fit=crop" alt="" className="w-full h-full object-cover" />
                      </div>
                      <div className="h-[240px] flex-shrink-0" aria-hidden>
                        <img src="https://images.unsplash.com/photo-1497215641119-bbe6d71ebaae?q=80&w=687&auto=format&fit=crop" alt="" className="w-full h-full object-cover" />
                      </div>
                      <div className="h-[240px] flex-shrink-0" aria-hidden>
                        <img src="https://images.unsplash.com/photo-1596658591534-591d75e2f2f7?auto=format&fit=crop&q=80" alt="" className="w-full h-full object-cover" />
                      </div>
                      <div className="h-[240px] flex-shrink-0" aria-hidden>
                        <img src="https://images.unsplash.com/photo-1499257398700-43669759a540?auto=format&fit=crop&q=80" alt="" className="w-full h-full object-cover" />
                      </div>
                      <div className="h-[240px] flex-shrink-0" aria-hidden>
                        <img src="https://images.unsplash.com/photo-1511376979163-f804dff7ad7b?q=80&w=687&auto=format&fit=crop" alt="" className="w-full h-full object-cover" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-emerald-500/10 rounded-full blur-2xl"></div>
              <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-blue-500/10 rounded-full blur-xl"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
