"use client";

import { useCallback, useMemo, useState } from "react";

import type { AwcMessengerTimelineEntry } from "@/features/projects/messenger/types/awcProjectMessenger.type";
import {
  countOneWindowPeerEntries,
  filterOneWindowPeerEntries,
} from "@/features/projects/messenger/utils/filterOneWindowFeedEntries";

/**
 * DF-023 "Between assistants" toggle: owner-view bot↔bot lines are visible by
 * default; the owner may hide them. `barProps` spreads onto the filter bar;
 * `shown` is the filtered feed with peers removed while hidden.
 */
export const useOneWindowPeerToggle = (
  entries: readonly AwcMessengerTimelineEntry[],
  filtered: readonly AwcMessengerTimelineEntry[],
) => {
  const [showPeers, setShowPeers] = useState(true);
  const peersCount = useMemo(
    () => countOneWindowPeerEntries(entries),
    [entries],
  );
  const onTogglePeers = useCallback(() => {
    setShowPeers((prev) => !prev);
  }, []);
  const shown = useMemo(
    () => filterOneWindowPeerEntries({ entries: filtered, showPeers }),
    [filtered, showPeers],
  );
  const barProps = useMemo(
    () => ({ peersCount, showPeers, onTogglePeers }),
    [peersCount, showPeers, onTogglePeers],
  );
  return { barProps, shown };
};
