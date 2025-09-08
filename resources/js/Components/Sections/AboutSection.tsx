// resources/js/Components/Sections/AboutSection.tsx
import React from 'react';

interface AboutSectionProps {
  title?: string;
  subtitle?: string;
  description?: string;
  stats?: Array<{
    number: string;
    label: string;
    suffix?: string;
  }>;
  features?: Array<{
    title: string;
    description: string;
    icon: string;
  }>;
}

export default function AboutSection({
  title = "Tentang DITECH CREATIVE",
  subtitle = "Tim Developer Berpengalaman",
  description = "Kami adalah tim developer berpengalaman yang fokus memberikan solusi teknologi terbaik untuk bisnis Anda. Dengan keahlian dalam berbagai teknologi modern, kami siap membantu mewujudkan visi digital perusahaan Anda.",
  stats = [
    { number: "120", label: "Project Selesai", suffix: "+" },
    { number: "98", label: "Kepuasan Klien", suffix: "%" },
    { number: "5", label: "Tahun Pengalaman", suffix: "+" },
    { number: "24", label: "Support", suffix: "/7" }
  ],
  features = [
    {
      title: "Teknologi Terdepan",
      description: "Menggunakan teknologi modern seperti Laravel 12, React, dan tools terbaru",
      icon: "⚡"
    },
    {
      title: "Tim Profesional",
      description: "Developer berpengalaman dengan track record project sukses",
      icon: "👥"
    },
    {
      title: "Support 24/7",
      description: "Dukungan penuh untuk maintenance dan pengembangan berkelanjutan",
      icon: "🛠️"
    }
  ]
}: AboutSectionProps) {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background Pattern dengan tema gelap */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%22100%22%20height%3D%22100%22%20viewBox%3D%220%200%20100%20100%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.02%22%3E%3Cpolygon%20points%3D%2250%200%2060%2040%20100%2050%2060%2060%2050%20100%2040%2060%200%2050%2040%2040%22/%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>
      </div>

      <div className="relative container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              {title}
            </h2>
            <p className="text-xl text-emerald-400 font-semibold mb-6">
              {subtitle}
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-emerald-400 to-blue-500 mx-auto rounded-full"></div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            {/* Content */}
            <div>
              <p className="text-lg text-white/80 leading-relaxed mb-8">
                {description}
              </p>

              {/* Features */}
              <div className="space-y-6">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-emerald-400/20 backdrop-blur-sm rounded-lg flex items-center justify-center text-xl border border-emerald-400/30">
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-white mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-white/70">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Visual Card dengan tema gelap */}
            <div className="relative">
              <div className="aspect-square bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300">
                <div className="h-full bg-gradient-to-br from-emerald-400/20 to-blue-500/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl mb-4">🚀</div>
                    <h3 className="text-2xl font-bold text-white mb-2">Inovasi Digital</h3>
                    <p className="text-white/70">
                      Transformasi ide menjadi solusi teknologi
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Floating Elements dengan warna emerald */}
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-emerald-400/30 backdrop-blur-sm rounded-full flex items-center justify-center text-2xl animate-bounce border border-emerald-400/50">
                💡
              </div>
              <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-blue-500/30 backdrop-blur-sm rounded-full flex items-center justify-center text-xl animate-pulse border border-blue-500/50">
                ✨
              </div>
            </div>
          </div>

          {/* Stats dengan tema gelap dan emerald accent */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold mb-2 text-white">
                    {stat.number}
                    {stat.suffix && <span className="text-emerald-400">{stat.suffix}</span>}
                  </div>
                  <div className="text-white/70 font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tambahan Section Keunggulan */}
          <div className="mt-16">
            <h3 className="text-2xl font-bold text-white text-center mb-8">
              Mengapa Memilih <span className="text-emerald-400">Kami?</span>
            </h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 text-center">
                <div className="w-16 h-16 bg-emerald-400/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <h4 className="text-lg font-semibold text-white mb-3">Kualitas Terjamin</h4>
                <p className="text-white/70">Standar code clean dan testing menyeluruh untuk setiap project</p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 text-center">
                <div className="w-16 h-16 bg-emerald-400/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                </div>
                <h4 className="text-lg font-semibold text-white mb-3">Delivery Tepat Waktu</h4>
                <p className="text-white/70">Komitmen timeline yang jelas dengan update progress berkala</p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 text-center">
                <div className="w-16 h-16 bg-emerald-400/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                  </svg>
                </div>
                <h4 className="text-lg font-semibold text-white mb-3">Kepuasan Klien</h4>
                <p className="text-white/70">98% tingkat kepuasan dengan review dan feedback positif</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}