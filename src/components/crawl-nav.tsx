import Link from "next/link";
import { sitePages } from "@/data/site-seo";

/** Plain HTML nav for crawlers and assistive tech (mirrors navbar routes). */
export function CrawlNav() {
  return (
    <nav aria-label="Site map" className="sr-only">
      <ul>
        {sitePages.map((page) => (
          <li key={page.path}>
            <Link href={page.path}>{page.name}</Link>
          </li>
        ))}
        <li>
          <Link href="/join-labs">Join Labs</Link>
        </li>
        <li>
          <Link href="/writing/tasty-software">
            Tasty Software: taste in software and the future of software engineers
          </Link>
        </li>
        <li>
          <Link href="/writing/cortex-case-study">
            Cortex Case Study: Project Cortex, Cortex EDR, CLI, and Attack
          </Link>
        </li>
      </ul>
    </nav>
  );
}
