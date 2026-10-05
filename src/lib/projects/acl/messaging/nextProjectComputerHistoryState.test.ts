import { describe, expect, it } from "vitest";

import { nextProjectComputerHistoryState } from "@/lib/projects/acl/messaging/nextProjectComputerHistoryState";
import {
  PROJECT_COMPUTER_HISTORY_STATES,
  type ProjectComputerHistoryEvent,
} from "@/lib/projects/acl/messaging/projectComputerHistoryStateMachine";

const COMPUTER_EVENTS: readonly ProjectComputerHistoryEvent[] = [
  "computer_config_valid",
  "computer_offline",
  "computer_write_failed",
  "computer_backlog_acked",
];

describe("nextProjectComputerHistoryState", () => {
  it("leaves off only on an explicit owner toggle", () => {
    expect(nextProjectComputerHistoryState("off", "owner_enable")).toEqual({
      ok: true,
      state: "on_configuring",
    });
    for (const event of COMPUTER_EVENTS) {
      expect(nextProjectComputerHistoryState("off", event).ok).toBe(false);
    }
  });

  it("goes to on_ready when the computer reports a valid config", () => {
    expect(
      nextProjectComputerHistoryState(
        "on_configuring",
        "computer_config_valid",
      ),
    ).toEqual({ ok: true, state: "on_ready" });
  });

  it.each(["computer_offline", "computer_write_failed"] as const)(
    "on_ready → degraded on %s",
    (event) => {
      expect(nextProjectComputerHistoryState("on_ready", event)).toEqual({
        ok: true,
        state: "degraded",
      });
    },
  );

  it("degraded returns to on_ready only once the backlog is acked", () => {
    expect(
      nextProjectComputerHistoryState("degraded", "computer_backlog_acked"),
    ).toEqual({ ok: true, state: "on_ready" });
    expect(
      nextProjectComputerHistoryState("degraded", "computer_config_valid").ok,
    ).toBe(false);
  });

  it.each(PROJECT_COMPUTER_HISTORY_STATES)(
    "%s → off on owner toggle",
    (from) => {
      expect(nextProjectComputerHistoryState(from, "owner_disable")).toEqual({
        ok: true,
        state: "off",
      });
    },
  );
});
