// resources/js/Components/Sections/LegalitasSection.tsx
interface LegalitasSectionProps {
  title?: string;
  subtitle?: string;
}

export default function LegalitasSection({
}: LegalitasSectionProps) {
  const legalData = [
    {
      label: "Nama Perusahaan",
      value: "CV. DIGITAL TECHNOLOGY CREATIVE"
    },
    {
      label: "Tanggal Akta Pendirian",
      value: "19 November 2024"
    },
    {
      label: "No SK",
      value: "AHU-0093427-AH.01.14 Tahun 2024"
    },
    {
      label: "NPWP",
      value: "28.595.249.5-408.000"
    },
    {
      label: "NIB",
      value: "1112240027026"
    }
  ];

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      console.log('Copied to clipboard:', text);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <section className="py-8 sm:py-12 lg:py-20 relative overflow-hidden">
      <div className="relative container mx-auto px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4 leading-tight">
              Legalitas <span className="text-emerald-400">Perusahaan</span>
            </h2>
            <p className="text-sm sm:text-base lg:text-lg text-white/80 max-w-4xl mx-auto px-2 sm:px-0 leading-relaxed">
              Sebagai perusahaan yang berkomitmen pada transparansi dan profesionalisme, kami dengan bangga menyajikan informasi legalitas lengkap CV. DITECH CREATIVE yang telah terdaftar resmi di Kementerian Hukum dan HAM Republik Indonesia.
            </p>
          </div>

          {/* Content */}
          <div className="max-w-4xl mx-auto">

            {/* Legal Information Card */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-white/20 overflow-hidden mb-8 sm:mb-12">

              {/* Legal Data */}
              <div className="p-4 sm:p-6 lg:p-8">
                <div className="space-y-6 sm:space-y-8">
                  {legalData.map((item, index) => (
                    <div 
                      key={index} 
                      className="border-b border-white/10 pb-4 sm:pb-6 last:border-b-0 last:pb-0 group"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <dt className="text-xs sm:text-sm font-medium text-emerald-400 mb-1 sm:mb-2">
                            {item.label}
                          </dt>
                          <dd className="text-sm sm:text-base lg:text-lg font-semibold text-white break-all leading-tight">
                            {item.value}
                          </dd>
                        </div>
                        
                        {/* Copy button */}
                        <button 
                          onClick={() => copyToClipboard(item.value)}
                          className="hidden sm:flex flex-shrink-0 p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-emerald-400/30 transition-all duration-300 opacity-0 group-hover:opacity-100"
                          title="Salin ke clipboard"
                        >
                          <svg className="w-4 h-4 text-white/70 hover:text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"/>
                            <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z"/>
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Trust Points - Mobile Responsive */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-12">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg sm:rounded-xl p-4 sm:p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 text-center relative overflow-hidden group">
                {/* Shiny overlay effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                
                <div className="relative z-10">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-emerald-400/20 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h4 className="text-base sm:text-lg font-semibold text-white mb-2 sm:mb-3 group-hover:text-emerald-400 transition-colors duration-300">Dokumen Lengkap</h4>
                  <p className="text-xs sm:text-sm text-white/70 group-hover:text-white/90 transition-colors duration-300 leading-relaxed">Akta pendirian, SK Kemenkumham, NPWP, dan NIB tersedia lengkap</p>
                </div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-lg sm:rounded-xl p-4 sm:p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 text-center relative overflow-hidden group">
                {/* Shiny overlay effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                
                <div className="relative z-10">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-emerald-400/20 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586
                        7.707 9.293a1 1 0 00-1.414 1.414L9 13.414l4.707-4.707z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <h4 className="text-base sm:text-lg font-semibold text-white mb-2 sm:mb-3 group-hover:text-emerald-400 transition-colors duration-300">Transparansi Penuh</h4>
                  <p className="text-xs sm:text-sm text-white/70 group-hover:text-white/90 transition-colors duration-300 leading-relaxed">Semua informasi legal dapat diverifikasi secara online</p>
                </div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-lg sm:rounded-xl p-4 sm:p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 text-center relative overflow-hidden group sm:col-span-2 md:col-span-1">
                {/* Shiny overlay effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                
                <div className="relative z-10">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-emerald-400/20 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h4 className="text-base sm:text-lg font-semibold text-white mb-2 sm:mb-3 group-hover:text-emerald-400 transition-colors duration-300">Standar Profesional</h4>
                  <p className="text-xs sm:text-sm text-white/70 group-hover:text-white/90 transition-colors duration-300 leading-relaxed">Memenuhi semua persyaratan hukum untuk operasional bisnis</p>
                </div>
              </div>
            </div>

            {/* Bottom Note - Mobile Responsive */}
            <div className="text-center">
              <p className="text-xs sm:text-sm text-white/60 max-w-2xl mx-auto px-2 sm:px-0 leading-relaxed">
                Semua informasi legalitas di atas adalah data resmi yang dapat diverifikasi melalui sistem online 
                Kementerian Hukum dan HAM Republik Indonesia.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}