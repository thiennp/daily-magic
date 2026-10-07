"use client";

import { useMemo, useRef } from "react";

import AwcMessengerTimelineEntryRow from "@/features/projects/messenger/AwcMessengerTimelineEntryRow";
import AwcMessengerTimelineLoadHeader from "@/features/projects/messenger/AwcMessengerTimelineLoadHeader";
import { useMessengerTimelineScroll } from "@/features/projects/messenger/hooks/useMessengerTimelineScroll";
import {
  AwcOneWindowDaySeparator,
  AwcOneWindowJumpToNew,
  AwcOneWindowNewMarker,
} from "@/features/projects/messenger/oneWindow/AwcOneWindowTimelineMarks";
import {
  buildOneWindowTimelineRows,
  findFirstUnreadMessageId,
} from "@/features/projects/messenger/oneWindow/buildOneWindowTimelineRows";
import { useOneWindowNewMarkerInView } from "@/features/projects/messenger/oneWindow/useOneWindowNewMarkerInView";
import type { AwcMessengerTimelineEntry } from "@/features/projects/messenger/types/awcProjectMessenger.type";
import type { ProjectTasksChatVisibility } from "@/features/projects/tasks/projectTask.type";

interface AwcMessengerTimelineProps {
  readonly entries: readonly AwcMessengerTimelineEntry[];
  readonly loadingOlder: boolean;
  readonly canLoadOlder: boolean;
  readonly reachedStart: boolean;
  readonly projectComputerOffline: boolean;
  readonly onLoadOlder: () => void;
  readonly chatVisibility?: ProjectTasksChatVisibility;
  /** P1-S4a: unread count captured before the feed was marked read (0 = no New marker). */
  readonly unreadCount?: number;
}

/** One window timeline: oldest → newest, day separators, New marker + jump-to-new. */
export default function AwcMessengerTimeline({
  entries,
  loadingOlder,
  canLoadOlder,
  reachedStart,
  projectComputerOffline,
  onLoadOlder,
  chatVisibility,
  unreadCount = 0,
}: AwcMessengerTimelineProps) {
  const { scrollerRef, onLoadOlderClick } = useMessengerTimelineScroll({
    entries,
    loadingOlder,
    canLoadOlder,
    projectComputerOffline,
    onLoadOlder,
  });
  const markerRef = useRef<HTMLDivElement | null>(null);
  const firstUnreadId = findFirstUnreadMessageId(entries, unreadCount);
  const rows = useMemo(
    () => buildOneWindowTimelineRows({ entries, now: new Date(), firstUnreadId }),
    [entries, firstUnreadId],
  );
  const markerInView = useOneWindowNewMarkerInView({
    scrollerRef: scrollerRef,
    markerRef,
    hasMarker: firstUnreadId !== null,
  });

  return (
    <div className="relative flex min-h-0 flex-1 flex-col">
      <div
        ref={scrollerRef}
        className="flex flex-1 flex-col gap-3.5 overflow-auto bg-awc-bg p-4 dark:bg-white/[0.02]"
      >
        <AwcMessengerTimelineLoadHeader
          loadingOlder={loadingOlder}
          canLoadOlder={canLoadOlder}
          reachedStart={reachedStart}
          projectComputerOffline={projectComputerOffline}
          onLoadOlder={onLoadOlderClick}
        />
        {rows.map((row) => {
          if (row.type === "day") return <AwcOneWindowDaySeparator key={row.key} label={row.label} />;
          if (row.type === "new") return <AwcOneWindowNewMarker key={row.key} markerRef={markerRef} />;
          const isMine = row.entry.author.kind === "owner" || row.entry.author.kind === "member";
          return (
            <AwcMessengerTimelineEntryRow
              chatVisibility={chatVisibility}
              key={row.key}
              entry={row.entry}
              isMine={isMine}
            />
          );
        })}
      </div>
      {markerInView ? null : (
        <AwcOneWindowJumpToNew
          count={unreadCount}
          onJump={() => markerRef.current?.scrollIntoView({ behavior: "smooth", block: "center" })}
        />
      )}
    </div>
  );
}
