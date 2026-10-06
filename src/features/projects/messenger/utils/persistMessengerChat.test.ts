import { describe, expect, it } from "vitest";

import { messengerChatKey } from "@/features/projects/messenger/utils/messengerChatKey";
import {
  NOW,
  entryAt,
  memoryChatStore,
} from "@/features/projects/messenger/utils/messengerChatStore.fixtures";
import {
  hydrateMessengerChat,
  writeThroughMessengerChat,
} from "@/features/projects/messenger/utils/persistMessengerChat";

const retention = { hasOwnerComputer: true, isStoredOnComputer: () => true };
const thread = (entries: ReturnType<typeof entryAt>[]) => ({
  threadKey: "whole",
  entries,
  canSend: true,
});

describe("persistMessengerChat", () => {
  it("write-through merges server window into the browser copy (server wins)", async () => {
    const { store, chats } = memoryChatStore();
    await writeThroughMessengerChat({
      store,
      projectId: "p1",
      thread: thread([entryAt("a", NOW - 2000), entryAt("b", NOW - 1000)]),
      retention,
      now: NOW,
    });
    const shown = await writeThroughMessengerChat({
      store,
      projectId: "p1",
      thread: thread([entryAt("b", NOW - 1000, "b2"), entryAt("c", NOW)]),
      retention,
      now: NOW,
    });
    expect(shown.entries.map((e) => e.text)).toEqual(["a", "b2", "c"]);
    expect(
      chats.get(messengerChatKey({ projectId: "p1", threadKey: "whole" }))
        ?.entries,
    ).toHaveLength(3);
  });

  it("no wipe: an empty server window keeps the chat and its messages", async () => {
    const { store, chats } = memoryChatStore();
    await writeThroughMessengerChat({
      store,
      projectId: "p1",
      thread: thread([entryAt("a", NOW)]),
      retention,
      now: NOW,
    });
    const shown = await writeThroughMessengerChat({
      store,
      projectId: "p1",
      thread: thread([]),
      retention,
      now: NOW,
    });
    expect(shown.entries.map((e) => e.messageId)).toEqual(["a"]);
    expect(chats.size).toBe(1);
  });

  it("hydrates the browser copy for first paint", async () => {
    const { store } = memoryChatStore();
    await writeThroughMessengerChat({
      store,
      projectId: "p1",
      thread: thread([entryAt("a", NOW)]),
      retention,
      now: NOW,
    });
    const cached = await hydrateMessengerChat({
      store,
      projectId: "p1",
      threadKey: "whole",
    });
    expect(cached?.entries.map((e) => e.messageId)).toEqual(["a"]);
    expect(
      await hydrateMessengerChat({
        store,
        projectId: "p1",
        threadKey: "bot-1",
      }),
    ).toBeNull();
  });

  it("a failed browser write never hides the live server thread", async () => {
    const { store } = memoryChatStore({ failWrites: true });
    const shown = await writeThroughMessengerChat({
      store,
      projectId: "p1",
      thread: thread([entryAt("live", NOW)]),
      retention,
      now: NOW,
    });
    expect(shown.entries.map((e) => e.messageId)).toEqual(["live"]);
  });
});
