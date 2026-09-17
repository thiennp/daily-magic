import { describe, expect, it } from "vitest";

import { shouldShowAgentWitchLocalReviveButton } from "./shouldShowAgentWitchLocalReviveButton";

describe("shouldShowAgentWitchLocalReviveButton", () => {
  it("hides revive while the WebSocket is connected (AGENT-027)", () => {
    expect(shouldShowAgentWitchLocalReviveButton(true)).toBe(false);
  });

  it("shows revive when the WebSocket is crashed or disconnected (AGENT-027)", () => {
    expect(shouldShowAgentWitchLocalReviveButton(false)).toBe(true);
  });
});
