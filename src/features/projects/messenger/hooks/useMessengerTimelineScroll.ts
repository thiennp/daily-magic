"use client";

import { useEffect, useLayoutEffect, useRef } from "react";

import type { AwcMessengerTimelineEntry } from "@/features/projects/messenger/types/awcProjectMessenger.type";
import { restoreMessengerScrollAfterPrepend } from "@/features/projects/messenger/utils/restoreMessengerScrollAfterPrepend";
import { scrollMessengerTimelineToBottom } from "@/features/projects/messenger/utils/scrollMessengerTimelineToBottom";

const TOP_LOAD_THRESHOLD_PX = 48;

type ScrollSnap = { scrollHeight: number; scrollTop: number };

/**
 * Timeline scroll behaviour (moved out of AwcMessengerTimeline, unchanged):
 * newest at the bottom, stick to bottom while there, scroll up near the top
 * loads older and keeps the reading position after the prepend.
 */
export const useMessengerTimelineScroll = (input: {
  readonly entries: readonly AwcMessengerTimelineEntry[];
  readonly loadingOlder: boolean;
  readonly canLoadOlder: boolean;
  readonly projectComputerOffline: boolean;
  readonly onLoadOlder: () => void;
}) => {
  const { entries, loadingOlder, canLoadOlder, projectComputerOffline, onLoadOlder } = input;
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const stickToBottomRef = useRef(true);
  const prevEntryCountRef = useRef(0);
  const pendingPrependRef = useRef<ScrollSnap | null>(null);
  const loadOlderRef = useRef(onLoadOlder);

  useEffect(() => {
    loadOlderRef.current = onLoadOlder;
  }, [onLoadOlder]);

  useLayoutEffect(() => {
    const el = scrollerRef.current;
    if (el === null) return;
    const prevCount = prevEntryCountRef.current;
    prevEntryCountRef.current = entries.length;
    const snap = pendingPrependRef.current;
    if (snap !== null) {
      pendingPrependRef.current = null;
      restoreMessengerScrollAfterPrepend({
        element: el,
        previousScrollHeight: snap.scrollHeight,
        previousScrollTop: snap.scrollTop,
      });
      return;
    }
    if (stickToBottomRef.current || prevCount === 0) scrollMessengerTimelineToBottom(el);
  }, [entries]);

  useEffect(() => {
    const el = scrollerRef.current;
    if (el === null) return;
    const onScroll = (): void => {
      stickToBottomRef.current = el.scrollHeight - el.scrollTop - el.clientHeight < 80;
      if (el.scrollTop > TOP_LOAD_THRESHOLD_PX || !canLoadOlder) return;
      if (loadingOlder || projectComputerOffline) return;
      pendingPrependRef.current = { scrollHeight: el.scrollHeight, scrollTop: el.scrollTop };
      loadOlderRef.current();
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      el.removeEventListener("scroll", onScroll);
    };
  }, [canLoadOlder, loadingOlder, projectComputerOffline]);

  const onLoadOlderClick = (): void => {
    const el = scrollerRef.current;
    if (el !== null) {
      pendingPrependRef.current = { scrollHeight: el.scrollHeight, scrollTop: el.scrollTop };
    }
    stickToBottomRef.current = false;
    onLoadOlder();
  };

  return { scrollerRef, onLoadOlderClick };
};
