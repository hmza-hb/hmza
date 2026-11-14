"use client";

import Link from "next/link";
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
  { href: "/writing#project-cortex", label: "Project Cortex" },
  { href: "/writing", label: "All lab writing" },
];

const topicLinks: { label: string; href: string }[] = [
  { label: "Ventures", href: "/#about" },
  { label: "Research", href: "/research" },
  { label: "Writing", href: "/writing" },
  { label: "Open source", href: "/open-source" },
  { label: "Career", href: "/profile" },
  { label: "Labs", href: "/join-labs" },
  { label: "Systems", href: "/open-source" },
  { label: "Design", href: "/writing" },
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
        <motion.div {...(open ? fade(0.26) : { initial: { opacity: 0 } })}>
          <Link
            href="/join-labs"
            className="inline-flex h-12 items-center gap-2.5 rounded-full bg-nav px-5 text-[14px] font-medium text-ink transition-colors hover:bg-[#ececec]"
          >
            Join Labs
            <ArrowRight />
          </Link>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 gap-[18px] lg:h-[min(68vh,640px)] lg:grid-cols-[1.18fr_1fr_0.76fr] lg:grid-rows-[1.15fr_0.9fr]">
        <motion.article
          id="ventures"
          className="group relative min-h-[520px] lg:row-span-2 lg:min-h-0"
          {...(open ? fade(0.3) : { initial: { opacity: 0 } })}
        >
          <Link
            href="/#about"
            className="absolute inset-0 z-10"
            aria-label="Ventures and what we are"
          />
          <div className="featured-mask absolute inset-0">
            <PhotoSlot
              src="/images/hero-bg.jpeg"
              className="absolute inset-0 h-full w-full"
            />
          </div>

          <div className="pointer-events-none absolute bottom-0 left-0 z-[11] w-[50%] max-w-[22rem] pb-0.5 pr-3">
            <p className="text-[13px] text-muted">
              Category . Ventures &nbsp;|&nbsp; Ongoing
            </p>
            <h2 className="mt-1 font-display text-[clamp(1.85rem,2.4vw,2.45rem)] leading-[0.92] tracking-[0.02em] transition-opacity group-hover:opacity-90">
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
              <Link
                href="/writing"
                className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-white/30"
                aria-label="Go to writing"
              >
                <ArrowUpRight />
              </Link>
            </div>
            <h2 className="max-w-[20rem] font-display text-[clamp(1.85rem,2.6vw,2.55rem)] leading-[0.9] tracking-[0.02em]">
              Build slowly.
              <br />
              Ship sharply.
              <br />
              Keep the notes.
            </h2>
            <p className="mt-3 max-w-[22rem] text-[13px] leading-relaxed text-ink/70">
              Essays and logs from the work: research, product, and the
              quieter craft between them.{" "}
              <Link href="/writing" className="underline underline-offset-4">
                More
              </Link>
            </p>
            <ul className="mt-auto pt-8">
              {writingLinks.map((item) => (
                <li key={item.href} className="border-t border-ink/10">
                  <Link
                    href={item.href}
                    className="relative z-10 flex items-center justify-between gap-4 py-3 font-display text-[1.02rem] tracking-[0.04em] uppercase"
                  >
                    {item.label}
                    <ArrowRight />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </motion.article>

        <motion.article
          className="relative min-h-[240px] overflow-hidden rounded-[2rem] lg:min-h-0"
          {...(open ? fade(0.42) : { initial: { opacity: 0 } })}
        >
          <VideoBg
            src="/assets/globe.mp4"
            poster="/images/poster-globe.webp"
            eager
          />
          <Link
            href="/research#cortex-research"
            className="absolute inset-0 z-20"
            aria-label="Research publications"
          >
            <span className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/5 to-black/35" />
            <span className="absolute inset-x-0 top-0 z-10 block p-5 text-white">
              <span className="block text-[13px] text-white/90">
                Category . Research
              </span>
              <span className="block text-[13px] text-white/80">
                Notes . 2026
              </span>
            </span>
            <span className="absolute inset-x-0 top-[42%] z-10 block px-5">
              <span className="font-display text-[1.7rem] leading-[0.92] tracking-[0.03em] text-white drop-shadow-sm">
                Reading the grain of a new problem
              </span>
            </span>
          </Link>
        </motion.article>

        <motion.article
          className="relative min-h-[230px] overflow-hidden rounded-[2rem] lg:min-h-0"
          {...(open ? fade(0.48) : { initial: { opacity: 0 } })}
        >
          <VideoBg
            src="/assets/lab.mp4"
            poster="/images/poster-lab.webp"
            eager
          />
          <Link
            href="/open-source"
            className="absolute inset-0 z-20"
            aria-label="Open source work"
          >
            <span className="absolute inset-0 z-[1] bg-gradient-to-t from-black/55 via-black/15 to-transparent" />
            <span className="absolute inset-x-0 bottom-0 z-10 block p-5 text-white">
              <span className="block text-[13px] text-white/85">
                Studio . 2026
              </span>
              <span className="mt-1 block font-display text-[1.45rem] leading-[0.92] tracking-[0.03em] md:text-[1.65rem]">
                How the work actually gets done
              </span>
            </span>
          </Link>
        </motion.article>

        <motion.article
          id="career"
          className="flex min-h-[230px] flex-col justify-between rounded-[2rem] bg-lilac p-5 lg:min-h-0"
          {...(open ? fade(0.54) : { initial: { opacity: 0 } })}
        >
          <div className="flex flex-wrap gap-2">
            {topicLinks.map((topic) => (
              <Link
                key={topic.label}
                href={topic.href}
                className="rounded-full bg-[#f4ebc0] px-3.5 py-2 text-[12.5px] font-medium text-ink transition-colors hover:bg-[#ebe3b3]"
              >
                {topic.label}
              </Link>
            ))}
          </div>
          <div className="mt-6 flex items-center justify-between gap-3">
            <Link
              href="/profile"
              className="text-[15px] font-medium hover:underline underline-offset-4"
            >
              View profile
            </Link>
            <Link
              href="/profile"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-ink shadow-sm transition-colors hover:bg-nav"
              aria-label="View profile"
            >
              <ArrowRight />
            </Link>
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
