"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import {
  Intro,
  INTRO_SPLIT_DELAY,
  INTRO_SPLIT_DURATION,
} from "@/components/intro";
import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { BeyondBoundaries } from "@/components/beyond-boundaries";
import { LabFeedSections } from "@/components/lab-feed-sections";

const ease = [0.77, 0, 0.175, 1] as const;

export function HomeExperience() {
  const [open, setOpen] = useState(false);
  const [skipIntro, setSkipIntro] = useState(false);
  const [introMounted, setIntroMounted] = useState(true);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setSkipIntro(true);
      setOpen(true);
      setIntroMounted(false);
      return;
    }

    const openTimer = window.setTimeout(() => {
      setOpen(true);
    }, INTRO_SPLIT_DELAY * 1000);

    const unmountTimer = window.setTimeout(() => {
      setIntroMounted(false);
    }, (INTRO_SPLIT_DELAY + INTRO_SPLIT_DURATION) * 1000 + 80);

    return () => {
      window.clearTimeout(openTimer);
      window.clearTimeout(unmountTimer);
    };
  }, []);

  useEffect(() => {
    const lock = !open;
    document.documentElement.style.overflow = lock ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      {introMounted && !skipIntro && <Intro />}
      <Navbar visible={open} />

      <motion.main
        id="top"
        className="min-h-screen origin-center bg-white text-ink"
        initial={{ scale: 1.04 }}
        animate={{ scale: open ? 1 : 1.04 }}
        transition={{ duration: 1.5, ease }}
      >
        <Hero open={open} />
        <BeyondBoundaries open={open} />
        <LabFeedSections open={open} />

        <footer
          id="contact"
          className="mx-auto w-full max-w-[1440px] px-4 py-16 md:px-8"
        >
          <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
            <div id="labs">
              <p className="mb-2 text-[12px] font-medium tracking-[0.2em] uppercase text-muted">
                Start a conversation
              </p>
              <a
                href="/contact"
                className="text-[clamp(1.75rem,4vw,2.5rem)] font-normal tracking-tight text-ink transition-opacity hover:opacity-80"
              >
                hello@hmza.cc
              </a>
            </div>
            <p className="text-sm text-muted">
              <Link
                href="/profile"
                className="text-ink transition-colors hover:underline underline-offset-4"
              >
                Hamza Hafeez
              </Link>
              {" · Labs © 2026 All Rights Reserved."}
            </p>
          </div>

          <div className="mt-12 flex flex-col gap-6 border-t border-black/6 pt-8 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[13px] text-muted">Follow along</p>
            <motion.div
              className="flex flex-wrap items-center gap-2 sm:gap-3"
              initial={{ opacity: 0, y: 12 }}
              animate={open ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
              transition={{ duration: 0.6, delay: 0.1, ease }}
            >
              <a
                href="https://github.com/hmza-hb"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 items-center gap-2.5 rounded-full bg-nav px-4 text-[14px] font-medium text-ink transition-colors hover:bg-[#ececec]"
              >
                <GitHubIcon />
                GitHub
              </a>

              <a
                href="https://linkedin.com/in/hmza-hb"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 items-center gap-2.5 rounded-full bg-nav px-4 text-[14px] font-medium text-ink transition-colors hover:bg-[#ececec]"
              >
                <LinkedInIcon />
                LinkedIn
              </a>
            </motion.div>
          </div>
        </footer>
      </motion.main>
    </>
  );
}

function GitHubIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.035-.015-2.025-3.33.72-4.035-1.605-4.035-1.605-.54-1.365-1.335-1.725-1.335-1.725-1.095-.75.075-.735.075-.735 1.215.075 1.845 1.245 1.845 1.245 1.08 1.845 2.835 1.305 3.525.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.94 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.62-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}
