"use client";

import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { publications, scholarProfile } from "@/data/research";

export function ResearchPage() {
  return (
    <>
      <Navbar visible />
      <main className="min-h-screen bg-white text-ink">
        <div className="mx-auto w-full max-w-[1400px] px-5 pb-24 pt-[6.5rem] md:px-8 md:pt-28">
          <header className="mb-12 max-w-3xl md:mb-14">
            <p className="text-[13px] font-medium text-muted">Lab output</p>
            <h1 className="mt-3 text-[clamp(2.25rem,5vw,3.25rem)] font-semibold leading-tight tracking-tight text-ink">
              Research
            </h1>
            <p className="mt-5 text-[15px] leading-[1.75] text-muted md:text-base">
              {scholarProfile.name} · {scholarProfile.affiliation}
            </p>
            <p className="mt-3 text-[15px] leading-relaxed text-muted">
              <span className="text-ink">Interests: </span>
              {scholarProfile.interests.join(", ")}
            </p>
          </header>

          <ul className="flex flex-col gap-6">
            {publications.map((pub) => (
              <li key={pub.id}>
                <PublicationCard pub={pub} />
              </li>
            ))}
          </ul>

          {publications.length === 0 && (
            <div className="rounded-[2rem] border border-dashed border-black/10 bg-cream px-8 py-14 text-center">
              <p className="text-xl font-semibold tracking-tight text-ink">
                Nothing here yet
              </p>
              <p className="mx-auto mt-3 max-w-md text-[14px] leading-relaxed text-muted">
                Research articles will be posted here as we publish from the lab.
              </p>
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

function PublicationCard({ pub }: { pub: (typeof publications)[number] }) {
  const pdfHref = encodeURI(pub.pdf);
  const dateLabel = pub.month
    ? `${pub.month} ${pub.year}`
    : String(pub.year);

  return (
    <article
      id={pub.id}
      className="overflow-hidden rounded-[2rem] border border-black/[0.06] bg-white p-8 shadow-[0_1px_2px_rgba(0,0,0,0.04)] md:p-10"
    >
      <p className="text-[13px] text-muted">Research · {pub.venue}</p>
      {pub.subtitle && (
        <p className="mt-2 text-[14px] font-medium text-ink/80">{pub.subtitle}</p>
      )}
      <h2 className="mt-3 max-w-3xl text-[clamp(1.2rem,2.5vw,1.55rem)] font-medium leading-[1.35] tracking-tight text-ink">
        <a
          href={pdfHref}
          target="_blank"
          rel="noopener noreferrer"
          className="transition-colors hover:text-muted"
        >
          {pub.title}
        </a>
      </h2>
      <p className="mt-4 text-[14px] text-muted">{pub.authors}</p>
      <p className="mt-1 text-[13px] text-muted">{dateLabel}</p>

      <div className="mt-8 flex flex-wrap gap-3">
        <a
          href={pdfHref}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-11 items-center gap-2 rounded-full bg-ink px-5 text-[14px] font-medium text-white transition-colors hover:bg-neutral-800"
        >
          Read PDF
          <ArrowUpRight />
        </a>
        <a
          href={pdfHref}
          download
          className="inline-flex h-11 items-center rounded-full bg-nav px-5 text-[14px] font-medium text-ink transition-colors hover:bg-[#ececec]"
        >
          Download
        </a>
      </div>
    </article>
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
