import { describe, expect, it } from "vitest";

import { isProviderConnectEnabled } from "@/lib/projects/connections/isProviderConnectEnabled";

describe("isProviderConnectEnabled", () => {
  it("is disabled by default", () => {
    expect(isProviderConnectEnabled("slack", {})).toBe(false);
    expect(
      isProviderConnectEnabled("slack", { PROJECT_CONNECTIONS_ENABLE: "" }),
    ).toBe(false);
  });

  it("enables only listed providers (trimmed, case-insensitive)", () => {
    const env = { PROJECT_CONNECTIONS_ENABLE: " Slack , google_drive" };
    expect(isProviderConnectEnabled("slack", env)).toBe(true);
    expect(isProviderConnectEnabled("google_drive", env)).toBe(true);
    expect(isProviderConnectEnabled("linear", env)).toBe(false);
  });
});
