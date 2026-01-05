// resources/js/Components/Sections/AboutSection.tsx
export default function AboutSection() {
  return (
    <section id="about" className="py-8 sm:py-12 relative overflow-hidden backdrop-blur-sm">
      <div className="relative container mx-auto px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header - Optimized untuk mobile */}
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4 leading-tight">
              Tentang <span className="text-emerald-400">Kami</span>
            </h2>
            <p className="text-sm sm:text-lg text-white/80 max-w-2xl mx-auto px-2 sm:px-0">
              Solusi digital kreatif untuk bisnis dan pengembangan diri Anda
            </p>
          </div>

          {/* Main Content - Mobile First Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-start">
            {/* Left: Teks */}
            <div className="space-y-4 sm:space-y-6 order-2 lg:order-1">
              <div className="space-y-4 sm:space-y-6">
                <div className="space-y-3 sm:space-y-4 text-sm sm:text-base lg:text-lg text-white/80 leading-relaxed">
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

            {/* Right Gallery - Mobile Optimized */}
            <div className="relative order-1 lg:order-2">
              <div className="grid grid-cols-2 gap-2 sm:gap-4 h-[300px] sm:h-[400px] lg:h-[500px]">
                {/* Kiri (gambar besar, diam) */}
                <div className="relative overflow-hidden rounded-lg sm:rounded-2xl">
                  <div className="h-full w-full overflow-hidden [clip-path:polygon(10%_0,100%_0,90%_100%,0_100%)]">
                    <img
                      // OPTIMASI: Width diturunkan ke 800px, Quality 80
                      src="https://images.unsplash.com/photo-1531973576160-7125cd663d86?q=80&w=800&auto=format&fit=crop"
                      alt="Collaboration"
                      className="w-full h-full object-cover transition-all duration-500 hover:brightness-110"
                      loading="lazy"
                    />
                  </div>
                </div>

                {/* Kanan (5 gambar + duplikat) */}
                <div className="relative h-full overflow-hidden rounded-lg sm:rounded-2xl group">
                  <div className="h-full w-full [clip-path:polygon(10%_0,100%_0,90%_100%,0_100%)] overflow-hidden">
                    <div
                      className="
                        absolute top-0 left-0 right-0
                        flex flex-col w-full space-y-2 sm:space-y-4
                        animate-marquee-vert will-change-transform
                        group-hover:[animation-play-state:paused]
                      "
                    >
                      {/* === SET 1 (5 gambar asli) === */}
                      <div className="h-[144px] sm:h-[192px] lg:h-[240px] flex-shrink-0">
                        <img 
                          src="https://images.unsplash.com/photo-1487017159836-4e23ece2e4cf?q=60&w=400&auto=format&fit=crop" 
                          alt="Workspace" 
                          className="w-full h-full object-cover" 
                          loading="lazy"
                        />
                      </div>
                      <div className="h-[144px] sm:h-[192px] lg:h-[240px] flex-shrink-0">
                        <img 
                          src="https://images.unsplash.com/photo-1497215641119-bbe6d71ebaae?q=60&w=400&auto=format&fit=crop" 
                          alt="Innovation" 
                          className="w-full h-full object-cover" 
                          loading="lazy"
                        />
                      </div>
                      <div className="h-[144px] sm:h-[192px] lg:h-[240px] flex-shrink-0">
                        <img 
                          src="https://images.unsplash.com/photo-1596658591534-591d75e2f2f7?q=60&w=400&auto=format&fit=crop" 
                          alt="Team" 
                          className="w-full h-full object-cover" 
                          loading="lazy"
                        />
                      </div>
                      <div className="h-[144px] sm:h-[192px] lg:h-[240px] flex-shrink-0">
                        <img 
                          src="https://images.unsplash.com/photo-1499257398700-43669759a540?q=60&w=400&auto=format&fit=crop" 
                          alt="Meeting" 
                          className="w-full h-full object-cover" 
                          loading="lazy"
                        />
                      </div>
                      <div className="h-[144px] sm:h-[192px] lg:h-[240px] flex-shrink-0">
                        <img 
                          src="https://images.unsplash.com/photo-1511376979163-f804dff7ad7b?q=60&w=400&auto=format&fit=crop" 
                          alt="Coding" 
                          className="w-full h-full object-cover" 
                          loading="lazy"
                        />
                      </div>

                      {/* === SET 2 (duplikat persis SET 1) === */}
                      <div className="h-[144px] sm:h-[192px] lg:h-[240px] flex-shrink-0" aria-hidden>
                        <img 
                          src="https://images.unsplash.com/photo-1487017159836-4e23ece2e4cf?q=60&w=400&auto=format&fit=crop" 
                          alt="" 
                          className="w-full h-full object-cover" 
                          loading="lazy"
                        />
                      </div>
                      <div className="h-[144px] sm:h-[192px] lg:h-[240px] flex-shrink-0" aria-hidden>
                        <img 
                          src="https://images.unsplash.com/photo-1497215641119-bbe6d71ebaae?q=60&w=400&auto=format&fit=crop" 
                          alt="" 
                          className="w-full h-full object-cover" 
                          loading="lazy"
                        />
                      </div>
                      <div className="h-[144px] sm:h-[192px] lg:h-[240px] flex-shrink-0" aria-hidden>
                        <img 
                          src="https://images.unsplash.com/photo-1596658591534-591d75e2f2f7?q=60&w=400&auto=format&fit=crop" 
                          alt="" 
                          className="w-full h-full object-cover" 
                          loading="lazy"
                        />
                      </div>
                      <div className="h-[144px] sm:h-[192px] lg:h-[240px] flex-shrink-0" aria-hidden>
                        <img 
                          src="https://images.unsplash.com/photo-1499257398700-43669759a540?q=60&w=400&auto=format&fit=crop" 
                          alt="" 
                          className="w-full h-full object-cover" 
                          loading="lazy"
                        />
                      </div>
                      <div className="h-[144px] sm:h-[192px] lg:h-[240px] flex-shrink-0" aria-hidden>
                        <img 
                          src="https://images.unsplash.com/photo-1511376979163-f804dff7ad7b?q=60&w=400&auto=format&fit=crop" 
                          alt="" 
                          className="w-full h-full object-cover" 
                          loading="lazy"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative Elements - Mobile Responsive */}
              <div className="absolute -top-2 sm:-top-4 -right-2 sm:-right-4 w-12 h-12 sm:w-24 sm:h-24 bg-emerald-500/10 rounded-full blur-xl sm:blur-2xl"></div>
              <div className="absolute -bottom-2 sm:-bottom-4 -left-2 sm:-left-4 w-10 h-10 sm:w-20 sm:h-20 bg-blue-500/10 rounded-full blur-lg sm:blur-xl"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}