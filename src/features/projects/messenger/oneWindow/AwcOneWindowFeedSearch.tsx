"use client";

import { ONE_WINDOW_FEED_COPY } from "@/features/projects/messenger/oneWindow/oneWindowFeedCopy.constant";

interface AwcOneWindowFeedSearchProps {
  readonly query: string;
  readonly onQuery: (next: string) => void;
}

/** Search box above the feed: filters the visible messages as you type. */
export default function AwcOneWindowFeedSearch({
  query,
  onQuery,
}: AwcOneWindowFeedSearchProps) {
  return (
    <div className="border-b border-awc-border bg-awc-surface px-4 py-2 dark:border-gray-800">
      <label className="sr-only" htmlFor="awc-ow-feed-search">
        {ONE_WINDOW_FEED_COPY.searchLabel}
      </label>
      <input
        id="awc-ow-feed-search"
        type="search"
        autoComplete="off"
        spellCheck={false}
        value={query}
        placeholder={ONE_WINDOW_FEED_COPY.searchPlaceholder}
        onChange={(event) => onQuery(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Escape" && query !== "") {
            event.preventDefault();
            onQuery("");
          }
        }}
        className="w-full rounded-lg border border-awc-border bg-white px-3 py-1.5 text-sm text-awc-fg placeholder:text-awc-fg-muted focus:border-gray-400 focus:outline-none dark:border-gray-700 dark:bg-white/[0.04] dark:text-white"
      />
    </div>
  );
}
