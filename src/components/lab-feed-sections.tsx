"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { motion } from "motion/react";
import {
  labMilestones,
  labNewsPageSize,
  labUpdates,
  showLabEventsSection,
  type LabUpdate,
} from "@/data/lab-feed";

const ease = [0.77, 0, 0.175, 1] as const;

type LabFeedSectionsProps = {
  open: boolean;
};

export function LabFeedSections({ open }: LabFeedSectionsProps) {
  const items = useMemo(
    () =>
      [...labUpdates].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
      ),
    [],
  );

  const eventsEnabled = showLabEventsSection();

  return (
    <>
      <section
        id="lab-news"
        className="border-t border-black/6 bg-white"
        aria-labelledby="lab-news-heading"
      >
        <div className="mx-auto w-full max-w-[1400px] px-5 py-20 md:px-8 md:py-28">
          <SectionHeader
            open={open}
            label="Latest from the lab"
            title="Lab News"
            description="Recent ships, papers, and releases from the lab."
            titleId="lab-news-heading"
            delay={0.1}
          />

          <FadeUp open={open} className="mt-12 md:mt-14" delay={0.18}>
            <LabNewsList items={items} />
          </FadeUp>
        </div>
      </section>

      {eventsEnabled && (
        <section
          id="whats-next"
          className="border-t border-black/6 bg-cream"
          aria-labelledby="whats-next-heading"
        >
          <div className="mx-auto w-full max-w-[1400px] px-5 py-20 md:px-8 md:py-28">
            <SectionHeader
              open={open}
              label="What's next"
              title="Events Scheduled"
              description="The next milestones we are working toward in public."
              titleId="whats-next-heading"
              delay={0.08}
            />

            <div className="mt-10 grid gap-4 md:grid-cols-2 md:gap-5">
              {labMilestones.slice(0, 2).map((milestone, index) => (
                <FadeUp
                  key={milestone.id}
                  open={open}
                  delay={0.14 + index * 0.08}
                >
                  <MilestoneCard milestone={milestone} />
                </FadeUp>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

function LabNewsList({ items }: { items: LabUpdate[] }) {
  const [visibleCount, setVisibleCount] = useState(labNewsPageSize);
  const visible = items.slice(0, visibleCount);
  const hasMore = visibleCount < items.length;
  const remaining = items.length - visibleCount;
  const nextBatch = Math.min(labNewsPageSize, remaining);

  return (
    <div className="max-w-xl">
      <ul className="flex flex-col divide-y divide-black/6 border-y border-black/6">
        {visible.map((item) => (
          <li key={item.id}>
            <NewsRow item={item} />
          </li>
        ))}
      </ul>

      {hasMore && (
        <button
          type="button"
          className="mt-8 inline-flex h-11 items-center rounded-full bg-nav px-5 text-[14px] font-medium text-ink transition-colors hover:bg-[#ececec]"
          onClick={() => setVisibleCount((n) => n + labNewsPageSize)}
        >
          Read more
          <span className="ml-2 text-muted">
            ({nextBatch} more)
          </span>
        </button>
      )}
    </div>
  );
}

function SectionHeader({
  open,
  label,
  title,
  description,
  titleId,
  delay,
}: {
  open: boolean;
  label: string;
  title: string;
  description: string;
  titleId: string;
  delay: number;
}) {
  return (
    <motion.header
      initial={{ opacity: 0, y: 24 }}
      animate={open ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.75, delay, ease }}
      className="max-w-2xl"
    >
      <p className="text-[12px] font-medium tracking-[0.22em] uppercase text-muted">
        {label}
      </p>
      <h2
        id={titleId}
        className="mt-4 font-display text-[clamp(2.25rem,5vw,3.25rem)] leading-[0.92] tracking-[0.02em] text-ink"
      >
        {title}
      </h2>
      <p className="mt-5 text-[15px] leading-[1.75] text-muted md:text-base">
        {description}
      </p>
    </motion.header>
  );
}

function NewsRow({ item }: { item: LabUpdate }) {
  const dateLabel = formatNewsDate(item.date);
  const external = item.href?.startsWith("http");

  const inner = (
    <>
      <time
        dateTime={item.date}
        className="w-24 shrink-0 text-[12px] font-medium tabular-nums text-muted sm:w-28"
      >
        {dateLabel}
      </time>
      <div className="min-w-0 flex-1">
        <h3 className="text-[16px] font-semibold leading-snug tracking-tight text-ink group-hover:underline group-hover:underline-offset-4">
          {item.title}
        </h3>
        <p className="mt-1.5 text-[14px] leading-relaxed text-muted">
          {item.summary}
        </p>
      </div>
    </>
  );

  const rowClass =
    "group flex flex-col gap-2 py-5 first:pt-5 last:pb-5 sm:flex-row sm:gap-5 sm:py-6";

  if (!item.href) {
    return <article className={rowClass}>{inner}</article>;
  }

  if (external) {
    return (
      <a
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        className={rowClass}
      >
        {inner}
      </a>
    );
  }

  return (
    <Link href={item.href} className={rowClass}>
      {inner}
    </Link>
  );
}

function MilestoneCard({
  milestone,
}: {
  milestone: (typeof labMilestones)[number];
}) {
  const external = milestone.href?.startsWith("http");
  const cta = milestone.cta ?? "Learn more";

  return (
    <article className="flex h-full flex-col rounded-2xl border border-black/[0.06] bg-white p-5 shadow-[0_1px_2px_rgba(0,0,0,0.03)] md:p-6">
      <p className="text-[11px] font-medium tracking-[0.14em] uppercase text-muted">
        {milestone.when}
      </p>
      <h3 className="mt-2 font-display text-[clamp(1.25rem,2.2vw,1.5rem)] leading-none tracking-[0.03em] text-ink">
        {milestone.title}
      </h3>
      <p className="mt-2.5 line-clamp-3 flex-1 text-[13px] leading-relaxed text-muted">
        {milestone.summary}
      </p>
      {milestone.href &&
        (external ? (
          <a
            href={milestone.href}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex h-9 w-fit items-center rounded-full bg-nav px-4 text-[13px] font-medium text-ink transition-colors hover:bg-[#ececec]"
          >
            {cta}
          </a>
        ) : (
          <Link
            href={milestone.href}
            className="mt-4 inline-flex h-9 w-fit items-center rounded-full bg-nav px-4 text-[13px] font-medium text-ink transition-colors hover:bg-[#ececec]"
          >
            {cta}
          </Link>
        ))}
    </article>
  );
}

function formatNewsDate(iso: string) {
  const date = new Date(`${iso}T12:00:00`);
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function FadeUp({
  open,
  children,
  className,
  delay = 0,
}: {
  open: boolean;
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={open ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.65, delay, ease }}
    >
      {children}
    </motion.div>
  );
}
