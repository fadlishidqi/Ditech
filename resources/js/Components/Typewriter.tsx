'use client'

import React, { useEffect, useState } from 'react';

type Props = {
  phrases: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pause?: number;
  className?: string;
};

export default function Typewriter({
  phrases,
  typingSpeed = 60,
  deletingSpeed = 40,
  pause = 1200,
  className = '',
}: Props) {
  const [idx, setIdx] = useState(0);
  const [subIdx, setSubIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = phrases[idx % phrases.length];

    // selesai ngetik → jeda → mulai hapus
    if (!deleting && subIdx === current.length) {
      const t = setTimeout(() => setDeleting(true), pause);
      return () => clearTimeout(t);
    }

    // selesai hapus → lanjut ke kalimat berikutnya
    if (deleting && subIdx === 0) {
      setDeleting(false);
      setIdx((prev) => (prev + 1) % phrases.length);
      return;
    }

    // ketik / hapus karakter berikutnya
    const t = setTimeout(() => {
      setSubIdx((prev) => prev + (deleting ? -1 : 1));
    }, deleting ? deletingSpeed : typingSpeed);

    return () => clearTimeout(t);
  }, [subIdx, deleting, idx, phrases, typingSpeed, deletingSpeed, pause]);

  const currentFull = phrases[idx % phrases.length];
  const shown = currentFull.slice(0, subIdx);

  return (
    <span className={className}>
      {shown}
      {/* kursor */}
      <span className="ml-0.5 inline-block w-[2px] h-[1em] align-[-0.15em] bg-emerald-400 animate-pulse" />
    </span>
  );
}
