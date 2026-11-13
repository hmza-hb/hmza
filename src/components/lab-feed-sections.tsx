"use client";

import type { FormEvent, ReactNode } from "react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { motion } from "motion/react";
import {
  labMilestones,
  labNewsPageSize,
  labUpdates,
  newsletterCopy,
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

      <NewsletterSection open={open} />
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

function NewsletterSection({ open }: { open: boolean }) {
  return (
    <section
      id="newsletter"
      className="border-t border-black/6 bg-ink text-white"
      aria-labelledby="newsletter-heading"
    >
      <div className="mx-auto w-full max-w-[1400px] px-5 py-20 md:px-8 md:py-28">
        <div className="grid gap-12 lg:grid-cols-[1fr_minmax(280px,440px)] lg:items-end lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={open ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            transition={{ duration: 0.75, delay: 0.1, ease }}
          >
            <p className="text-[12px] font-medium tracking-[0.22em] uppercase text-white/60">
              {newsletterCopy.kicker}
            </p>
            <h2
              id="newsletter-heading"
              className="mt-4 font-display text-[clamp(2.25rem,5vw,3.25rem)] leading-[0.92] tracking-[0.02em]"
            >
              {newsletterCopy.title}
            </h2>
            <p className="mt-5 max-w-lg text-[15px] leading-[1.75] text-white/70">
              {newsletterCopy.description}
            </p>
          </motion.div>

          <FadeUp open={open} delay={0.2}>
            <NewsletterForm />
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

type FormStatus = "idle" | "loading" | "done" | "error" | "config";

function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorDetail, setErrorDetail] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = email.trim();
    if (!trimmed || !trimmed.includes("@")) {
      setStatus("error");
      setErrorDetail("Enter a valid email.");
      return;
    }

    setStatus("loading");
    setErrorDetail(null);

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmed }),
      });

      const data = (await response.json().catch(() => ({}))) as {
        error?: string;
      };

      if (response.ok) {
        setStatus("done");
        setEmail("");
        return;
      }

      if (response.status === 503 && data.error === "not_configured") {
        setStatus("config");
        setErrorDetail(newsletterCopy.configMessage);
        return;
      }

      setStatus("error");
      setErrorDetail(newsletterCopy.errorMessage);
    } catch {
      setStatus("error");
      setErrorDetail(newsletterCopy.errorMessage);
    }
  }

  if (status === "done") {
    return (
      <p className="rounded-[1.25rem] border border-white/15 bg-white/10 px-6 py-5 text-[15px] leading-relaxed text-white/90">
        {newsletterCopy.successMessage}
      </p>
    );
  }

  const isLoading = status === "loading";

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-[1.5rem] border border-white/12 bg-white/5 p-6 md:p-7"
      noValidate
    >
      <label htmlFor="newsletter-email" className="sr-only">
        Email address
      </label>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-stretch">
        <input
          id="newsletter-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          disabled={isLoading}
          placeholder="you@domain.com"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
            if (status === "error" || status === "config") {
              setStatus("idle");
              setErrorDetail(null);
            }
          }}
          className="h-12 min-w-0 flex-1 rounded-full border border-white/15 bg-white px-5 text-[15px] text-ink outline-none transition-shadow placeholder:text-muted focus:border-lime focus:ring-2 focus:ring-lime/40 disabled:opacity-70"
        />
        <button
          type="submit"
          disabled={isLoading}
          className="h-12 shrink-0 rounded-full bg-lime px-6 text-[14px] font-semibold text-ink transition-colors hover:bg-[#b8e85f] disabled:cursor-wait disabled:opacity-80"
        >
          {isLoading ? "Subscribing…" : "Subscribe"}
        </button>
      </div>
      {errorDetail && (
        <p
          className={`mt-3 text-[13px] leading-relaxed ${
            status === "config" ? "text-white/65" : "text-white/85"
          }`}
        >
          {errorDetail}
        </p>
      )}
    </form>
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
