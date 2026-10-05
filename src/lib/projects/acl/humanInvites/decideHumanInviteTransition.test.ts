import { describe, expect, it } from "vitest";

import {
  HUMAN_INVITE_TERMINAL_STATES,
  decideHumanInviteTransition,
  isHumanInviteTerminal,
  type HumanInviteEvent,
  type HumanInviteState,
} from "@/lib/projects/acl/humanInvites/decideHumanInviteTransition";

const FROM_PENDING: ReadonlyArray<{
  readonly event: HumanInviteEvent;
  readonly to: HumanInviteState;
}> = [
  { event: "accept", to: "accepted" },
  { event: "revoke", to: "revoked" },
  { event: "expire", to: "expired" },
];

describe("decideHumanInviteTransition", () => {
  it.each(FROM_PENDING)("pending --$event--> $to", ({ event, to }) => {
    expect(decideHumanInviteTransition({ from: "pending", event })).toBe(to);
  });

  it("rejects every event from every terminal state", () => {
    const events: HumanInviteEvent[] = ["accept", "revoke", "expire"];
    for (const from of HUMAN_INVITE_TERMINAL_STATES) {
      expect(isHumanInviteTerminal(from)).toBe(true);
      for (const event of events) {
        expect(decideHumanInviteTransition({ from, event })).toBeNull();
      }
    }
  });
});
