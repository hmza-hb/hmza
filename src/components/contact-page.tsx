"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import {
  CONTACT_EMAIL,
  contactChannels,
  contactIntro,
} from "@/data/contact";

const mailto = `mailto:${CONTACT_EMAIL}`;

export function ContactPage() {
  return (
    <>
      <Navbar visible />
      <main className="relative min-h-screen overflow-hidden bg-white text-ink">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-[480px] bg-[radial-gradient(70%_70%_at_15%_0%,rgba(198,238,106,0.14),transparent_55%),radial-gradient(50%_55%_at_95%_5%,rgba(231,210,246,0.16),transparent_50%)]"
        />

        <div className="relative mx-auto w-full max-w-[1400px] px-5 pb-24 pt-[6.5rem] md:px-8 md:pt-28">
          <header className="mb-12 max-w-2xl md:mb-16">
            <p className="text-[12px] font-medium tracking-[0.22em] uppercase text-muted">
              Reach the lab
            </p>
            <h1 className="mt-3 font-display text-[clamp(2.75rem,6vw,4rem)] leading-[0.92] tracking-[0.03em]">
              Contact
            </h1>
            <p className="mt-5 text-[16px] leading-[1.75] text-muted md:text-[17px]">
              {contactIntro}
            </p>
          </header>

          <ContactHeroGrid>
            <EmailCard>
              <div className="relative z-[1]">
                <p className="text-[13px] font-medium text-muted">
                  Email · preferred
                </p>
                <a
                  href={mailto}
                  className="mt-4 block text-[clamp(1.5rem,3.5vw,2.25rem)] font-normal leading-snug tracking-tight text-ink transition-opacity hover:opacity-80"
                >
                  {CONTACT_EMAIL}
                </a>
                <p className="mt-5 max-w-md text-[15px] leading-relaxed text-muted">
                  Attachments, timelines, and anything that needs a thread.
                  This inbox is monitored by the lab.
                </p>
                <a
                  href={mailto}
                  className="mt-8 inline-flex h-11 items-center rounded-full bg-ink px-5 text-[14px] font-medium text-white transition-colors hover:bg-neutral-800"
                >
                  Write an email
                </a>
              </div>
              <span
                aria-hidden
                className="pointer-events-none absolute -right-6 -top-10 h-28 w-28 rounded-full border-[12px] border-lime/35"
              />
            </EmailCard>

            <AsideCard>
              <p className="text-[13px] font-semibold tracking-[0.12em] uppercase text-ink">
                Response
              </p>
              <p className="mt-4 text-[15px] leading-[1.7] text-muted">
                We read everything. If it is a fit for the lab or a build you
                care about, you will hear back, usually within a few days.
              </p>
              <Link
                href="/"
                className="mt-6 inline-block text-[14px] font-medium text-ink underline-offset-4 hover:underline"
              >
                Back to the home lab →
              </Link>
            </AsideCard>
          </ContactHeroGrid>

          <section className="mt-10 md:mt-14">
            <div className="flex flex-col gap-2 border-b border-black/6 pb-4 sm:flex-row sm:items-end sm:justify-between">
              <h2 className="font-display text-[clamp(1.75rem,3vw,2.25rem)] leading-none tracking-[0.03em]">
                Social DMs
              </h2>
              <p className="text-[13px] text-muted">
                Same person, lighter-weight messages
              </p>
            </div>

            <ul className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-5">
              {contactChannels.map((channel, index) => (
                <li key={channel.id}>
                  <SocialCard channel={channel} accent={index} />
                </li>
              ))}
            </ul>
          </section>

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

function ContactHeroGrid({ children }: { children: ReactNode }) {
  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1.35fr_0.65fr] lg:gap-6">
      {children}
    </div>
  );
}

function EmailCard({ children }: { children: ReactNode }) {
  return (
    <article className="relative overflow-hidden rounded-[2rem] border border-black/[0.06] bg-cream p-8 shadow-[0_1px_2px_rgba(0,0,0,0.04)] md:p-10">
      {children}
    </article>
  );
}

function AsideCard({ children }: { children: ReactNode }) {
  return (
    <aside className="flex flex-col justify-center rounded-[2rem] border border-black/[0.06] bg-white p-8 md:p-10">
      {children}
    </aside>
  );
}

const surfaces = ["bg-white", "bg-lilac/25", "bg-lime/20"] as const;

function SocialCard({
  channel,
  accent,
}: {
  channel: (typeof contactChannels)[number];
  accent: number;
}) {
  return (
    <a
      href={channel.href}
      target="_blank"
      rel="noopener noreferrer"
      className={`group flex h-full flex-col rounded-[1.75rem] border border-black/[0.06] p-6 transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_40px_rgba(0,0,0,0.07)] md:p-7 ${surfaces[accent % surfaces.length]}`}
    >
      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-nav text-ink transition-colors group-hover:bg-white">
        <ChannelIcon id={channel.id} />
      </span>
      <h3 className="mt-5 text-[17px] font-semibold tracking-tight text-ink">
        {channel.label}
      </h3>
      <p className="mt-1 text-[14px] font-medium text-ink/80">{channel.handle}</p>
      <p className="mt-3 flex-1 text-[14px] leading-relaxed text-muted">
        {channel.hint}
      </p>
      <span className="mt-5 inline-flex items-center gap-2 text-[13px] font-medium text-ink">
        Open profile
        <ArrowIcon />
      </span>
    </a>
  );
}

function ChannelIcon({ id }: { id: string }) {
  switch (id) {
    case "instagram":
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
          <rect
            x="3"
            y="3"
            width="18"
            height="18"
            rx="5"
            stroke="currentColor"
            strokeWidth="1.75"
          />
          <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.75" />
          <circle cx="17.5" cy="6.5" r="1.25" fill="currentColor" />
        </svg>
      );
    case "x":
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      );
    case "linkedin":
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      );
    default:
      return null;
  }
}

function ArrowIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
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
