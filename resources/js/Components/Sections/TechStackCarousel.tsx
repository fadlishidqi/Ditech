// resources/js/Components/Sections/TechStackCarousel.tsx
import React from 'react';

interface TechStack {
  name: string;
  logo: string;
  category: string;
  color?: string;
}

interface TechStackCarouselProps {
  title?: string;
  subtitle?: string;
}

export default function TechStackCarousel({
}: TechStackCarouselProps) {
  const row1TechStacks: TechStack[] = [
    { name: 'Laravel', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg', category: 'Back-End Development' },
    { name: 'React', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', category: 'Front-End Development' },
    { name: 'Next.js', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg', category: 'Full-Stack Development' },
    { name: 'Vue.js', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg', category: 'Front-End Development' },
    { name: 'Flutter', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg', category: 'Mobile Development' },
    { name: 'TypeScript', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg', category: 'Programming Language' },
    { name: 'Figma', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg', category: 'UI/UX Design' },
  ];

  const row2TechStacks: TechStack[] = [
    { name: 'Node.js', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg', category: 'Back-End Development' },
    { name: 'Python', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg', category: 'Data Science' },
    { name: 'Arduino', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/arduino/arduino-original.svg', category: 'IoT Development' },
    { name: 'MySQL', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg', category: 'Database' },
    { name: 'Tailwind CSS', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg', category: 'CSS Framework' },
    { name: 'MongoDB', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg', category: 'Database' },
    { name: 'Kotlin', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg', category: 'Mobile Development' },
  ];

  const trip1 = [...row1TechStacks, ...row1TechStacks, ...row1TechStacks];
  const trip2 = [...row2TechStacks, ...row2TechStacks, ...row2TechStacks];

  const TechCard = ({ tech }: { tech: TechStack }) => (
    <div className="flex-shrink-0 bg-white/10 backdrop-blur-sm rounded-lg sm:rounded-xl p-3 sm:p-4 border border-white/20 hover:bg-white/20 transition-all duration-300 group cursor-pointer mr-3 sm:mr-4 lg:mr-6 min-w-[160px] sm:min-w-[180px] lg:min-w-[220px]">
      <div className="flex items-center gap-2 sm:gap-3 lg:gap-4">
        <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-white/20 rounded-md sm:rounded-lg p-1.5 sm:p-2 flex-shrink-0">
          <img 
            src={tech.logo} 
            alt={tech.name} 
            className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110" 
            loading="lazy"
          />
        </div>
        <div className="flex-1 min-w-0">
          <h5 className="text-white font-semibold text-xs sm:text-sm lg:text-base capitalize mb-0.5 sm:mb-1 truncate">
            {tech.name}
          </h5>
          <p className="text-white/60 text-[10px] sm:text-xs lg:text-sm truncate leading-tight">
            {tech.category}
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <section className="py-4 sm:py-6 lg:py-8 overflow-hidden">

        {/* Row 1 */}
        <div className="relative mb-4 sm:mb-6 lg:mb-8">
          {/* Gradient overlays - Mobile optimized */}
          <div className="absolute left-0 top-0 w-16 sm:w-24 lg:w-32 h-full bg-gradient-to-r from-black/70 via-black/50 to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 w-16 sm:w-24 lg:w-32 h-full bg-gradient-to-l from-black/70 via-black/50 to-transparent z-10 pointer-events-none"></div>

          <div className="flex animate-scrollRight w-fit will-change-transform [animation-play-state:running] hover:[animation-play-state:paused]">
            {trip1.map((tech, i) => <TechCard key={`row1-${i}`} tech={tech} />)}
          </div>
        </div>

        {/* Row 2 */}
        <div className="relative">
          {/* Gradient overlays - Mobile optimized */}
          <div className="absolute left-0 top-0 w-16 sm:w-24 lg:w-32 h-full bg-gradient-to-r from-black/70 via-black/50 to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 w-16 sm:w-24 lg:w-32 h-full bg-gradient-to-l from-black/70 via-black/50 to-transparent z-10 pointer-events-none"></div>

          <div className="flex animate-scrollLeft w-fit will-change-transform [animation-play-state:running] hover:[animation-play-state:paused]">
            {trip2.map((tech, i) => <TechCard key={`row2-${i}`} tech={tech} />)}
          </div>
        </div>
      </section>

      {/* Keyframes - Mobile optimized animations */}
      <style>{`
        @keyframes scrollRight {
          from { transform: translateX(0); }
          to { transform: translateX(-33.333%); }
        }
        @keyframes scrollLeft {
          from { transform: translateX(-33.333%); }
          to { transform: translateX(0); }
        }
        .animate-scrollRight {
          animation: scrollRight 45s linear infinite;
        }
        .animate-scrollLeft {
          animation: scrollLeft 45s linear infinite;
        }
        
        /* Mobile: slower animation */
        @media (max-width: 640px) {
          .animate-scrollRight {
            animation: scrollRight 60s linear infinite;
          }
          .animate-scrollLeft {
            animation: scrollLeft 60s linear infinite;
          }
        }
        
        /* Reduce motion for accessibility */
        @media (prefers-reduced-motion: reduce) {
          .animate-scrollRight,
          .animate-scrollLeft {
            animation-play-state: paused;
          }
        }
      `}</style>
    </>
  );
}