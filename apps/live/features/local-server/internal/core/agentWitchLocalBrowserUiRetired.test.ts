import { describe, expect, it } from "vitest";

import { AGENT_WITCH_LOCAL_BROWSER_UI_RETIRED_MESSAGE } from "./agentWitchLocalApp.constants";

describe("AGENT_WITCH_LOCAL_BROWSER_UI_RETIRED_MESSAGE", () => {
  it("is plain English guidance with no status codes", () => {
    expect(AGENT_WITCH_LOCAL_BROWSER_UI_RETIRED_MESSAGE).toBe(
      "Open AgentWitch Local from the menu bar.",
    );
    expect(AGENT_WITCH_LOCAL_BROWSER_UI_RETIRED_MESSAGE).not.toMatch(/\b\d{3}\b/);
    expect(AGENT_WITCH_LOCAL_BROWSER_UI_RETIRED_MESSAGE.toLowerCase()).not.toContain(
      "local.agentwitch.com",
    );
  });
});
