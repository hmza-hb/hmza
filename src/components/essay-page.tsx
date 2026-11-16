"use client";

import { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import type { EssayBlock, EssayDoc, EssaySeo } from "@/data/essays/types";

type EssayPageProps = {
  doc: EssayDoc;
  seo: EssaySeo;
  body: EssayBlock[];
  kickerLine: string;
  faqHeading: string;
  pdfLabel: string;
};

export function EssayPage({
  doc,
  seo,
  body,
  kickerLine,
  faqHeading,
  pdfLabel,
}: EssayPageProps) {
  const pdfHref = encodeURI(doc.pdf);
  const [shareLabel, setShareLabel] = useState("Share");
  const groups = groupEssayBlocks(body);
  const hasMarginNotes = groups.some((group) => group.notes.length > 0);

  async function share() {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({
          title: doc.title,
          text: doc.subtitle,
          url,
        });
        return;
      }
    } catch {
      return;
    }

    try {
      await navigator.clipboard.writeText(url);
      setShareLabel("Link copied");
      window.setTimeout(() => setShareLabel("Share"), 2000);
    } catch {
      setShareLabel("Share");
    }
  }

  return (
    <>
      <Navbar visible />
      <main className="min-h-screen bg-white text-ink">
        <article
          className={`mx-auto w-full px-5 pb-24 pt-[6.5rem] md:px-8 md:pt-28 ${
            hasMarginNotes ? "max-w-[720px] lg:max-w-[1080px]" : "max-w-[720px]"
          }`}
          itemScope
          itemType="https://schema.org/BlogPosting"
        >
          <div className="max-w-[720px]">
            <p className="text-[12px] font-medium tracking-[0.22em] uppercase text-muted">
              {kickerLine}
            </p>
            <h1
              id="essay-title"
              itemProp="headline"
              className="mt-3 font-display text-[clamp(2.5rem,6vw,3.75rem)] leading-[0.92] tracking-[0.02em]"
            >
              {doc.title}
            </h1>
            <p
              id="essay-subtitle"
              itemProp="alternativeHeadline"
              className="mt-4 text-[17px] leading-snug text-muted"
            >
              {doc.subtitle}
            </p>
            <p
              id="essay-abstract"
              className="mt-4 text-[15px] leading-[1.7] text-ink/80"
            >
              {seo.description}
            </p>
            <p className="mt-5 text-[14px] text-ink/80" itemProp="author">
              {doc.byline}
            </p>
            <time
              dateTime={doc.date}
              itemProp="datePublished"
              className="mt-2 block text-[13px] text-muted"
            >
              {formatDate(doc.date)}
            </time>
            <ul className="mt-6 flex flex-wrap gap-2">
              {seo.topics.map((topic) => (
                <li
                  key={topic}
                  className="rounded-full bg-nav px-3 py-1.5 text-[12px] font-medium text-ink"
                >
                  {topic}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={pdfHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 items-center rounded-full bg-ink px-5 text-[14px] font-medium text-white transition-colors hover:bg-neutral-800"
              >
                Read PDF
              </a>
              <a
                href={pdfHref}
                download={pdfLabel}
                className="inline-flex h-11 items-center rounded-full bg-nav px-5 text-[14px] font-medium text-ink transition-colors hover:bg-[#ececec]"
              >
                Download PDF
              </a>
              <button
                type="button"
                onClick={share}
                className="inline-flex h-11 items-center rounded-full bg-nav px-5 text-[14px] font-medium text-ink transition-colors hover:bg-[#ececec]"
              >
                {shareLabel}
              </button>
            </div>
          </div>

          <div
            className="mt-12 space-y-5 border-t border-black/6 pt-10"
            itemProp="articleBody"
          >
            {groups.map((group, index) => (
              <EssayBlockGroup
                key={index}
                group={group}
                withMargin={hasMarginNotes}
              />
            ))}
          </div>

          <section
            className="mt-16 max-w-[720px] border-t border-black/6 pt-10"
            aria-labelledby="essay-faq"
          >
            <h2
              id="essay-faq"
              className="font-display text-[clamp(1.5rem,3vw,1.85rem)] leading-none tracking-[0.02em]"
            >
              {faqHeading}
            </h2>
            <dl className="mt-8 space-y-8">
              {seo.faqs.map((faq) => (
                <div key={faq.question}>
                  <dt className="text-[16px] font-semibold tracking-tight text-ink">
                    {faq.question}
                  </dt>
                  <dd className="mt-2 text-[15px] leading-[1.75] text-muted">
                    {faq.answer}
                  </dd>
                </div>
              ))}
            </dl>
          </section>

          <footer className="mt-16 max-w-[720px] border-t border-black/6 pt-8">
            <Link
              href="/writing"
              className="text-[14px] font-medium text-muted transition-colors hover:text-ink"
            >
              ← Back to writing
            </Link>
          </footer>
        </article>
      </main>
    </>
  );
}

type EssayGroup = {
  main: EssayBlock[];
  notes: EssayBlock[];
};

function isHeading(block: EssayBlock) {
  return block.type === "h2" || block.type === "h3";
}

function groupEssayBlocks(blocks: EssayBlock[]): EssayGroup[] {
  const groups: EssayGroup[] = [];
  const heldNotes: EssayBlock[] = [];

  for (const block of blocks) {
    if (block.type === "aside") {
      const last = groups[groups.length - 1];
      if (!last) {
        groups.push({ main: [], notes: [block] });
      } else if (last.main.some(isHeading) && last.main.every(isHeading)) {
        heldNotes.push(block);
      } else {
        last.notes.push(block);
      }
      continue;
    }

    groups.push({ main: [block], notes: heldNotes.splice(0) });
  }

  if (heldNotes.length > 0) {
    if (groups.length === 0) {
      groups.push({ main: [], notes: heldNotes });
    } else {
      groups[groups.length - 1].notes.push(...heldNotes);
    }
  }

  return groups;
}

function EssayBlockGroup({
  group,
  withMargin,
}: {
  group: EssayGroup;
  withMargin: boolean;
}) {
  if (!withMargin) {
    return (
      <>
        {group.main.map((block, index) => (
          <EssayBlockView key={index} block={block} />
        ))}
      </>
    );
  }

  return (
    <div className="grid items-start gap-3 lg:grid-cols-[minmax(0,720px)_15.5rem] lg:gap-x-10">
      <div className="space-y-5">
        {group.main.map((block, index) => (
          <EssayBlockView key={index} block={block} />
        ))}
      </div>
      {group.notes.length > 0 ? (
        <div className="space-y-3 lg:pt-1">
          {group.notes.map((block, index) => (
            <EssayBlockView key={index} block={block} />
          ))}
        </div>
      ) : (
        <div className="hidden lg:block" aria-hidden />
      )}
    </div>
  );
}

function EssayBlockView({ block }: { block: EssayBlock }) {
  switch (block.type) {
    case "h2":
      return (
        <h2 className="pt-4 font-display text-[clamp(1.5rem,3vw,1.85rem)] leading-none tracking-[0.02em] text-ink">
          {block.text}
        </h2>
      );
    case "h3":
      return (
        <h3 className="pt-2 text-[18px] font-semibold tracking-tight text-ink">
          {block.text}
        </h3>
      );
    case "quote":
      return (
        <figure>
          <blockquote className="pl-4 text-[18px] font-medium leading-relaxed text-ink">
            {block.text}
          </blockquote>
          {block.attribution ? (
            <figcaption className="mt-2 pl-4 text-[14px] text-muted">
              {block.attribution}
            </figcaption>
          ) : null}
        </figure>
      );
    case "ul":
      return (
        <ul className="list-disc space-y-2 pl-6 text-[16px] leading-[1.8] text-ink/90 md:text-[17px]">
          {block.items.map((item) => (
            <li key={item.slice(0, 48)}>{item}</li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol
          start={block.start ?? 1}
          className="list-decimal space-y-3 pl-6 text-[16px] leading-[1.8] text-ink/90 md:text-[17px]"
        >
          {block.items.map((item) => (
            <li key={item.slice(0, 48)}>{item}</li>
          ))}
        </ol>
      );
    case "aside":
      return (
        <aside className="rounded-2xl bg-nav px-4 py-3 text-[12.5px] leading-[1.65] text-muted">
          {block.text}
        </aside>
      );
    case "facts":
      return (
        <dl className="grid gap-x-6 gap-y-3 sm:grid-cols-[10rem_1fr]">
          {block.items.map((item) => (
            <div key={item.label} className="contents">
              <dt className="text-[13px] font-medium text-muted">{item.label}</dt>
              <dd className="text-[15px] leading-relaxed text-ink/90">
                {item.value}
              </dd>
            </div>
          ))}
        </dl>
      );
    case "table":
      return (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-[14px] leading-relaxed">
            <thead>
              <tr>
                {block.headers.map((header) => (
                  <th
                    key={header}
                    className="border-b border-black/10 pb-3 pr-4 text-[13px] font-medium text-muted"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row) => (
                <tr key={row[0]}>
                  {row.map((cell, cellIndex) => (
                    <td
                      key={`${row[0]}-${cellIndex}`}
                      className="border-b border-black/6 py-3 pr-4 align-top text-ink/90"
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    default:
      return (
        <p className="text-[16px] leading-[1.8] text-ink/90 md:text-[17px]">
          {block.text}
        </p>
      );
  }
}

function formatDate(iso: string) {
  const d = new Date(`${iso}T12:00:00`);
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
