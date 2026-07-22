import { test, expect } from "@playwright/test";

import { runShippedAgentWitchInstallBlackbox } from "../src/lib/agentWitch/runShippedAgentWitchInstallBlackbox";

test.describe("Agent Witch shipped install blackbox", () => {
  test("serves minified install scripts that load under tsx", async ({
    baseURL,
  }) => {
    test.setTimeout(180_000);

    const result = await runShippedAgentWitchInstallBlackbox(baseURL as string);

    expect(result.bundleVersion.length).toBeGreaterThan(0);
    expect(result.downloadedScriptCount).toBeGreaterThan(50);
    expect(result.materializedScriptCount).toBe(result.downloadedScriptCount);
  });
});
