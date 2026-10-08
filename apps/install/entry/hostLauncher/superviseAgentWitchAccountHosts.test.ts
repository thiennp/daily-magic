import { describe, expect, it, vi } from "vitest";

import type { AgentWitchHostServicesFile } from "@agent-witch/install-layout/types";

import {
  AGENT_WITCH_ACCOUNT_HOST_RESPAWN_MS,
  buildAgentWitchAccountHostEnv,
  superviseAgentWitchAccountHostsOnce,
} from "./superviseAgentWitchAccountHosts";

const GMAIL = "nguyenphongthien@gmail.com";
const AGT = "agt-c7f998a3@agents.agentwitch.com";

const services: AgentWitchHostServicesFile = {
  version: 1,
  mode: "per-account",
  updatedAt: "2026-10-08T00:00:00.000Z",
  accounts: [
    {
      email: GMAIL,
      launchAgentLabel: "com.agent-witch.aaaaaaaaaaaa",
      systemdUnitName: "agent-witch-aaaaaaaaaaaa.service",
      wakePort: 47900,
    },
    {
      email: AGT,
      launchAgentLabel: "com.agent-witch.bbbbbbbbbbbb",
      systemdUnitName: "agent-witch-bbbbbbbbbbbb.service",
      wakePort: 47901,
    },
  ],
};

const row = (email: string, pid: number) => ({
  email,
  port: email === GMAIL ? 65376 : 60704,
  pid,
  startedAt: "2026-10-08T00:00:00.000Z",
});

describe("superviseAgentWitchAccountHostsOnce (AWL-ISO-1 spawn mode)", () => {
  it("spawns only accounts without a live host, rate-limited per account", () => {
    const spawnHost = vi.fn();
    const lastSpawnAtByEmail = new Map<string, number>();
    const nowMs = { value: 1_000_000 };
    const deps = {
      readDiscovery: () => [row(GMAIL, 111), row(AGT, 222)],
      isProcessAlive: (pid: number) => pid === 111,
      spawnHost,
      now: () => nowMs.value,
    };

    const first = superviseAgentWitchAccountHostsOnce({
      installDir: "/tmp/aw-not-used",
      services,
      lastSpawnAtByEmail,
      selfPid: 999,
      deps,
    });
    expect(first).toEqual([AGT]);
    expect(spawnHost).toHaveBeenCalledWith({
      installDir: "/tmp/aw-not-used",
      account: services.accounts[1],
    });

    nowMs.value += AGENT_WITCH_ACCOUNT_HOST_RESPAWN_MS - 1;
    expect(
      superviseAgentWitchAccountHostsOnce({
        installDir: "/tmp/aw-not-used",
        services,
        lastSpawnAtByEmail,
        selfPid: 999,
        deps,
      }),
    ).toEqual([]);

    nowMs.value += 1;
    expect(
      superviseAgentWitchAccountHostsOnce({
        installDir: "/tmp/aw-not-used",
        services,
        lastSpawnAtByEmail,
        selfPid: 999,
        deps,
      }),
    ).toEqual([AGT]);
    expect(spawnHost).toHaveBeenCalledTimes(2);
  });

  it("never counts the launcher's own pid as an account host", () => {
    const spawnHost = vi.fn();
    const spawned = superviseAgentWitchAccountHostsOnce({
      installDir: "/tmp/aw-not-used",
      services,
      lastSpawnAtByEmail: new Map(),
      selfPid: 555,
      deps: {
        readDiscovery: () => [row(GMAIL, 555), row(AGT, 556)],
        isProcessAlive: () => true,
        spawnHost,
        now: () => 0,
      },
    });
    expect(spawned).toEqual([GMAIL]);
  });

  it("pins the spawned host env to one account", () => {
    const baseEnv = {
      PATH: "/usr/bin",
      AGENT_WITCH_PROFILE: GMAIL,
    } as unknown as NodeJS.ProcessEnv;
    const env = buildAgentWitchAccountHostEnv(services.accounts[1]!, baseEnv);
    expect(env).toEqual({
      PATH: "/usr/bin",
      AGENT_WITCH_HOST_ACCOUNT: AGT,
      AGENT_WITCH_PROFILE: AGT,
      AGENT_WITCH_WAKE_PORT: "47901",
    });
  });
});
