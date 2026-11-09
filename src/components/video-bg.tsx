"use client";

import { useEffect, useRef, useState } from "react";

type VideoBgProps = {
  src: string;
  poster?: string;
  className?: string;
  /** Load and play as soon as the element is near the viewport (hero tiles). */
  eager?: boolean;
};

export function VideoBg({
  src,
  poster,
  className = "",
  eager = false,
}: VideoBgProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [active, setActive] = useState(eager);
  const [saveData, setSaveData] = useState(false);

  useEffect(() => {
    const conn = (
      navigator as Navigator & {
        connection?: { saveData?: boolean; effectiveType?: string };
      }
    ).connection;

    if (conn?.saveData || conn?.effectiveType === "slow-2g") {
      setSaveData(true);
    }
  }, []);

  useEffect(() => {
    if (saveData) return;

    const root = rootRef.current;
    if (!root) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.some((entry) => entry.isIntersecting);
        setActive(visible);
      },
      {
        root: null,
        rootMargin: eager ? "120px 0px" : "80px 0px",
        threshold: 0.12,
      },
    );

    observer.observe(root);
    return () => observer.disconnect();
  }, [eager, saveData]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || saveData) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      video.pause();
      return;
    }

    if (active) {
      if (video.preload === "none") video.preload = "auto";
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [active, saveData]);

  useEffect(() => {
    const onVisibility = () => {
      const video = videoRef.current;
      if (!video) return;
      if (document.hidden) video.pause();
      else if (active && !saveData) video.play().catch(() => {});
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, [active, saveData]);

  if (saveData && poster) {
    return (
      <div
        ref={rootRef}
        className={`absolute inset-0 overflow-hidden bg-[#e8e8e4] ${className}`}
        style={{
          backgroundImage: `url(${poster})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
    );
  }

  return (
    <div
      ref={rootRef}
      className={`absolute inset-0 overflow-hidden bg-[#e8e8e4] ${className}`}
    >
      {active ? (
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover [transform:translateZ(0)]"
          poster={poster}
          src={src}
          muted
          loop
          playsInline
          autoPlay
          preload="none"
          aria-hidden
        />
      ) : (
        poster && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={poster}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
            aria-hidden
          />
        )
      )}
    </div>
  );
}
