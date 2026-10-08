import { describe, expect, it, vi } from "vitest";

import {
  buildAgentWitchLegacyLauncherNoopPlistXml,
  retireAgentWitchLegacyHostLauncher,
} from "./retireAgentWitchLegacyHostLauncher";

describe("retireAgentWitchLegacyHostLauncher", () => {
  it("writes a no-op plist without RunAtLoad or KeepAlive", () => {
    const xml = buildAgentWitchLegacyLauncherNoopPlistXml("com.agent-witch");
    expect(xml).toContain("<string>com.agent-witch</string>");
    expect(xml).toContain("<string>/usr/bin/true</string>");
    expect(xml).toContain("<key>RunAtLoad</key>\n  <false/>");
    expect(xml).toContain("<key>KeepAlive</key>\n  <false/>");
    expect(xml).not.toContain("<true/>");
  });

  it("bootouts (never disables) the legacy label after rewriting the plist", async () => {
    const calls: string[][] = [];
    let written = "";
    const result = await retireAgentWitchLegacyHostLauncher({
      installDir: "/tmp/.agent-witch",
      homeDir: "/tmp/home",
      platform: "darwin",
      uid: 501,
      deps: {
        launchctl: async (args) => {
          calls.push([...args]);
        },
        writePlist: (_path, xml) => {
          written = xml;
        },
        plistExists: () => true,
      },
    });
    expect(result.ok).toBe(true);
    expect(result.retired).toBe(true);
    expect(written).toContain("/usr/bin/true");
    expect(calls).toEqual([["bootout", "gui/501/com.agent-witch"]]);
  });

  it("skips on non-macOS", async () => {
    const result = await retireAgentWitchLegacyHostLauncher({
      platform: "linux",
      deps: {
        launchctl: async () => {
          throw new Error("should not run");
        },
        writePlist: () => {
          throw new Error("should not run");
        },
        plistExists: () => false,
      },
    });
    expect(result).toEqual({
      ok: true,
      retired: false,
      message: "Legacy LaunchAgent retirement is macOS-only.",
    });
  });
});
