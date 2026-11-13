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
      </ul>
    </nav>
  );
}
