import { afterEach, describe, expect, it } from "vitest";

import { readAgentWitchInstallRelativeImports } from "@/lib/agentWitch/readAgentWitchInstallRelativeImports";
import { readAgentWitchInstallScriptSource } from "@/lib/agentWitch/readAgentWitchInstallScriptSource";
import { minifyAgentWitchInstallScriptSource } from "@/lib/agentWitch/minifyAgentWitchInstallScriptSource";
import {
  clearAgentWitchInstallScriptShippingCache,
  prepareAgentWitchInstallScriptForShipping,
  shouldMinifyAgentWitchInstallScripts,
} from "@/lib/agentWitch/prepareAgentWitchInstallScriptForShipping";

afterEach(() => {
  clearAgentWitchInstallScriptShippingCache();
  delete process.env.AGENT_WITCH_MINIFY_INSTALL_SCRIPTS;
});

describe("minifyAgentWitchInstallScriptSource", () => {
  it("minifies install scripts while preserving relative imports", async () => {
    const source = readAgentWitchInstallScriptSource(
      "reviveAgentWitchWebSocket.ts",
    );
    const minified = await minifyAgentWitchInstallScriptSource(
      source,
      "reviveAgentWitchWebSocket.ts",
    );

    expect(minified.length).toBeLessThan(source.length);
    expect(minified).not.toContain("/**");
    expect(minified).toContain("verifyAgentWitchReviveAfterKickstart");
    expect(minified).toContain("./isActiveMacOsConsoleUser");
  });
});

describe("prepareAgentWitchInstallScriptForShipping", () => {
  it("ships minified source by default", async () => {
    const source = readAgentWitchInstallScriptSource("agent-witch-watchdog.ts");
    const shipped = await prepareAgentWitchInstallScriptForShipping({
      scriptName: "agent-witch-watchdog.ts",
      source,
    });

    expect(shouldMinifyAgentWitchInstallScripts()).toBe(true);
    expect(shipped.length).toBeLessThan(source.length);
  });

  it("keeps runtime relative imports after minification", async () => {
    const source = readAgentWitchInstallScriptSource(
      "reviveAgentWitchWebSocket.ts",
    );
    const shipped = await prepareAgentWitchInstallScriptForShipping({
      scriptName: "reviveAgentWitchWebSocket.ts",
      source,
    });
    const sourceImports = readAgentWitchInstallRelativeImports(
      source,
      "reviveAgentWitchWebSocket.ts",
    );
    const shippedImports = readAgentWitchInstallRelativeImports(
      shipped,
      "reviveAgentWitchWebSocket.ts",
    );

    expect(shippedImports.length).toBeGreaterThan(0);
    expect(
      shippedImports.every((dependency) => sourceImports.includes(dependency)),
    ).toBe(true);
    expect(shippedImports).toContain("verifyAgentWitchReviveAfterKickstart.ts");
    expect(shippedImports).toContain("attemptAgentWitchWatchdogReinstall.ts");
  });

  it("can return raw source when minification is disabled", async () => {
    process.env.AGENT_WITCH_MINIFY_INSTALL_SCRIPTS = "0";
    const source = readAgentWitchInstallScriptSource("agent-witch-watchdog.ts");

    const shipped = await prepareAgentWitchInstallScriptForShipping({
      scriptName: "agent-witch-watchdog.ts",
      source,
    });

    expect(shipped).toBe(source);
  });
});
