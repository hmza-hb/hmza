"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

const languages = [
  { code: "EN", name: "English", native: "English" },
  { code: "JP", name: "Japanese", native: "日本語" },
] as const;

type LanguageSwitcherProps = {
  placement?: "down" | "up";
  fullWidth?: boolean;
};

export function LanguageSwitcher({
  placement = "down",
  fullWidth = false,
}: LanguageSwitcherProps) {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState<(typeof languages)[number]>(languages[0]);
  const root = useRef<HTMLDivElement>(null);
  const opensUp = placement === "up";

  useEffect(() => {
    const onPointer = (event: MouseEvent) => {
      if (!root.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <div ref={root} className={`relative ${fullWidth ? "w-full" : ""}`}>
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
        className={`flex h-12 items-center gap-2 rounded-full bg-nav text-[13px] font-medium text-ink transition-colors hover:bg-[#ececec] ${
          fullWidth ? "w-full justify-between px-4" : "h-11 px-3.5"
        }`}
      >
        <span className="flex items-center gap-2">
          <GlobeIcon />
          <span>{fullWidth ? current.native : current.code}</span>
        </span>
        <ChevronIcon open={open} pointsUp={opensUp} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            role="listbox"
            aria-label="Select language"
            initial={{ opacity: 0, y: opensUp ? -10 : 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: opensUp ? -10 : 10, scale: 0.98 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className={`absolute z-50 max-h-[min(52vh,22rem)] overflow-y-auto rounded-2xl border border-black/5 bg-white p-1.5 shadow-[0_18px_50px_rgba(0,0,0,0.12)] ${
              opensUp
                ? "bottom-full left-0 right-0 mb-2 origin-bottom"
                : "right-0 mt-2 w-[17.5rem] origin-top-right"
            } ${fullWidth && !opensUp ? "left-0 w-full" : ""}`}
          >
            <p className="px-3 pb-1 pt-2 text-[11px] font-medium tracking-[0.16em] uppercase text-muted">
              Language
            </p>
            {languages.map((language) => {
              const selected = language.code === current.code;
              return (
                <button
                  key={language.code}
                  type="button"
                  role="option"
                  aria-selected={selected}
                  onClick={() => {
                    setCurrent(language);
                    setOpen(false);
                  }}
                  className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors ${
                    selected ? "bg-nav" : "hover:bg-[#f7f7f7]"
                  }`}
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-[11px] font-semibold tracking-wide text-ink shadow-[0_0_0_1px_rgba(0,0,0,0.06)]">
                    {language.code}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[13px] font-medium leading-tight">
                      {language.native}
                    </span>
                    {language.native !== language.name && (
                      <span className="block text-[11px] text-muted">
                        {language.name}
                      </span>
                    )}
                  </span>
                  {selected && <CheckIcon />}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function GlobeIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.7" />
      <path
        d="M3 12h18M12 3c2.5 3 3.8 6 3.8 9s-1.3 6-3.8 9c-2.5-3-3.8-6-3.8-9s1.3-6 3.8-9z"
        stroke="currentColor"
        strokeWidth="1.7"
      />
    </svg>
  );
}

function ChevronIcon({
  open,
  pointsUp = false,
}: {
  open: boolean;
  pointsUp?: boolean;
}) {
  const flipped = pointsUp ? !open : open;
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden
      className={`transition-transform duration-200 ${flipped ? "rotate-180" : ""}`}
    >
      <path
        d="M2.5 4.5 6 8l3.5-3.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M3.5 8.5 6.5 11.5 12.5 4.5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
