import { describe, expect, it } from "vitest";

import {
  subjectStateFromAgentRun,
  subjectStateFromDeliveries,
} from "@/features/projects/messenger/oneWindow/oneWindowSubjectState";
import { subjectStateFromWire } from "@/features/projects/messenger/oneWindow/oneWindowSubjectStateFromWire";
import {
  DELIVERY_TABLE,
  REPLY_TABLE,
  RUN_TABLE,
  serverEntry,
} from "@/features/projects/messenger/oneWindow/oneWindowServerParity.fixtures";
import { deriveProjectMessengerSubjectState } from "@/lib/projects/acl/messaging/messenger/deriveProjectMessengerSubjectState";

describe("One window ↔ server subject-state parity (OW9 F1)", () => {
  it.each(
    DELIVERY_TABLE.map((states) => [
      states.map((c) => c.state).join(","),
      states,
    ]),
  )("deliveries [%s]: local rules = server codes + label", (_label, states) => {
    const server = deriveProjectMessengerSubjectState(
      serverEntry({ states }),
      "task",
    );
    expect(subjectStateFromDeliveries(states)).toEqual(
      server === null ? null : subjectStateFromWire(server, states),
    );
  });

  it.each(RUN_TABLE)(
    "agent run %j: local rules = server codes + label",
    (status) => {
      const server = deriveProjectMessengerSubjectState(
        serverEntry({
          entryKind: "session",
          session: { status, writerAgent: null, agentRunId: "r1" },
        }),
        "task",
      );
      expect(server).not.toBeNull();
      if (server === null) return;
      expect(subjectStateFromAgentRun(status)).toEqual(
        subjectStateFromWire(server, []),
      );
    },
  );

  it.each(REPLY_TABLE)(
    "reply kind %s: server codes → client pill (no client recompute)",
    (kind, label) => {
      const server = deriveProjectMessengerSubjectState(
        serverEntry({
          author: { kind: "bot", membershipId: "kai", displayName: "Kai" },
          kind,
        }),
        "task_update",
      );
      expect(
        server === null ? null : subjectStateFromWire(server, []).label,
      ).toBe(label);
    },
  );
});
