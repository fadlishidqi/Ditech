'use client'
import React, { useEffect, useState } from 'react';

type Props = {
  phrases: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pause?: number;
  className?: string;
  mobileBreakpoint?: number;
  mobilePhrases?: string[];
};

export default function Typewriter({
  phrases,
  typingSpeed = 60,
  deletingSpeed = 40,
  pause = 1200,
  className = '',
  mobileBreakpoint = 640,
  mobilePhrases,
}: Props) {
  const [idx, setIdx] = useState(0);
  const [subIdx, setSubIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile screen size
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < mobileBreakpoint);
    };
    
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    
    return () => window.removeEventListener('resize', checkIsMobile);
  }, [mobileBreakpoint]);

  // Reset animation when switching between mobile/desktop
  useEffect(() => {
    setIdx(0);
    setSubIdx(0);
    setDeleting(false);
  }, [isMobile]);

  // Use mobile phrases if available and on mobile
  const currentPhrases = isMobile && mobilePhrases ? mobilePhrases : phrases;

  useEffect(() => {
    const current = currentPhrases[idx % currentPhrases.length];
    
    // selesai ngetik → jeda → mulai hapus
    if (!deleting && subIdx === current.length) {
      const t = setTimeout(() => setDeleting(true), pause);
      return () => clearTimeout(t);
    }
    
    // selesai hapus → lanjut ke kalimat berikutnya
    if (deleting && subIdx === 0) {
      setDeleting(false);
      setIdx((prev) => (prev + 1) % currentPhrases.length);
      return;
    }
    
    // ketik / hapus karakter berikutnya
    const t = setTimeout(() => {
      setSubIdx((prev) => prev + (deleting ? -1 : 1));
    }, deleting ? deletingSpeed : typingSpeed);
    
    return () => clearTimeout(t);
  }, [subIdx, deleting, idx, currentPhrases, typingSpeed, deletingSpeed, pause]);

  const currentFull = currentPhrases[idx % currentPhrases.length];
  const shown = currentFull.slice(0, subIdx);

  return (
    <span className={`${className} ${isMobile ? 'text-2xl sm:text-3xl' : ''}`}>
      {shown}
      {/* kursor */}
      <span className="ml-0.5 inline-block w-[2px] h-[1em] align-[-0.15em] bg-emerald-400 animate-pulse" />
    </span>
  );
}