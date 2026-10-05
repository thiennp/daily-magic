import { describe, expect, it } from "vitest";

import {
  CLAIM_CODE_TERMINAL_STATES,
  decideClaimCodeTransition,
  isClaimCodeTerminal,
  type ClaimCodeEvent,
  type ClaimCodeState,
} from "@/lib/agentAccess/claimBot/decideClaimCodeTransition";

const FROM_ISSUED: ReadonlyArray<{
  readonly event: ClaimCodeEvent;
  readonly to: ClaimCodeState;
}> = [
  { event: "redeem", to: "redeemed" },
  { event: "expire", to: "expired" },
  { event: "supersede", to: "superseded" },
  { event: "revoke", to: "revoked" },
];

describe("decideClaimCodeTransition", () => {
  it.each(FROM_ISSUED)(
    "issued --$event--> $to",
    ({ event, to }) => {
      expect(decideClaimCodeTransition({ from: "issued", event })).toBe(to);
    },
  );

  it("rejects every event from every terminal state", () => {
    const events: ClaimCodeEvent[] = [
      "redeem",
      "expire",
      "supersede",
      "revoke",
    ];
    for (const from of CLAIM_CODE_TERMINAL_STATES) {
      expect(isClaimCodeTerminal(from)).toBe(true);
      for (const event of events) {
        expect(decideClaimCodeTransition({ from, event })).toBeNull();
      }
    }
  });
});
