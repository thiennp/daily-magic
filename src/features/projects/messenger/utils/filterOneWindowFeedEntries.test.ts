import { describe, expect, it } from "vitest";

import { mapMessengerEntryToOneWindowItem } from "@/features/projects/messenger/oneWindow/mapMessengerEntryToOneWindowItem";
import { isOneWindowNeedsYouForViewer } from "@/features/projects/messenger/oneWindow/oneWindowFeedFilters";
import {
  countOneWindowPeerEntries,
  filterOneWindowPeerEntries,
  isOneWindowPeerEntry,
} from "@/features/projects/messenger/utils/filterOneWindowFeedEntries";
import {
  chat,
  peer,
} from "@/features/projects/messenger/utils/oneWindowPeerFeed.fixtures";

describe("filterOneWindowPeerEntries (DF-023)", () => {
  const entries = [chat(), peer("task.status"), peer("task.received")];

  it("shows bot↔bot lines by default", () => {
    expect(filterOneWindowPeerEntries({ entries })).toHaveLength(3);
  });

  it("hides them only when the owner toggles them off", () => {
    expect(filterOneWindowPeerEntries({ entries, showPeers: false })).toEqual([
      entries[0],
    ]);
  });

  it("counts bot↔bot lines for the toggle", () => {
    expect(countOneWindowPeerEntries(entries)).toBe(2);
    expect(isOneWindowPeerEntry(entries[0])).toBe(false);
  });

  it("classifies a peer row as bot_to_bot, never Needs you", () => {
    const row = peer("task.blocked");
    const item = mapMessengerEntryToOneWindowItem(row);
    expect(item.windowKind).toBe("bot_to_bot");
    expect(item.windowKindFrom).toBe("derived");
    expect(
      isOneWindowNeedsYouForViewer({
        entry: row,
        item,
        viewer: { isOwner: true },
        entriesById: new Map(),
      }),
    ).toBe(false);
  });

  it("keeps an OW9 feed windowKind over the peer default", () => {
    const row = { ...peer("task.status"), windowKind: "notice" as const };
    expect(mapMessengerEntryToOneWindowItem(row).windowKind).toBe("notice");
  });
});
