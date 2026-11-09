"use client";

import { motion } from "motion/react";

export const INTRO_SPLIT_DELAY = 1.9;
export const INTRO_SPLIT_DURATION = 1.45;

const ease = [0.77, 0, 0.175, 1] as const;

export function Intro() {
  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      <motion.div
        className="absolute inset-y-0 left-0 flex w-1/2 items-center justify-end bg-paper pr-[0.02em]"
        initial={{ x: 0 }}
        animate={{ x: "-100%" }}
        transition={{
          duration: INTRO_SPLIT_DURATION,
          delay: INTRO_SPLIT_DELAY,
          ease,
        }}
      >
        <motion.span
          className="font-display text-[clamp(4.75rem,16vw,11rem)] leading-none tracking-[0.08em] text-ink"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease }}
        >
          HM
        </motion.span>
        <motion.span
          aria-hidden
          className="absolute inset-y-0 right-0 w-px origin-center bg-ink"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 0.85, delay: 0.5, ease }}
        />
      </motion.div>

      <motion.div
        className="absolute inset-y-0 right-0 flex w-1/2 items-center justify-start bg-paper pl-[0.02em]"
        initial={{ x: 0 }}
        animate={{ x: "100%" }}
        transition={{
          duration: INTRO_SPLIT_DURATION,
          delay: INTRO_SPLIT_DELAY,
          ease,
        }}
      >
        <motion.span
          className="font-display text-[clamp(4.75rem,16vw,11rem)] leading-none tracking-[0.08em] text-ink"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease }}
        >
          ZA
        </motion.span>
        <motion.span
          aria-hidden
          className="absolute inset-y-0 left-0 w-px origin-center bg-ink"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 0.85, delay: 0.5, ease }}
        />
      </motion.div>
    </div>
  );
}
