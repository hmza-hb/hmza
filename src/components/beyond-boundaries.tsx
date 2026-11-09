"use client";

import { motion } from "motion/react";
import { VideoBg } from "@/components/video-bg";

const ease = [0.77, 0, 0.175, 1] as const;

type BeyondBoundariesProps = {
  open: boolean;
};

export function BeyondBoundaries({ open }: BeyondBoundariesProps) {
  return (
    <section
      id="about"
      className="mx-auto w-full max-w-[1400px] px-5 py-20 md:px-8 md:py-28"
    >
      <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={open ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
          transition={{ duration: 0.85, delay: 0.15, ease }}
        >
          <p className="text-[12px] font-medium tracking-[0.22em] uppercase text-muted">
            What we are
          </p>
          <h2 className="mt-4 font-display text-[clamp(2.75rem,5.5vw,4.25rem)] leading-[0.92] tracking-[0.02em] text-ink">
            Engineering
            <br />
            Beyond Boundaries
          </h2>
          <p className="mt-7 max-w-xl text-[15px] leading-[1.75] text-muted md:text-base">
            This is our independent lab, a place where we publish
            ideas, research complex technologies, build software and hardware products, run
            experiments, release open-source software & benchmarks and invite people to participate as well.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href="#writing"
              className="inline-flex h-12 items-center rounded-full bg-nav px-5 text-[14px] font-medium text-ink transition-colors hover:bg-[#ececec]"
            >
              Read writings
            </a>
            <a
              href="#labs"
              className="inline-flex h-12 items-center rounded-full bg-ink px-5 text-[14px] font-medium text-white transition-colors hover:bg-neutral-800"
            >
              Participate
            </a>
          </div>
        </motion.div>

        <motion.aside
          className="relative min-h-[320px] overflow-hidden rounded-[2rem] sm:min-h-[380px] lg:min-h-[min(52vh,480px)]"
          initial={{ opacity: 0, y: 32 }}
          animate={open ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
          transition={{ duration: 0.9, delay: 0.28, ease }}
        >
          <VideoBg
            src="/assets/bg2.mp4"
            poster="/images/poster-bg2.webp"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-black/10" />
          <div className="absolute inset-x-0 bottom-0 z-10 p-6 md:p-7">
            <p className="text-[12px] font-medium tracking-[0.18em] uppercase text-white/85">
            Built in the Open.
            </p>
            <p className="mt-1 max-w-xs font-display text-2xl leading-[0.95] tracking-[0.03em] text-white">
            Not everything starts as a product
            </p>
          </div>
        </motion.aside>
      </div>
    </section>
  );
}
