"use client";

import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  type MotionValue,
} from "motion/react";

type Chapter = {
  label: string;
  tag: string;
  heading: string;
  body: string;
  surface: string;
  media: "none" | "image" | "video";
  image?: string;
  video?: string;
};

const chapters: Chapter[] = [
  {
    label: "01",
    tag: "Publish",
    heading: "Ideas go out before they're polished",
    body: "Writing is how I pressure-test a thought. Some of it becomes product; most of it is just honest notes from the work.",
    surface: "bg-paper text-ink border border-black/8",
    media: "none",
  },
  {
    label: "02",
    tag: "Build",
    heading: "Products are the artifacts that survive",
    body: "Ventures aren't slide decks. They're things you can click, break, and ship again — usually in public.",
    surface: "bg-ink text-white",
    media: "image",
    image: "/images/hero-bg.jpeg",
  },
  {
    label: "03",
    tag: "Experiment",
    heading: "The lab tolerates odd failures",
    body: "Side quests, spikes, prototypes that never graduate. Kept on record so the next attempt starts further along.",
    surface: "bg-lime text-ink",
    media: "video",
    video: "/assets/lab.mp4",
  },
  {
    label: "04",
    tag: "Open source",
    heading: "Code I can afford to give away",
    body: "Libraries and tools that outlived their first use case. Released so someone else's sprint gets shorter.",
    surface: "bg-white text-ink shadow-[inset_0_0_0_1px_rgba(0,0,0,0.08)]",
    media: "video",
    video: "/assets/globe.mp4",
  },
  {
    label: "05",
    tag: "Participate",
    heading: "You can walk into the room",
    body: "Labs isn't a funnel — it's an invitation. Join a build, critique a draft, or bring a problem worth sitting with.",
    surface: "bg-lilac text-ink",
    media: "none",
  },
];

export function LabScrollSection() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  if (reduced) {
    return <LabStatic />;
  }

  return <LabScrollScene />;
}

function LabScrollScene() {
  const containerRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const deckRotateX = useTransform(
    scrollYProgress,
    [0, 0.35, 0.7, 1],
    [22, 8, -6, -14]
  );
  const deckRotateY = useTransform(scrollYProgress, [0, 1], [-16, 22]);
  const spread = useTransform(scrollYProgress, [0, 0.45, 1], [0.12, 0.55, 1]);
  const introOpacity = useTransform(scrollYProgress, [0, 0.08], [0, 1]);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const idx = Math.min(
      chapters.length - 1,
      Math.max(0, Math.floor(v * chapters.length))
    );
    setActive((prev) => (prev === idx ? prev : idx));
  });

  return (
    <section
      ref={containerRef}
      id="about"
      className="relative h-[320vh] border-t border-black/6"
      aria-label="About the laboratory"
    >
      <div className="lab-grain sticky top-0 h-screen overflow-hidden bg-[#fafaf8]">
        <div className="mx-auto grid h-full max-w-[1400px] grid-cols-1 gap-8 px-5 py-20 md:grid-cols-[0.95fr_1.05fr] md:items-center md:px-8 md:py-0">
          <motion.div
            style={{ opacity: introOpacity }}
            className="flex flex-col justify-center md:pr-6"
          >
            <p className="font-mono text-[12px] uppercase tracking-[0.22em] text-muted">
              What this is
            </p>
            <h2 className="mt-4 font-display text-[clamp(2.4rem,4.5vw,3.75rem)] leading-[0.94] tracking-[0.02em]">
              Independent digital laboratory
            </h2>
            <p className="mt-5 max-w-md text-[16px] leading-[1.65] text-ink/80">
              A place to publish ideas, build products, run experiments, release
              open-source software, and invite people to participate — without
              dressing it up as a corporation.
            </p>

            <div className="relative mt-10 min-h-[10.5rem]">
              {chapters.map((chapter, i) => (
                <motion.div
                  key={chapter.label}
                  className="absolute inset-x-0 top-0 max-w-md"
                  initial={false}
                  animate={{
                    opacity: active === i ? 1 : 0,
                    y: active === i ? 0 : 10,
                  }}
                  transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                  aria-hidden={active !== i}
                >
                  <p className="font-mono text-[11px] tracking-[0.2em] text-muted">
                    {chapter.label} · {chapter.tag}
                  </p>
                  <h3 className="mt-2 font-display text-[clamp(1.6rem,2.5vw,2.15rem)] leading-[0.95] tracking-[0.03em]">
                    {chapter.heading}
                  </h3>
                  <p className="mt-3 text-[14px] leading-relaxed text-ink/75">
                    {chapter.body}
                  </p>
                </motion.div>
              ))}
            </div>

            <p className="mt-6 font-mono text-[11px] text-muted md:mt-10">
              <span className="text-ink">{String(active + 1).padStart(2, "0")}</span>
              <span className="mx-2 opacity-40">/</span>
              <span>{String(chapters.length).padStart(2, "0")}</span>
            </p>
          </motion.div>

          <div
            className="relative flex min-h-[22rem] items-center justify-center md:min-h-0"
            style={{ perspective: "1400px" }}
          >
            <motion.div
              className="relative h-[min(68vh,500px)] w-full max-w-[500px]"
              style={{
                rotateX: deckRotateX,
                rotateY: deckRotateY,
                transformStyle: "preserve-3d",
              }}
            >
              {chapters.map((chapter, i) => (
                <ScrollPlane
                  key={chapter.label}
                  chapter={chapter}
                  index={i}
                  scrollYProgress={scrollYProgress}
                  spread={spread}
                />
              ))}
            </motion.div>

            <p
              aria-hidden
              className="pointer-events-none absolute -right-2 bottom-10 hidden font-display text-[clamp(4.5rem,12vw,8rem)] leading-none tracking-tight text-black/[0.035] md:block"
            >
              ZA
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function ScrollPlane({
  chapter,
  index,
  scrollYProgress,
  spread,
}: {
  chapter: Chapter;
  index: number;
  scrollYProgress: MotionValue<number>;
  spread: MotionValue<number>;
}) {
  const rotateY = useTransform(spread, (s) => (index - 2) * 30 * s);
  const z = useTransform(spread, (s) => index * -22 + s * (index * 48 + 110));
  const y = useTransform(spread, (s) => s * index * 16 - 28);
  const opacity = useTransform(scrollYProgress, (v) => {
    const center = (index + 0.5) / chapters.length;
    const d = Math.abs(v - center);
    return Math.max(0.4, 1 - d * 2.1);
  });

  return (
    <motion.article
      className={`absolute left-1/2 top-1/2 h-[64%] w-[74%] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[1.35rem] ${chapter.surface}`}
      style={{
        rotateY,
        z,
        y,
        opacity,
        transformStyle: "preserve-3d",
      }}
    >
      <PlaneMedia chapter={chapter} />
      <div className="relative z-10 p-5 md:p-6">
        <p className="font-mono text-[10px] tracking-[0.18em] opacity-65">
          {chapter.label} — {chapter.tag}
        </p>
        <p className="mt-2 font-display text-xl leading-none tracking-[0.04em] md:text-2xl">
          {chapter.heading.split(" ").slice(0, 5).join(" ")}
        </p>
      </div>
    </motion.article>
  );
}

function PlaneMedia({ chapter }: { chapter: Chapter }) {
  if (chapter.media === "image" && chapter.image) {
    return (
      <div className="absolute inset-0">
        <Image
          src={chapter.image}
          alt=""
          fill
          className="object-cover"
          sizes="(max-width: 768px) 90vw, 400px"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/25 to-ink/5" />
      </div>
    );
  }

  if (chapter.media === "video" && chapter.video) {
    return (
      <div className="absolute inset-0">
        <video
          className="h-full w-full object-cover"
          src={chapter.video}
          muted
          loop
          playsInline
          autoPlay
          preload="metadata"
          aria-hidden
        />
        <div className="absolute inset-0 bg-black/20" />
      </div>
    );
  }

  return (
    <div
      aria-hidden
      className="absolute inset-0 opacity-[0.06]"
      style={{
        backgroundImage:
          "repeating-linear-gradient(-12deg, #000 0, #000 1px, transparent 1px, transparent 10px)",
      }}
    />
  );
}

function LabStatic() {
  return (
    <section
      id="about"
      className="border-t border-black/6 bg-[#fafaf8] px-5 py-24 md:px-8"
    >
      <div className="mx-auto max-w-[1400px]">
        <p className="font-mono text-[12px] uppercase tracking-[0.22em] text-muted">
          What this is
        </p>
        <h2 className="mt-4 max-w-2xl font-display text-[clamp(2.5rem,5vw,4rem)] leading-[0.95] tracking-[0.02em]">
          An independent digital laboratory
        </h2>
        <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-ink/85">
          A place to publish ideas, build products, run experiments, release
          open-source software, and invite people to participate.
        </p>
        <ul className="mt-16 grid gap-6 md:grid-cols-2">
          {chapters.map((chapter) => (
            <li
              key={chapter.label}
              className={`rounded-[1.25rem] p-6 ${chapter.surface}`}
            >
              <p className="font-mono text-[11px] tracking-[0.2em] opacity-70">
                {chapter.label} · {chapter.tag}
              </p>
              <h3 className="mt-2 font-display text-3xl leading-none tracking-[0.03em]">
                {chapter.heading}
              </h3>
              <p className="mt-3 text-[14px] leading-relaxed opacity-85">
                {chapter.body}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
