"use client";

import { motion } from "motion/react";
import { PhotoSlot } from "@/components/photo-slot";
import { VideoBg } from "@/components/video-bg";

const ease = [0.77, 0, 0.175, 1] as const;

const fade = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.75, delay, ease },
});

const writingLinks = [
  { href: "#writing", label: "A field guide to research sprints" },
  { href: "#open-source", label: "Open source that earns its keep" },
];

const topics = [
  "Ventures",
  "Research",
  "Writing",
  "Open source",
  "Career",
  "Labs",
  "Systems",
  "Design",
];

type HeroProps = {
  open: boolean;
};

export function Hero({ open }: HeroProps) {
  return (
    <section className="mx-auto w-full max-w-[1400px] px-5 pb-16 pt-[6.5rem] md:px-8">
      <div className="mb-5 flex items-center justify-between gap-4 md:mb-6">
        <motion.h1
          className="font-display text-[clamp(3.75rem,7vw,5.25rem)] leading-none tracking-[0.02em] text-ink"
          {...(open ? fade(0.18) : { initial: { opacity: 0 } })}
        >
          LABS
        </motion.h1>
        <motion.a
          href="#labs"
          className="inline-flex h-12 items-center gap-2.5 rounded-full bg-nav px-5 text-[14px] font-medium text-ink transition-colors hover:bg-[#ececec]"
          {...(open ? fade(0.26) : { initial: { opacity: 0 } })}
        >
          Join Labs
          <ArrowRight />
        </motion.a>
      </div>

      <div className="grid grid-cols-1 gap-[18px] lg:h-[min(68vh,640px)] lg:grid-cols-[1.18fr_1fr_0.76fr] lg:grid-rows-[1.15fr_0.9fr]">
        <motion.article
          id="ventures"
          className="relative min-h-[520px] lg:row-span-2 lg:min-h-0"
          {...(open ? fade(0.3) : { initial: { opacity: 0 } })}
        >
          <div className="featured-mask absolute inset-0">
            <PhotoSlot
              src="/images/hero-bg.jpeg"
              className="absolute inset-0 h-full w-full"
            />
          </div>

          <div className="absolute bottom-0 left-0 z-10 w-[50%] max-w-[22rem] pb-0.5 pr-3">
            <p className="text-[13px] text-muted">
              Category . Ventures &nbsp;|&nbsp; Ongoing
            </p>
            <h2 className="mt-1 font-display text-[clamp(1.85rem,2.4vw,2.45rem)] leading-[0.92] tracking-[0.02em]">
              Companies and products built in public
            </h2>
          </div>
        </motion.article>

        <motion.article
          id="writing"
          className="relative overflow-hidden rounded-[2rem] bg-lime px-6 py-5 md:px-7 md:py-6"
          {...(open ? fade(0.36) : { initial: { opacity: 0 } })}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -right-16 -top-24 h-72 w-72 rounded-full border-[22px] border-white/30"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute right-6 top-10 h-40 w-40 rounded-full border-[22px] border-white/20"
          />
          <div className="relative flex h-full flex-col">
            <div className="mb-5 flex items-start justify-between gap-4">
              <p className="text-[13px] text-ink/65">Category . Writing</p>
              <ArrowUpRight />
            </div>
            <h2 className="max-w-[20rem] font-display text-[clamp(1.85rem,2.6vw,2.55rem)] leading-[0.9] tracking-[0.02em]">
              Build slowly.
              <br />
              Ship sharply.
              <br />
              Keep the notes.
            </h2>
            <p className="mt-3 max-w-[22rem] text-[13px] leading-relaxed text-ink/70">
              Essays and logs from the work — research, product, and the
              quieter craft between them.{" "}
              <a href="#writing" className="underline underline-offset-4">
                More
              </a>
            </p>
            <ul className="mt-auto pt-8">
              {writingLinks.map((item) => (
                <li key={item.href} className="border-t border-ink/10">
                  <a
                    href={item.href}
                    className="flex items-center justify-between gap-4 py-3 font-display text-[1.02rem] tracking-[0.04em] uppercase"
                  >
                    {item.label}
                    <ArrowRight />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </motion.article>

        <motion.article
          id="research"
          className="relative min-h-[240px] overflow-hidden rounded-[2rem] lg:min-h-0"
          {...(open ? fade(0.42) : { initial: { opacity: 0 } })}
        >
          <VideoBg
            src="/assets/globe.mp4"
            poster="/images/poster-globe.webp"
            eager
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/5 to-black/35" />
          <div className="absolute inset-x-0 top-0 z-10 p-5 text-white">
            <p className="text-[13px] text-white/90">Category . Research</p>
            <p className="text-[13px] text-white/80">Notes . 2026</p>
          </div>
          <div className="absolute inset-x-0 top-[42%] z-10 px-5">
            <h2 className="font-display text-[1.7rem] leading-[0.92] tracking-[0.03em] text-white drop-shadow-sm">
              Reading the grain of a new problem
            </h2>
          </div>
        </motion.article>

        <motion.article
          id="open-source"
          className="relative min-h-[230px] overflow-hidden rounded-[2rem] lg:min-h-0"
          {...(open ? fade(0.48) : { initial: { opacity: 0 } })}
        >
          <VideoBg
            src="/assets/lab.mp4"
            poster="/images/poster-lab.webp"
            eager
          />
          <div className="absolute inset-0 z-[1] bg-gradient-to-t from-black/55 via-black/15 to-transparent" />
         
          <div className="absolute inset-x-0 bottom-0 z-10 p-5 text-white">
            <p className="text-[13px] text-white/85">Studio . 2026</p>
            <h2 className="mt-1 font-display text-[1.45rem] leading-[0.92] tracking-[0.03em] md:text-[1.65rem]">
              How the work actually gets done
            </h2>
          </div>
        </motion.article>

        <motion.article
          id="career"
          className="flex min-h-[230px] flex-col justify-between rounded-[2rem] bg-lilac p-5 lg:min-h-0"
          {...(open ? fade(0.54) : { initial: { opacity: 0 } })}
        >
          <div className="flex flex-wrap gap-2">
            {topics.map((topic) => (
              <span
                key={topic}
                className="rounded-full bg-[#f4ebc0] px-3.5 py-2 text-[12.5px] font-medium text-ink"
              >
                {topic}
              </span>
            ))}
          </div>
          <div className="mt-6 flex items-center justify-between gap-3">
            <p className="text-[15px] font-medium">View all categories</p>
            <a
              href="#ventures"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-ink shadow-sm"
              aria-label="View all categories"
            >
              <ArrowRight />
            </a>
          </div>
        </motion.article>
      </div>
    </section>
  );
}

function ArrowRight() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M2.5 8h11M9.5 4l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArrowUpRight() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M4.5 11.5 11.5 4.5M6 4.5h5.5V10"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
