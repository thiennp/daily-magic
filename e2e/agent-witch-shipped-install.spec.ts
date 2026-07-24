import { test, expect } from "@playwright/test";

import { runShippedAgentWitchInstallBlackbox } from "../src/lib/agentWitch/runShippedAgentWitchInstallBlackbox";

test.describe("Agent Witch shipped install blackbox", () => {
  test("serves bundled install artifacts that load under node", async ({
    baseURL,
  }) => {
    test.setTimeout(180_000);

    const result = await runShippedAgentWitchInstallBlackbox(baseURL as string);

    expect(result.bundleVersion.length).toBeGreaterThan(0);
    expect(result.downloadedScriptCount).toBe(2);
    expect(result.materializedScriptCount).toBe(result.downloadedScriptCount);
  });
});
