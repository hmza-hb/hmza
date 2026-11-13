"use client";

import { motion } from "motion/react";

const ease = [0.77, 0, 0.175, 1] as const;

export type PageLoadingVariant =
  | "home"
  | "research"
  | "writing"
  | "open-source"
  | "profile"
  | "contact";

const pageTitles: Record<PageLoadingVariant, string> = {
  home: "HMZA",
  research: "Research",
  writing: "Writing",
  "open-source": "Open source",
  profile: "Profile",
  contact: "Contact",
};

type PageLoadingProps = {
  variant: PageLoadingVariant;
};

export function PageLoading({ variant }: PageLoadingProps) {
  return (
    <div
      className="min-h-screen bg-white text-ink"
      role="status"
      aria-live="polite"
      aria-label={`Loading ${pageTitles[variant]}`}
    >
      <LoadingBar />
      <NavPlaceholder />

      <div className="mx-auto w-full max-w-[1400px] px-5 pb-24 pt-[6.5rem] md:px-8 md:pt-28">
        <PageHeading title={pageTitles[variant]} variant={variant} />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease }}
          className={
            variant === "open-source" ? "mx-auto max-w-[840px]" : "w-full"
          }
        >
          {variant === "home" && <HomeLoading />}
          {variant === "research" && <ResearchLoading />}
          {variant === "writing" && <WritingLoading />}
          {variant === "open-source" && <OpenSourceLoading />}
          {variant === "profile" && <ProfileLoading />}
          {variant === "contact" && <ContactLoading />}
        </motion.div>
      </div>
    </div>
  );
}

function LoadingBar() {
  return (
    <div className="fixed inset-x-0 top-0 z-[60] h-[3px] overflow-hidden bg-black/[0.04]">
      <motion.div
        className="h-full w-1/3 bg-lime"
        initial={{ x: "-120%" }}
        animate={{ x: ["-120%", "320%", "320%"] }}
        transition={{
          duration: 1.35,
          repeat: Infinity,
          ease: "easeInOut",
          times: [0, 0.55, 1],
        }}
      />
    </div>
  );
}

function NavPlaceholder() {
  return (
    <div className="fixed inset-x-0 top-[3px] z-50 border-b border-black/[0.06] bg-white">
      <div className="mx-auto flex h-[5.25rem] max-w-[1400px] items-center justify-between gap-4 px-5 md:px-8 lg:grid lg:grid-cols-[1fr_auto_1fr]">
        <ShimmerBlock className="h-10 w-[7.5rem] rounded-full" delay={0} />
        <ShimmerBlock
          className="hidden h-11 w-[min(100%,22rem)] rounded-full lg:block lg:justify-self-center"
          delay={0.08}
        />
        <div className="flex justify-end gap-2 lg:justify-self-end">
          <ShimmerBlock className="hidden h-11 w-24 rounded-full lg:block" delay={0.12} />
          <ShimmerBlock className="h-11 w-24 rounded-full sm:w-28" delay={0.15} />
          <ShimmerBlock className="h-11 w-11 rounded-full lg:hidden" delay={0.1} />
        </div>
      </div>
    </div>
  );
}

function PageHeading({
  title,
  variant,
}: {
  title: string;
  variant: PageLoadingVariant;
}) {
  if (variant === "home") {
    return (
      <motion.div
        className="mb-8 md:mb-10"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease }}
      >
        <p className="font-display text-[clamp(3.5rem,12vw,6.5rem)] leading-none tracking-[0.06em] text-black/[0.07]">
          {title}
        </p>
      </motion.div>
    );
  }

  return (
    <header className="mb-10 md:mb-14">
      <motion.p
        className="text-[13px] font-medium text-muted"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, ease }}
      >
        Loading
      </motion.p>
      <motion.h1
        className="mt-3 font-display text-[clamp(2.75rem,6vw,4rem)] leading-[0.92] tracking-[0.03em] text-ink/25"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.05, ease }}
      >
        {title}
      </motion.h1>
      <div className="mt-6 space-y-3">
        <ShimmerBlock className="h-4 w-full max-w-xl rounded-lg" delay={0.1} />
        <ShimmerBlock className="h-4 w-full max-w-lg rounded-lg" delay={0.14} />
      </div>
    </header>
  );
}

function ShimmerBlock({
  className,
  delay = 0,
}: {
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={`relative overflow-hidden border border-black/[0.06] bg-nav ${className ?? ""}`}
      initial={{ opacity: 0.85 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, delay, ease }}
    >
      <motion.span
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/80 to-transparent"
        initial={{ x: "-100%" }}
        animate={{ x: "200%" }}
        transition={{
          duration: 1.65,
          delay: delay + 0.2,
          repeat: Infinity,
          repeatDelay: 0.35,
          ease: "easeInOut",
        }}
      />
    </motion.div>
  );
}

function HomeLoading() {
  return (
    <div className="grid gap-4 md:gap-5 lg:grid-cols-12 lg:gap-5">
      <ShimmerBlock
        className="min-h-[min(52vh,420px)] rounded-[2rem] lg:col-span-7 lg:row-span-2"
        delay={0}
      />
      <ShimmerBlock
        className="min-h-[200px] rounded-[2rem] lg:col-span-5"
        delay={0.08}
      />
      <ShimmerBlock
        className="min-h-[180px] rounded-[2rem] lg:col-span-5"
        delay={0.12}
      />
      <ShimmerBlock
        className="min-h-[160px] rounded-[2rem] lg:col-span-4"
        delay={0.1}
      />
      <ShimmerBlock
        className="min-h-[160px] rounded-[2rem] lg:col-span-4"
        delay={0.14}
      />
      <ShimmerBlock
        className="min-h-[160px] rounded-[2rem] lg:col-span-4"
        delay={0.18}
      />
      <ShimmerBlock
        className="min-h-[140px] rounded-[2rem] lg:col-span-12"
        delay={0.22}
      />
    </div>
  );
}

function ResearchLoading() {
  return (
    <div className="space-y-6">
      <ShimmerBlock className="min-h-[min(48vh,380px)] w-full rounded-[2rem]" delay={0.1} />
      <ShimmerBlock className="min-h-[200px] w-full rounded-[2rem]" delay={0.16} />
    </div>
  );
}

function WritingLoading() {
  return (
    <>
      <div className="mb-10 flex flex-wrap gap-3">
        {["w-16", "w-20", "w-24", "w-28", "w-22"].map((w, i) => (
          <ShimmerBlock
            key={w}
            className={`h-11 ${w === "w-22" ? "w-[5.5rem]" : w} rounded-full`}
            delay={0.08 + i * 0.04}
          />
        ))}
      </div>
      <ShimmerBlock className="min-h-[min(42vh,320px)] w-full rounded-[2rem]" delay={0.12} />
      <div className="mt-8 grid gap-5 md:grid-cols-2">
        <ShimmerBlock className="min-h-[220px] rounded-[1.75rem]" delay={0.18} />
        <ShimmerBlock className="min-h-[220px] rounded-[1.75rem]" delay={0.22} />
      </div>
    </>
  );
}

function OpenSourceLoading() {
  return (
  <>
    <div className="grid gap-10 border-b border-black/[0.08] pb-12 sm:grid-cols-[minmax(200px,280px)_1fr] sm:gap-12">
      <ShimmerBlock className="aspect-square w-full max-w-[280px] rounded-2xl" delay={0.1} />
      <div className="flex flex-col justify-center gap-4">
        <ShimmerBlock className="h-5 w-full max-w-md rounded-lg" delay={0.14} />
        <ShimmerBlock className="h-5 w-full max-w-sm rounded-lg" delay={0.16} />
        <ShimmerBlock className="h-11 w-40 rounded-full" delay={0.2} />
      </div>
    </div>
    <div className="mt-12 space-y-6">
      {Array.from({ length: 5 }).map((_, i) => (
        <ShimmerBlock
          key={i}
          className="h-6 w-full rounded-lg"
          delay={0.12 + i * 0.05}
        />
      ))}
    </div>
    <ShimmerBlock className="mt-12 min-h-[200px] w-full rounded-2xl" delay={0.28} />
  </>
  );
}

function ProfileLoading() {
  return (
    <div className="grid gap-12 lg:grid-cols-[minmax(280px,320px)_1fr] lg:gap-16">
      <ShimmerBlock className="min-h-[min(50vh,420px)] w-full rounded-[1.25rem] lg:sticky lg:top-32" delay={0.1} />
      <div className="space-y-10">
        <section className="space-y-5">
          <ShimmerBlock className="h-4 w-36 rounded-md" delay={0.14} />
          <ShimmerBlock className="min-h-[120px] w-full rounded-xl" delay={0.16} />
        </section>
        <section className="space-y-5">
          <ShimmerBlock className="h-4 w-48 rounded-md" delay={0.2} />
          <ShimmerBlock className="min-h-[160px] w-full rounded-xl" delay={0.22} />
          <ShimmerBlock className="min-h-[100px] w-full rounded-xl" delay={0.24} />
        </section>
      </div>
    </div>
  );
}

function ContactLoading() {
  return (
    <>
      <div className="grid gap-6 lg:grid-cols-[1.35fr_0.65fr]">
        <ShimmerBlock className="min-h-[280px] rounded-[2rem]" delay={0.1} />
        <ShimmerBlock className="min-h-[240px] rounded-[2rem]" delay={0.14} />
      </div>
      <div className="mt-12 grid gap-5 md:grid-cols-3">
        <ShimmerBlock className="min-h-[260px] rounded-[1.75rem]" delay={0.18} />
        <ShimmerBlock className="min-h-[260px] rounded-[1.75rem]" delay={0.22} />
        <ShimmerBlock className="min-h-[260px] rounded-[1.75rem]" delay={0.26} />
      </div>
    </>
  );
}
