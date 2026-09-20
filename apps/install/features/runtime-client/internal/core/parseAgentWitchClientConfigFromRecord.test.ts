import { describe, expect, it } from "vitest";

import type { AgentWitchLocalLayout } from "@agent-witch/install-layout/types";

import { PRE_ESTIMATE_WRITER_MODES } from "./preEstimate/resolvePreEstimateWriterMode";
import { parseAgentWitchClientConfigFromRecord } from "./parseAgentWitchClientConfigFromRecord";

const profileRoot = "/Users/me/.local-agent-witch/profiles/a@example.com";
const layout: AgentWitchLocalLayout = {
  profileEmail: "a@example.com",
  installDir: "/Users/me/.local-agent-witch",
  appDir: "/Users/me/.local-agent-witch/app",
  appBundlePath: "/Users/me/.local-agent-witch/app/Agent Witch.app",
  projectsDir: `${profileRoot}/projects`,
  logsDir: `${profileRoot}/logs`,
  mainLogPath: `${profileRoot}/logs/agent-witch.log`,
  errorLogPath: `${profileRoot}/logs/agent-witch-error.log`,
  reportsDir: `${profileRoot}/reports`,
  deviceKeypairPath: `${profileRoot}/device-keypair.json`,
  configPath: `${profileRoot}/config.json`,
  harnessRootDir: `${profileRoot}/harness`,
  harnessManifestPath: `${profileRoot}/harness/manifest.json`,
  harnessSetsDir: `${profileRoot}/harness/sets`,
};

describe("parseAgentWitchClientConfigFromRecord", () => {
  it("returns config when pairing token is present", () => {
    const result = parseAgentWitchClientConfigFromRecord({
      parsed: {
        pairingToken: "pair-123",
        workspace: "/tmp/ws",
        claudeCommand: "claude-bin",
      },
      layout,
      env: {},
      cwd: "/fallback/cwd",
    });

    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.config.pairingToken).toBe("pair-123");
      expect(result.config.workspace).toBe("/tmp/ws");
      expect(result.config.claudeCommand).toBe("claude-bin");
      expect(result.config.wsUrl).toBe(
        "ws://localhost:3000/api/agent-witch/ws",
      );
      expect(result.config.email).toBe("a@example.com");
      expect(result.config.preEstimateWriterMode).toBe(
        PRE_ESTIMATE_WRITER_MODES.SAME,
      );
    }
  });

  it("parses preEstimateWriterMode fast-api", () => {
    const result = parseAgentWitchClientConfigFromRecord({
      parsed: {
        pairingToken: "pair-123",
        preEstimateWriterMode: "fast-api",
      },
      layout,
      env: {},
      cwd: "/cwd",
    });
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.config.preEstimateWriterMode).toBe(
        PRE_ESTIMATE_WRITER_MODES.FAST_API,
      );
    }
  });

  it("rejects non-object JSON", () => {
    expect(
      parseAgentWitchClientConfigFromRecord({
        parsed: [],
        layout,
        env: {},
        cwd: "/cwd",
      }).ok,
    ).toBe(false);
  });

  it("rejects missing pairing token", () => {
    const result = parseAgentWitchClientConfigFromRecord({
      parsed: { wsUrl: "wss://example.com/ws" },
      layout,
      env: {},
      cwd: "/cwd",
    });
    expect(result).toEqual({ ok: false, reason: "missing_pairing_token" });
  });
});
