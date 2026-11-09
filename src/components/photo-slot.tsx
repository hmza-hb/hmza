"use client";

import { useState } from "react";

type PhotoSlotProps = {
  src: string;
  alt?: string;
  className?: string;
};

export function PhotoSlot({ src, alt = "", className = "" }: PhotoSlotProps) {
  const [failed, setFailed] = useState(false);

  return (
    <div className={`relative overflow-hidden bg-[#e8e8e4] ${className}`}>
      {!failed && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt}
          className="absolute inset-0 h-full w-full object-cover"
          onError={() => setFailed(true)}
        />
      )}
      {failed && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 px-4 text-center">
          <span className="text-[11px] font-medium tracking-[0.14em] uppercase text-neutral-400">
            Drop photo
          </span>
          <span className="max-w-full truncate text-[11px] text-neutral-400">
            {src}
          </span>
        </div>
      )}
    </div>
  );
}
