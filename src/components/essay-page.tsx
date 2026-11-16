"use client";

import Link from "next/link";
import { Navbar } from "@/components/navbar";
import {
  tastySoftware,
  tastySoftwareBody,
  tastySoftwareSeo,
  type EssayBlock,
} from "@/data/essays/tasty-software";

export function EssayPage() {
  const pdfHref = encodeURI(tastySoftware.pdf);

  return (
    <>
      <Navbar visible />
      <main className="min-h-screen bg-white text-ink">
        <article
          className="mx-auto w-full max-w-[720px] px-5 pb-24 pt-[6.5rem] md:px-8 md:pt-28"
          itemScope
          itemType="https://schema.org/BlogPosting"
        >
          <p className="text-[12px] font-medium tracking-[0.22em] uppercase text-muted">
            Essay · taste in software · future of coding
          </p>
          <h1
            id="essay-title"
            itemProp="headline"
            className="mt-3 font-display text-[clamp(2.5rem,6vw,3.75rem)] leading-[0.92] tracking-[0.02em]"
          >
            {tastySoftware.title}
          </h1>
          <p
            id="essay-subtitle"
            itemProp="alternativeHeadline"
            className="mt-4 text-[17px] leading-snug text-muted"
          >
            {tastySoftware.subtitle}
          </p>
          <p
            id="essay-abstract"
            className="mt-4 text-[15px] leading-[1.7] text-ink/80"
          >
            {tastySoftwareSeo.description}
          </p>
          <p className="mt-5 text-[14px] text-ink/80" itemProp="author">
            {tastySoftware.byline}
          </p>
          <time
            dateTime={tastySoftware.date}
            itemProp="datePublished"
            className="mt-2 block text-[13px] text-muted"
          >
            {formatDate(tastySoftware.date)}
          </time>
          <ul className="mt-6 flex flex-wrap gap-2">
            {tastySoftwareSeo.topics.map((topic) => (
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
              download
              className="inline-flex h-11 items-center rounded-full bg-nav px-5 text-[14px] font-medium text-ink transition-colors hover:bg-[#ececec]"
            >
              Download PDF
            </a>
          </div>

          <div
            className="mt-12 space-y-5 border-t border-black/6 pt-10"
            itemProp="articleBody"
          >
            {tastySoftwareBody.map((block, index) => (
              <EssayBlockView key={index} block={block} />
            ))}
          </div>

          <section className="mt-16 border-t border-black/6 pt-10" aria-labelledby="essay-faq">
            <h2
              id="essay-faq"
              className="font-display text-[clamp(1.5rem,3vw,1.85rem)] leading-none tracking-[0.02em]"
            >
              Questions this essay answers
            </h2>
            <dl className="mt-8 space-y-8">
              {tastySoftwareSeo.faqs.map((faq) => (
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

          <footer className="mt-16 border-t border-black/6 pt-8">
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

function EssayBlockView({ block }: { block: EssayBlock }) {
  switch (block.type) {
    case "h2":
      return (
        <h2 className="pt-4 font-display text-[clamp(1.5rem,3vw,1.85rem)] leading-none tracking-[0.02em] text-ink">
          {block.text}
        </h2>
      );
    case "quote":
      return (
        <p className="pl-4 text-[18px] font-medium leading-relaxed text-ink">
          {block.text}
        </p>
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
