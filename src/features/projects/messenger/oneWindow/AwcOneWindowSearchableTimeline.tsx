"use client";

import { useState, type ComponentProps } from "react";

import AwcMessengerTimeline from "@/features/projects/messenger/AwcMessengerTimeline";
import AwcOneWindowFeedEmpty from "@/features/projects/messenger/oneWindow/AwcOneWindowFeedEmpty";
import AwcOneWindowFeedSearch from "@/features/projects/messenger/oneWindow/AwcOneWindowFeedSearch";
import type { OneWindowFeedFilter } from "@/features/projects/messenger/oneWindow/AwcOneWindowFilterBar";
import { ONE_WINDOW_FEED_COPY } from "@/features/projects/messenger/oneWindow/oneWindowFeedCopy.constant";
import { filterOneWindowEntriesByQuery } from "@/features/projects/messenger/oneWindow/oneWindowFeedSearch";

type TimelineProps = Omit<
  ComponentProps<typeof AwcMessengerTimeline>,
  "entries"
>;

interface AwcOneWindowSearchableTimelineProps {
  /** The feed after the chip filter and the peer toggle. */
  readonly shown: ComponentProps<typeof AwcMessengerTimeline>["entries"];
  readonly filter: OneWindowFeedFilter;
  /** Any messages at all (before filters): decides whether the search box shows. */
  readonly hasEntries: boolean;
  readonly timeline: TimelineProps;
}

/** Search box, the filter's empty state, "no match" and the timeline in one block. */
export default function AwcOneWindowSearchableTimeline({
  shown,
  filter,
  hasEntries,
  timeline,
}: AwcOneWindowSearchableTimelineProps) {
  const [query, setQuery] = useState("");
  const visible = filterOneWindowEntriesByQuery(shown, query);
  return (
    <>
      {hasEntries ? (
        <AwcOneWindowFeedSearch query={query} onQuery={setQuery} />
      ) : null}
      {shown.length === 0 ? <AwcOneWindowFeedEmpty filter={filter} /> : null}
      {shown.length > 0 && visible.length === 0 ? (
        <p
          role="status"
          className="px-4 py-6 text-center text-sm text-awc-fg-muted"
        >
          {ONE_WINDOW_FEED_COPY.searchNoMatch}
        </p>
      ) : null}
      {visible.length > 0 ? (
        <AwcMessengerTimeline {...timeline} entries={visible} />
      ) : null}
    </>
  );
}
