"use client";

import { useEffect, useRef } from "react";

type VideoBgProps = {
  src: string;
  className?: string;
};

export function VideoBg({ src, className = "" }: VideoBgProps) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      video.pause();
      return;
    }

    video.play().catch(() => {});
  }, [src]);

  return (
    <div className={`absolute inset-0 overflow-hidden bg-[#e8e8e4] ${className}`}>
      <video
        ref={ref}
        className="absolute inset-0 h-full w-full object-cover"
        src={src}
        muted
        loop
        playsInline
        autoPlay
        preload="metadata"
        aria-hidden
      />
    </div>
  );
}
