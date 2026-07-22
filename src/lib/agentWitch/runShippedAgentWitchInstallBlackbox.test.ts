import { describe, expect, it } from "vitest";

import { readAgentWitchInstallScriptSource } from "@/lib/agentWitch/readAgentWitchInstallScriptSource";
import { assertShippedAgentWitchInstallScriptIsMinified } from "@/lib/agentWitch/assertShippedAgentWitchInstallScriptIsMinified";
import { runShippedAgentWitchInstallBlackbox } from "@/lib/agentWitch/runShippedAgentWitchInstallBlackbox";

describe("runShippedAgentWitchInstallBlackbox helpers", () => {
  it("detects non-minified install payloads", () => {
    const source = readAgentWitchInstallScriptSource(
      "reviveAgentWitchWebSocket.ts",
    );

    expect(() =>
      assertShippedAgentWitchInstallScriptIsMinified({
        scriptName: "reviveAgentWitchWebSocket.ts",
        shipped: source,
        source,
      }),
    ).toThrow(/was not minified/);
  });
});

describe("runShippedAgentWitchInstallBlackbox", () => {
  it.skipIf(process.env.AGENT_WITCH_SHIPPED_INSTALL_BASE_URL === undefined)(
    "runs against a live base URL when AGENT_WITCH_SHIPPED_INSTALL_BASE_URL is set",
    async () => {
      const result = await runShippedAgentWitchInstallBlackbox(
        process.env.AGENT_WITCH_SHIPPED_INSTALL_BASE_URL as string,
      );

      expect(result.downloadedScriptCount).toBeGreaterThan(0);
      expect(result.materializedScriptCount).toBe(result.downloadedScriptCount);
    },
    120_000,
  );
});
