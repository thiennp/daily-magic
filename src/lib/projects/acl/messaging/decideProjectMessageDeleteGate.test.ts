import { describe, expect, it } from "vitest";

import { decideProjectMessageDeleteGate } from "@/lib/projects/acl/messaging/decideProjectMessageDeleteGate";
import { PROJECT_COMPUTER_HISTORY_UNSAVED_FLAG_AFTER_MS } from "@/lib/projects/acl/messaging/projectComputerHistory.constants";
import type { ProjectComputerHistoryState } from "@/lib/projects/acl/messaging/projectComputerHistoryStateMachine";

const DAY_MS = 24 * 60 * 60 * 1000;

const decide = (
  featureState: ProjectComputerHistoryState,
  hasComputerAck: boolean,
  existingRuleAllows = true,
) =>
  decideProjectMessageDeleteGate({
    featureState,
    hasComputerAck,
    existingRuleAllows,
  });

describe("decideProjectMessageDeleteGate", () => {
  it("keeps the 7-day unsaved-flag threshold (flag/wake only, never delete)", () => {
    expect(PROJECT_COMPUTER_HISTORY_UNSAVED_FLAG_AFTER_MS).toBe(7 * DAY_MS);
  });

  it("off leaves today's rule unchanged", () => {
    expect(decide("off", false, true)).toBe("allow");
    expect(decide("off", false, false)).toBe("deny");
    expect(decide("off", true, true)).toBe("allow");
  });

  describe.each(["on_configuring", "on_ready", "degraded"] as const)("%s", (state) => {
    it("allows delete with a computerAck", () => {
      expect(decide(state, true)).toBe("allow");
    });

    it("denies delete without a computerAck at any age", () => {
      expect(decide(state, false)).toBe("deny");
    });

    it("never overrides a failing existing rule", () => {
      expect(decide(state, true, false)).toBe("deny");
      expect(decide(state, false, false)).toBe("deny");
    });
  });

  it("degraded behaves the same as on_ready", () => {
    for (const ack of [true, false]) {
      for (const rule of [true, false]) {
        expect(decide("degraded", ack, rule)).toBe(
          decide("on_ready", ack, rule),
        );
      }
    }
  });
});
