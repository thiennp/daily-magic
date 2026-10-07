"use client";

import { useEffect, useLayoutEffect, useRef } from "react";

import AwcMessengerTimelineEntryRow from "@/features/projects/messenger/AwcMessengerTimelineEntryRow";
import AwcMessengerTimelineLoadHeader from "@/features/projects/messenger/AwcMessengerTimelineLoadHeader";
import type { AwcMessengerTimelineEntry } from "@/features/projects/messenger/types/awcProjectMessenger.type";
import type { ProjectTasksChatVisibility } from "@/features/projects/tasks/projectTask.type";
import { restoreMessengerScrollAfterPrepend } from "@/features/projects/messenger/utils/restoreMessengerScrollAfterPrepend";
import { scrollMessengerTimelineToBottom } from "@/features/projects/messenger/utils/scrollMessengerTimelineToBottom";

interface AwcMessengerTimelineProps {
  readonly entries: readonly AwcMessengerTimelineEntry[];
  readonly loadingOlder: boolean;
  readonly canLoadOlder: boolean;
  readonly reachedStart: boolean;
  readonly projectComputerOffline: boolean;
  readonly onLoadOlder: () => void;
  readonly chatVisibility?: ProjectTasksChatVisibility;
}

const TOP_LOAD_THRESHOLD_PX = 48;

export default function AwcMessengerTimeline({
  entries,
  loadingOlder,
  canLoadOlder,
  reachedStart,
  projectComputerOffline,
  onLoadOlder,
  chatVisibility,
}: AwcMessengerTimelineProps) {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const stickToBottomRef = useRef(true);
  const prevEntryCountRef = useRef(0);
  const pendingPrependRef = useRef<{
    scrollHeight: number;
    scrollTop: number;
  } | null>(null);
  const loadOlderRef = useRef(onLoadOlder);

  useEffect(() => {
    loadOlderRef.current = onLoadOlder;
  }, [onLoadOlder]);

  useLayoutEffect(() => {
    const el = scrollerRef.current;
    if (el === null) return;
    const prevCount = prevEntryCountRef.current;
    const nextCount = entries.length;
    prevEntryCountRef.current = nextCount;

    if (pendingPrependRef.current !== null) {
      const snap = pendingPrependRef.current;
      pendingPrependRef.current = null;
      restoreMessengerScrollAfterPrepend({
        element: el,
        previousScrollHeight: snap.scrollHeight,
        previousScrollTop: snap.scrollTop,
      });
      return;
    }

    if (stickToBottomRef.current || prevCount === 0) {
      scrollMessengerTimelineToBottom(el);
    }
  }, [entries]);

  useEffect(() => {
    const el = scrollerRef.current;
    if (el === null) return;
    const onScroll = (): void => {
      const distanceFromBottom =
        el.scrollHeight - el.scrollTop - el.clientHeight;
      stickToBottomRef.current = distanceFromBottom < 80;
      if (
        el.scrollTop <= TOP_LOAD_THRESHOLD_PX &&
        canLoadOlder &&
        !loadingOlder &&
        !projectComputerOffline
      ) {
        const snap = {
          scrollHeight: el.scrollHeight,
          scrollTop: el.scrollTop,
        };
        pendingPrependRef.current = snap;
        loadOlderRef.current();
      }
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      el.removeEventListener("scroll", onScroll);
    };
  }, [canLoadOlder, loadingOlder, projectComputerOffline]);

  const handleLoadOlderClick = (): void => {
    const el = scrollerRef.current;
    if (el !== null) {
      pendingPrependRef.current = {
        scrollHeight: el.scrollHeight,
        scrollTop: el.scrollTop,
      };
    }
    stickToBottomRef.current = false;
    onLoadOlder();
  };

  return (
    <div
      ref={scrollerRef}
      className="flex flex-1 flex-col gap-3.5 overflow-auto bg-gray-50 p-4 dark:bg-white/[0.02]"
    >
      <AwcMessengerTimelineLoadHeader
        loadingOlder={loadingOlder}
        canLoadOlder={canLoadOlder}
        reachedStart={reachedStart}
        projectComputerOffline={projectComputerOffline}
        onLoadOlder={handleLoadOlderClick}
      />
      {entries.map((entry) => {
        const isMine =
          entry.author.kind === "owner" || entry.author.kind === "member";
        return (
          <AwcMessengerTimelineEntryRow
            chatVisibility={chatVisibility}
            key={entry.messageId}
            entry={entry}
            isMine={isMine}
          />
        );
      })}
    </div>
  );
}
