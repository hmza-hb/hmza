"use client";

import { useEffect, useMemo, useState } from "react";
import { GITHUB_USERNAME, githubProfileUrl } from "@/data/open-source";

type ContributionDay = {
  date: string;
  count: number;
};

const API_URL = `https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=last`;

function levelColor(count: number): string {
  if (count === 0) return "#ebedf0";
  if (count <= 2) return "#9be9a8";
  if (count <= 6) return "#40c463";
  if (count <= 12) return "#30a14e";
  return "#216e39";
}

/** GitHub-style grid: columns = weeks (oldest → newest), rows = Sun–Sat */
function buildGrid(days: ContributionDay[]) {
  const sorted = [...days].sort((a, b) => a.date.localeCompare(b.date));
  if (sorted.length === 0) return [] as ContributionDay[][];

  const first = new Date(sorted[0].date);
  const startPad = first.getUTCDay();
  const cells: (ContributionDay | null)[] = [
    ...Array.from({ length: startPad }, () => null),
    ...sorted.map((d) => d),
  ];

  const weeks: (ContributionDay | null)[][] = [];
  for (let i = 0; i < cells.length; i += 7) {
    const week = cells.slice(i, i + 7);
    while (week.length < 7) week.push(null);
    weeks.push(week);
  }
  return weeks;
}

export function GitHubContributionGraph() {
  const [days, setDays] = useState<ContributionDay[] | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch(API_URL)
      .then((res) => {
        if (!res.ok) throw new Error("fetch failed");
        return res.json();
      })
      .then((data: { contributions?: ContributionDay[] }) => {
        if (!cancelled && data.contributions?.length) {
          setDays(data.contributions);
        } else if (!cancelled) {
          setError(true);
        }
      })
      .catch(() => {
        if (!cancelled) setError(true);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const weeks = useMemo(() => (days ? buildGrid(days) : []), [days]);

  return (
    <div className="w-full">
      {error && (
        <p className="text-[14px] text-muted">
          Could not load contributions.{" "}
          <a
            href={githubProfileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#1a5fb4] hover:underline"
          >
            View on GitHub
          </a>
        </p>
      )}
      {!error && days === null && (
        <div
          className="h-[120px] animate-pulse rounded-lg bg-black/[0.04]"
          aria-hidden
        />
      )}
      {!error && weeks.length > 0 && (
        <>
          <div
            className="overflow-x-auto pb-1"
            role="img"
            aria-label="GitHub contribution calendar for the last year"
          >
            <div className="inline-flex gap-[3px]">
              {weeks.map((week, wi) => (
                <div key={wi} className="flex flex-col gap-[3px]">
                  {week.map((day, di) => (
                    <span
                      key={`${wi}-${di}`}
                      className="h-[11px] w-[11px] rounded-[2px]"
                      style={{
                        backgroundColor: day
                          ? levelColor(day.count)
                          : "transparent",
                      }}
                      title={
                        day
                          ? `${day.count} contributions on ${day.date}`
                          : undefined
                      }
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
          <p className="mt-3 text-[12px] text-muted">
            Contribution graph · last 12 months
          </p>
        </>
      )}
    </div>
  );
}
