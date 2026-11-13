"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Navbar } from "@/components/navbar";
import {
  type WritingEntry,
  type WritingKind,
  writingFilters,
  writingKindLabels,
  writings,
} from "@/data/writings";

const filterLabels: Record<(typeof writingFilters)[number], string> = {
  all: "All",
  ...writingKindLabels,
};

export function WritingPage() {
  const [active, setActive] = useState<(typeof writingFilters)[number]>("all");

  const visible = useMemo(() => {
    const published = writings.filter((w) => w.status !== "draft");
    if (active === "all") return published;
    return published.filter((w) => w.kind === active);
  }, [active]);

  const featured = visible.find((w) => w.featured);
  const grid = visible.filter((w) => w.id !== featured?.id);

  return (
    <>
      <Navbar visible />
      <main className="min-h-screen bg-white text-ink">
        <div className="mx-auto w-full max-w-[1400px] px-5 pb-24 pt-[6.5rem] md:px-8 md:pt-28">
          <header className="mb-12 max-w-3xl md:mb-14">
            <p className="text-[13px] font-medium text-muted">Lab output</p>
            <h1 className="mt-3 text-[clamp(2.25rem,5vw,3.25rem)] font-semibold leading-tight tracking-tight text-ink">
              Writing
            </h1>
            <p className="mt-5 text-[15px] leading-[1.75] text-muted md:text-base">
              Blogs, case studies, research articles, and publications from the
              lab.
            </p>
          </header>

          <div
            className="mb-10 flex flex-wrap gap-2"
            role="tablist"
            aria-label="Filter by type"
          >
            {writingFilters.map((filter) => {
              const selected = active === filter;
              return (
                <button
                  key={filter}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  className={`rounded-full px-4 py-2.5 text-[13px] font-medium transition-colors ${
                    selected
                      ? "bg-ink text-white"
                      : "bg-nav text-ink hover:bg-[#ececec]"
                  }`}
                  onClick={() => setActive(filter)}
                >
                  {filterLabels[filter]}
                </button>
              );
            })}
          </div>

          {visible.length === 0 ? (
            <EmptyState kind={active} />
          ) : (
            <div className="space-y-8">
              {featured && (
                <FeaturedCard
                  entry={featured}
                  show={active === "all" || active === featured.kind}
                />
              )}
              {grid.length > 0 && (
                <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {grid.map((entry) => (
                    <li key={entry.id}>
                      <WritingCard entry={entry} />
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}

          <footer className="mt-20 border-t border-black/6 pt-8">
            <Link
              href="/"
              className="text-[14px] font-medium text-muted transition-colors hover:text-ink"
            >
              ← Back to home
            </Link>
          </footer>
        </div>
      </main>
    </>
  );
}

function EmptyState({
  kind,
}: {
  kind: (typeof writingFilters)[number];
}) {
  const label =
    kind === "all" ? "pieces" : writingKindLabels[kind as WritingKind];
  return (
    <div className="rounded-[2rem] border border-dashed border-black/10 bg-cream px-8 py-14 text-center">
      <p className="text-xl font-semibold tracking-tight text-ink">
        Nothing here yet
      </p>
      <p className="mx-auto mt-3 max-w-md text-[14px] leading-relaxed text-muted">
        More {label.toLowerCase()} will be posted here as we publish from the
        lab.
      </p>
    </div>
  );
}

function FeaturedCard({
  entry,
  show,
}: {
  entry: WritingEntry;
  show: boolean;
}) {
  if (!show) return null;

  const pdfHref = entry.pdf ? encodeURI(entry.pdf) : undefined;

  return (
    <article
      id={entry.id}
      className="relative overflow-hidden rounded-[2rem] bg-ink text-white"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 -top-32 h-80 w-80 rounded-full border-[28px] border-lime/25"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-20 -left-16 h-56 w-56 rounded-full bg-lilac/20 blur-2xl"
      />
      <div className="relative grid gap-8 p-8 md:grid-cols-[1.2fr_0.8fr] md:p-10 lg:p-12">
        <div>
          <p className="text-[13px] text-white/65">
            Featured · {writingKindLabels[entry.kind]}
          </p>
          {entry.kicker && (
            <p className="mt-4 text-[14px] font-medium text-lime/95">
              {entry.kicker}
            </p>
          )}
          <h2
            className={`max-w-2xl text-[clamp(1.35rem,2.8vw,1.75rem)] font-medium leading-[1.35] tracking-tight text-white ${
              entry.kicker ? "mt-2" : "mt-4"
            }`}
          >
            {entry.title}
          </h2>
          <p className="mt-6 text-[13px] text-white/55">
            {formatDate(entry.date)}
          </p>
        </div>

        <div className="flex flex-col justify-end gap-4 md:items-end">
          
          {pdfHref && (
            <div className="flex w-full flex-wrap gap-3 md:justify-end">
              <a
                href={pdfHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-full bg-lime px-5 text-[14px] font-semibold text-ink transition-colors hover:bg-[#b8e85f] md:flex-none"
              >
                Read PDF
                <ArrowUpRight />
              </a>
              <a
                href={pdfHref}
                download
                className="inline-flex h-12 flex-1 items-center justify-center rounded-full border border-white/20 px-5 text-[14px] font-medium text-white transition-colors hover:bg-white/10 md:flex-none"
              >
                Download
              </a>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

function WritingCard({ entry }: { entry: WritingEntry }) {
  const href = entry.pdf
    ? encodeURI(entry.pdf)
    : entry.href;
  const isExternal = Boolean(entry.pdf || entry.href?.startsWith("http"));

  const inner = (
    <>
      <p className="text-[13px] text-muted">{writingKindLabels[entry.kind]}</p>
      {entry.kicker && (
        <p className="mt-2 text-[13px] font-medium text-ink/75">{entry.kicker}</p>
      )}
      <h3
        className={`text-[1.05rem] font-medium leading-[1.4] tracking-tight text-ink sm:text-[1.125rem] ${
          entry.kicker ? "mt-1.5" : "mt-3"
        }`}
      >
        {entry.title}
      </h3>
      {entry.summary && (
        <p className="mt-3 line-clamp-3 text-[14px] leading-relaxed text-muted">
          {entry.summary}
        </p>
      )}
      <div
        className={`flex items-center justify-between gap-3 border-t border-black/6 pt-4 ${
          entry.summary ? "mt-6" : "mt-8"
        }`}
      >
        <time className="text-[13px] text-muted" dateTime={entry.date}>
          {formatDate(entry.date)}
        </time>
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-nav text-ink">
          <ArrowRight />
        </span>
      </div>
    </>
  );

  const className =
    "flex h-full flex-col rounded-[1.5rem] border border-black/[0.06] bg-white p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition-[box-shadow,transform] hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)]";

  if (!href) {
    return <article className={className}>{inner}</article>;
  }

  if (isExternal) {
    return (
      <a
        href={href}
        className={className}
        target="_blank"
        rel="noopener noreferrer"
      >
        {inner}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {inner}
    </Link>
  );
}

function formatDate(iso: string) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function PdfGlyph() {
  return (
    <span
      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-lime text-ink"
      aria-hidden
    >
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path
          d="M8 4h8l4 4v12a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path d="M14 4v4h4M8 13h8M8 17h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    </span>
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
