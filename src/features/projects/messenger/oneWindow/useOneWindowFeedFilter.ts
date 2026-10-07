"use client";

import { useMemo, useState } from "react";

import type { OneWindowFeedFilter } from "@/features/projects/messenger/oneWindow/AwcOneWindowFilterBar";
import {
  isOneWindowApprovalItem,
  isOneWindowNeedsYouForViewer,
} from "@/features/projects/messenger/oneWindow/oneWindowFeedFilters";
import { mapMessengerEntryToOneWindowItem } from "@/features/projects/messenger/oneWindow/mapMessengerEntryToOneWindowItem";
import type { AwcMessengerOpenThread } from "@/features/projects/messenger/types/awcProjectMessenger.type";
import { isMessengerAiSessionEntry } from "@/features/projects/messenger/utils/isMessengerAiSessionEntry";
import type { ProjectTasksChatVisibility } from "@/features/projects/tasks/projectTask.type";

/** One Window filter chips (All / Needs you / Approvals): counts + filtered rows. */
export const useOneWindowFeedFilter = ({
  thread,
  isOwner,
  chatVisibility,
}: {
  readonly thread: AwcMessengerOpenThread | null;
  readonly isOwner: boolean;
  readonly chatVisibility?: ProjectTasksChatVisibility;
}) => {
  const [filter, setFilter] = useState<OneWindowFeedFilter>("all");
  const entries = useMemo(() => thread?.entries ?? [], [thread]);
  // OW-H5: chips read window kind + live subject state from existing feed fields.
  // Session rows render nothing under tasks_tab_only (row default) → not counted.
  const sessionsHidden = (chatVisibility ?? "tasks_tab_only") === "tasks_tab_only";
  // Needs you = owner-created or assigned-to-viewer rows only (Product/Lead).
  const items = useMemo(() => {
    const viewer = { isOwner };
    const entriesById = new Map(entries.map((entry) => [entry.messageId, entry]));
    return entries
      .filter((entry) => !(sessionsHidden && isMessengerAiSessionEntry(entry)))
      .map((entry) => {
        const item = mapMessengerEntryToOneWindowItem(entry);
        return {
          entry,
          approval: isOneWindowApprovalItem(item),
          needsYou: isOneWindowNeedsYouForViewer({ entry, item, viewer, entriesById }),
        };
      });
  }, [entries, sessionsHidden, isOwner]);
  const needsCount = items.filter((row) => row.needsYou).length;
  const approvalsCount = items.filter((row) => row.approval).length;

  const filtered = useMemo(() => {
    if (filter === "all") return entries;
    return items
      .filter((row) => (filter === "approvals" ? row.approval : row.needsYou))
      .map((row) => row.entry);
  }, [entries, items, filter]);

  return { entries, filter, setFilter, needsCount, approvalsCount, filtered };
};
