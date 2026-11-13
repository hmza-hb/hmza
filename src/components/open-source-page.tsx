"use client";

import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { GitHubContributionGraph } from "@/components/github-contribution-graph";
import {
  GITHUB_USERNAME,
  githubProfileUrl,
  githubStreakImageUrl,
  openSourceIntro,
  ossContributions,
  selectedProjects,
  type ProjectLink,
} from "@/data/open-source";

const linkClass =
  "text-[#1a5fb4] font-medium hover:underline underline-offset-2";

export function OpenSourcePage() {
  return (
    <>
      <Navbar visible />
      <main className="min-h-screen bg-white text-ink">
        <div className="mx-auto w-full max-w-[840px] px-5 pb-20 pt-[6.5rem] md:px-8 md:pt-28">
          <header className="mb-14 border-b border-black/[0.08] pb-12">
            <div className="grid items-start gap-10 sm:grid-cols-[minmax(200px,260px)_1fr] sm:gap-12">
              <figure className="relative aspect-square w-full max-w-[260px] overflow-hidden rounded-2xl border border-black/[0.08] bg-[#f4f4f0]">
                <Image
                  src="/images/oss.jpeg"
                  alt=""
                  width={520}
                  height={520}
                  className="h-full w-full object-cover"
                  sizes="260px"
                  priority
                />
              </figure>

              <div className="min-w-0">
                <h1 className="font-display text-[clamp(2rem,5vw,2.75rem)] leading-none tracking-[0.02em]">
                  Open source
                </h1>
                <p className="mt-4 text-[17px] font-semibold text-ink">
                  Hamza Hafeez
                </p>
                <a
                  href={githubProfileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://img.shields.io/github/stars/hmza-hb?style=flat&logo=github&label=Stars&color=111111&labelColor=f3f3f3"
                    alt="GitHub stars"
                    height={22}
                  />
                </a>
                <p className="mt-5 text-[16px] leading-[1.75] text-muted">
                  {openSourceIntro}
                </p>
                <a
                  href={githubProfileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-block text-[15px] text-[#1a5fb4] hover:underline"
                >
                  github.com/{GITHUB_USERNAME}
                </a>
              </div>
            </div>
          </header>

          <section className="mb-12">
            <h2 className="text-[13px] font-semibold uppercase tracking-[0.12em] text-muted">
              Selected work
            </h2>
            <ul className="mt-6 list-none space-y-6 text-[15px] leading-[1.8] text-muted">
              {selectedProjects.map((project) => (
                <li key={project.id} id={project.id}>
                  <span className="font-semibold text-ink">{project.name}:</span>{" "}
                  {project.description}{" "}
                  <InlineLinks links={project.links} />
                </li>
              ))}
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-[13px] font-semibold uppercase tracking-[0.12em] text-muted">
              Open source
            </h2>
            <ul className="mt-6 list-none space-y-4 text-[15px] leading-[1.75] text-muted">
              {ossContributions.map((item) => (
                <li key={item.id}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={linkClass}
                  >
                    {item.label}
                  </a>
                  {": "}
                  {item.summary}
                </li>
              ))}
            </ul>
          </section>

          <section id="github" className="border-t border-black/[0.08] pt-10">
            <h2 className="font-display text-[clamp(1.5rem,3vw,1.875rem)] leading-none tracking-[0.02em]">
              GitHub
            </h2>
            <p className="mt-2 text-[14px] text-muted">
              Streak and contribution activity on{" "}
              <a
                href={githubProfileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={linkClass}
              >
                github.com/{GITHUB_USERNAME}
              </a>
            </p>

            <div className="mt-8 space-y-8">
              <a
                href={githubProfileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={githubStreakImageUrl}
                  alt={`GitHub streak for ${GITHUB_USERNAME}`}
                  className="h-auto w-full max-w-[420px]"
                  loading="lazy"
                />
              </a>
              <GitHubContributionGraph />
            </div>
          </section>

          <footer className="mt-16 pt-8">
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

function InlineLinks({ links }: { links: ProjectLink[] }) {
  return (
    <span className="whitespace-normal">
      {links.map((link, index) => (
        <span key={link.href + link.label}>
          {index > 0 && (
            <span className="text-muted" aria-hidden>
              {" · "}
            </span>
          )}
          <RepoLink link={link} />
        </span>
      ))}
    </span>
  );
}

function RepoLink({ link }: { link: ProjectLink }) {
  const external = link.external ?? link.href.startsWith("http");

  if (external) {
    return (
      <a
        href={link.href}
        target="_blank"
        rel="noopener noreferrer"
        className={linkClass}
      >
        {link.label}
      </a>
    );
  }

  return (
    <Link href={link.href} className={linkClass}>
      {link.label}
    </Link>
  );
}
