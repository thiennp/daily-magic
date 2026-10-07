import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { describe, expect, it } from "vitest";

import {
  allocateOrLoadAgentWitchLocalAppPortRange,
  readAgentWitchLocalAppPortRangeFile,
} from "./allocateOrLoadAgentWitchLocalAppPortRange";
import {
  AGENT_WITCH_LOCAL_APP_PORT_RANGE_SIZE,
  AGENT_WITCH_LOCAL_PORTS_IN_USE_MESSAGE,
  AGENT_WITCH_LOCAL_PORT_RANGE_HELP,
} from "./agentWitchLocalAppPortRange.constants";
import { formatAgentWitchLocalAppPortRangeDisplay } from "./formatAgentWitchLocalAppPortRangeDisplay";
import { canBindAgentWitchLocalAppPort } from "./resolveAgentWitchLocalAppListenPort";

describe("allocateOrLoadAgentWitchLocalAppPortRange", () => {
  it("persists a stable 16-port range and formats display", () => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), "awl-port-"));
    const profilesDir = path.join(root, "profiles");
    const profileDir = path.join(profilesDir, "user@example.com");
    fs.mkdirSync(profileDir, { recursive: true });

    const first = allocateOrLoadAgentWitchLocalAppPortRange({
      profileDir,
      profilesDir,
      random: () => 0,
    });
    expect(first.end - first.start + 1).toBe(AGENT_WITCH_LOCAL_APP_PORT_RANGE_SIZE);
    expect(formatAgentWitchLocalAppPortRangeDisplay(first)).toBe(
      `${first.start}–${first.end}`,
    );

    const second = allocateOrLoadAgentWitchLocalAppPortRange({
      profileDir,
      profilesDir,
      random: () => 0.99,
    });
    expect(second).toEqual(first);
    expect(readAgentWitchLocalAppPortRangeFile(profileDir)).toEqual(first);

    fs.rmSync(root, { recursive: true, force: true });
  });

  it("gives different accounts different ranges", () => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), "awl-port2-"));
    const profilesDir = path.join(root, "profiles");
    const a = path.join(profilesDir, "a@example.com");
    const b = path.join(profilesDir, "b@example.com");
    fs.mkdirSync(a, { recursive: true });
    fs.mkdirSync(b, { recursive: true });

    const rangeA = allocateOrLoadAgentWitchLocalAppPortRange({
      profileDir: a,
      profilesDir,
      random: () => 0,
    });
    const rangeB = allocateOrLoadAgentWitchLocalAppPortRange({
      profileDir: b,
      profilesDir,
      random: () => 0,
    });
    expect(rangeA.start).not.toBe(rangeB.start);

    fs.rmSync(root, { recursive: true, force: true });
  });

  it("exposes Product conflict and help copy", () => {
    expect(AGENT_WITCH_LOCAL_PORTS_IN_USE_MESSAGE).toBe(
      "Ports for this account are in use.",
    );
    expect(AGENT_WITCH_LOCAL_PORT_RANGE_HELP).toBe(
      "Unique to this AgentWitch account on this computer.",
    );
  });

  it("canBind returns boolean for a high port", async () => {
    const ok = await canBindAgentWitchLocalAppPort(0);
    // listen(0) should succeed for ephemeral bind probe intent; our helper takes explicit port.
    // Probe a likely-free dynamic port:
    const free = await canBindAgentWitchLocalAppPort(59123);
    expect(typeof free).toBe("boolean");
    expect(typeof ok).toBe("boolean");
  });
});
