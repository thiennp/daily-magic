import { describe, expect, it } from "vitest";

import {
  DAY_MS,
  NOW,
  entriesEndingAt,
  entryAt,
} from "@/features/projects/messenger/utils/messengerChatStore.fixtures";
import {
  MESSENGER_CHAT_MAX_AGE_MS,
  MESSENGER_CHAT_MAX_MESSAGES,
} from "@/features/projects/messenger/utils/messengerChatStore.constant";
import {
  NO_COMPUTER_STORED_CONFIRMATION,
  pruneMessengerChatEntries,
} from "@/features/projects/messenger/utils/pruneMessengerChatEntries";

const confirmed = () => true;

describe("pruneMessengerChatEntries", () => {
  it("locks 1 week AND 1000 messages", () => {
    expect(MESSENGER_CHAT_MAX_AGE_MS).toBe(7 * DAY_MS);
    expect(MESSENGER_CHAT_MAX_MESSAGES).toBe(1000);
  });

  it("drops only rows older than 1 week AND outside newest 1000 AND computer-stored", () => {
    const entries = entriesEndingAt(1200, NOW - 8 * DAY_MS);
    const kept = pruneMessengerChatEntries({
      entries,
      now: NOW,
      hasOwnerComputer: true,
      isStoredOnComputer: confirmed,
    });
    expect(kept).toHaveLength(1000);
    expect(kept[0]?.messageId).toBe(entries[200]?.messageId);
    expect(kept.at(-1)?.messageId).toBe(entries.at(-1)?.messageId);
  });

  it("keeps >1000 rows while they are newer than 1 week", () => {
    const entries = entriesEndingAt(1200, NOW);
    expect(
      pruneMessengerChatEntries({
        entries,
        now: NOW,
        hasOwnerComputer: true,
        isStoredOnComputer: confirmed,
      }),
    ).toHaveLength(1200);
  });

  it("keeps old rows inside the newest 1000", () => {
    const entries = entriesEndingAt(50, NOW - 30 * DAY_MS);
    expect(
      pruneMessengerChatEntries({
        entries,
        now: NOW,
        hasOwnerComputer: true,
        isStoredOnComputer: confirmed,
      }),
    ).toHaveLength(50);
  });

  it("never trims without computer-stored confirmation (default today)", () => {
    const entries = entriesEndingAt(1500, NOW - 30 * DAY_MS);
    expect(
      pruneMessengerChatEntries({
        entries,
        now: NOW,
        hasOwnerComputer: true,
        isStoredOnComputer: NO_COMPUTER_STORED_CONFIRMATION,
      }),
    ).toHaveLength(1500);
  });

  it("exempt: no owner computer never trims (browser is the long-term copy)", () => {
    const entries = entriesEndingAt(1500, NOW - 30 * DAY_MS);
    expect(
      pruneMessengerChatEntries({
        entries,
        now: NOW,
        hasOwnerComputer: false,
        isStoredOnComputer: confirmed,
      }),
    ).toBe(entries);
  });

  it("keeps rows with an unreadable createdAt", () => {
    const odd = { ...entryAt("odd", NOW), createdAt: "" };
    const entries = [odd, ...entriesEndingAt(1000, NOW - 30 * DAY_MS)];
    const kept = pruneMessengerChatEntries({
      entries,
      now: NOW,
      hasOwnerComputer: true,
      isStoredOnComputer: confirmed,
    });
    expect(kept.map((e) => e.messageId)).toContain("odd");
  });
});
