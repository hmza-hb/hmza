"use client";

import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/navbar";

const sections = [
  {
    title: "Who am I",
    paragraphs: [
      `I am a builder, I build software and sometimes hardware as well, I'm 20, living in Lahore Pakistan currently, and I have 2 beliefs; technology could change my life, i can change my life with technology, say this or that, I love spending time in tinkering something technical..`,
    ],
  },
  {
    title: "What I have done in the past",
    paragraphs: [
      `I have designed, developed, maintained, contributed to, survived, secured, and scaled some large scale, distributed microservices, event driven, complex backend engines, packages, platforms, and OSS contributions.`,
      `I also run a software development studio with some other engineers (friends), providing engineering services to startups and SMEs remotely. I've also founded two SaaS products and grown them to over thousands of users, all while researching and publishing work on cognitive architectures for the next generation of intelligence.`,
      `As a hobby, I am also developing a social companion robot as a passion project, and I sketch and draw manga when I'm bored.`,
    ],
  },
  {
    title: "What is the purpose/goal of this website",
    paragraphs: [
      `it is my independent home lab, the reason for its existence is a place where i specifically with my friends and lab partners would publish ideas, do research, build products, run experiments, release case studies, articles, Open source software and would also create a network of people by invite only and membership only (free, based on grit and enthusiasm, we dont hire or pay anyone, so your joining would count if you feel it cool and want to build with us) to participate and work together...`,
    ],
  },
] as const;

export function ProfilePage() {
  return (
    <>
      <Navbar visible />
      <main className="min-h-screen bg-white text-ink">
        <article className="mx-auto w-full max-w-[1400px] px-5 pb-24 pt-[6.5rem] md:px-8 md:pt-28">
          <header className="mb-12 md:mb-16">
            <p className="text-[12px] font-medium tracking-[0.22em] uppercase text-muted">
              Profile
            </p>
            <h1 className="mt-3 font-display text-[clamp(2.5rem,5vw,3.5rem)] leading-none tracking-[0.02em]">
              Hamza Hafeez
            </h1>
            <p className="mt-3 max-w-xl text-[15px] text-muted">
              This Is Hamza Hafeez
            </p>
          </header>

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(260px,300px)_1fr] lg:gap-16 xl:gap-20">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <ProfilePhoto />
            </div>

            <div className="min-w-0 max-w-2xl space-y-14 lg:max-w-[40rem]">
              {sections.map((section) => (
                <section key={section.title}>
                  <h2 className="text-[13px] font-semibold tracking-[0.12em] uppercase text-ink">
                    {section.title}
                  </h2>
                  <div className="mt-5 space-y-5">
                    {section.paragraphs.map((paragraph) => (
                      <p
                        key={paragraph.slice(0, 48)}
                        className="text-[16px] leading-[1.75] text-ink/90 md:text-[17px] md:leading-[1.8]"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </div>

          <footer className="mt-20 border-t border-black/6 pt-8">
            <Link
              href="/"
              className="text-[14px] font-medium text-muted transition-colors hover:text-ink"
            >
              ← Back to home
            </Link>
          </footer>
        </article>
      </main>
    </>
  );
}

function ProfilePhoto() {
  return (
    <figure className="overflow-hidden rounded-[1.25rem] bg-[#f3f3f3]">
      <Image
        src="/images/hamza.jpeg"
        alt="Hamza Hafeez"
        width={1097}
        height={1026}
        sizes="(max-width: 1024px) min(100vw - 40px, 420px), 300px"
        priority
        className="h-auto w-full object-cover"
      />
    </figure>
  );
}
