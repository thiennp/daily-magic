import { describe, expect, it } from "vitest";

import { deriveOneWindowKind } from "@/features/projects/messenger/oneWindow/mapMessengerEntryToOneWindowItem";
import { entry } from "@/features/projects/messenger/oneWindow/oneWindowServerParity.fixtures";
import type { AwcMessengerTimelineEntry } from "@/features/projects/messenger/types/awcProjectMessenger.type";
import { classifyProjectMessageWindowKind } from "@/lib/projects/acl/messaging/messenger/classifyProjectMessageWindowKind";

describe("One window ↔ server window-kind parity (OW9 F2)", () => {
  const CASES: readonly [
    AwcMessengerTimelineEntry["author"]["kind"],
    string,
  ][] = [
    ["bot", "task.assign"],
    ["owner", "task.assign"],
    ["member", "chat.note"],
    ["bot", "task.status"],
    ["bot", "task.received"],
    ["bot", "chat.note"],
    ["bot", "peer.joined"],
    ["owner", "chat.note"],
  ];

  it.each(CASES)(
    "%s-sent %s classifies the same on both sides",
    (authorKind, kind) => {
      const client = deriveOneWindowKind(
        entry({
          author: { kind: authorKind, membershipId: null, displayName: null },
          kind,
        }),
      );
      const server = classifyProjectMessageWindowKind({
        kind,
        senderKind: authorKind,
        recipientKind: "none",
      });
      expect(client).toBe(server);
    },
  );

  it("a bot-sent task.assign is `task` on both sides", () => {
    const bot = {
      kind: "bot" as const,
      membershipId: "kai",
      displayName: "Kai",
    };
    expect(
      deriveOneWindowKind(entry({ author: bot, kind: "task.assign" })),
    ).toBe("task");
    expect(
      classifyProjectMessageWindowKind({
        kind: "task.assign",
        senderKind: "bot",
        recipientKind: "none",
      }),
    ).toBe("task");
  });
});
