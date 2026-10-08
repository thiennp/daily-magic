import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { afterEach, describe, expect, it } from "vitest";

import { resolveAgentWitchAccountHash } from "@agent-witch/install-layout";

import { resolveAgentWitchMachineLeasePath } from "./claimAgentWitchMachineLease";
import { resolveAgentWitchLiveAppHealthPorts } from "./ensureAgentWitchCoupledLiveAppHealth";
import {
  readAgentWitchProcessHostAccount,
  shouldTerminateAgentWitchSibling,
} from "./terminateOtherAgentWitchClientProcesses";

const GMAIL = "nguyenphongthien@gmail.com";
const AGT = "agt-c7f998a3@agents.agentwitch.com";

const dirs: string[] = [];

afterEach(() => {
  for (const dir of dirs.splice(0)) {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

describe("machine lease per account (AWL-ISO-1)", () => {
  it("keeps the legacy lease path for the monolith and one lease per account", () => {
    expect(resolveAgentWitchMachineLeasePath("Mac.Local", null)).toBe(
      path.join(os.tmpdir(), "com.agent-witch.mac.local.lease.json"),
    );
    const gmail = resolveAgentWitchMachineLeasePath("mac.local", GMAIL);
    const agt = resolveAgentWitchMachineLeasePath("mac.local", AGT);
    expect(gmail).toBe(
      path.join(
        os.tmpdir(),
        `com.agent-witch.mac.local.${resolveAgentWitchAccountHash(GMAIL)}.lease.json`,
      ),
    );
    expect(agt).not.toBe(gmail);
  });
});

describe("sibling termination per account (AWL-ISO-1)", () => {
  it.each([
    // self, sibling, hostServicesPresent, expected
    [null, null, false, true],
    [null, undefined, false, true],
    [null, undefined, true, false],
    [null, GMAIL, true, false],
    [null, GMAIL, false, false],
    [GMAIL, GMAIL, true, true],
    [GMAIL, AGT, true, false],
    [GMAIL, null, true, false],
    [GMAIL, undefined, true, false],
  ] as const)(
    "self=%s sibling=%s services=%s -> %s",
    (selfAccountEmail, siblingAccountEmail, hostServicesPresent, expected) => {
      expect(
        shouldTerminateAgentWitchSibling({
          selfAccountEmail,
          siblingAccountEmail,
          hostServicesPresent,
        }),
      ).toBe(expected);
    },
  );

  it("reads AGENT_WITCH_HOST_ACCOUNT from /proc environ on Linux", () => {
    expect(
      readAgentWitchProcessHostAccount(42, {
        platform: "linux",
        readFile: (filePath) => {
          expect(filePath).toBe("/proc/42/environ");
          return `PATH=/usr/bin\0AGENT_WITCH_HOST_ACCOUNT=${AGT.toUpperCase()}\0`;
        },
      }),
    ).toBe(AGT);
    expect(
      readAgentWitchProcessHostAccount(42, {
        platform: "linux",
        readFile: () => "PATH=/usr/bin\0",
      }),
    ).toBeNull();
    expect(
      readAgentWitchProcessHostAccount(42, {
        platform: "linux",
        readFile: () => {
          throw new Error("EACCES");
        },
      }),
    ).toBeUndefined();
  });

  it("reads AGENT_WITCH_HOST_ACCOUNT from ps eww on macOS", () => {
    expect(
      readAgentWitchProcessHostAccount(7, {
        platform: "darwin",
        readPsEnv: () =>
          `/usr/local/bin/node /x/agent-witch.js HOME=/Users/t AGENT_WITCH_HOST_ACCOUNT=${GMAIL}\n`,
      }),
    ).toBe(GMAIL);
  });
});

describe("live app health ports per account (AWL-ISO-1)", () => {
  it("probes only the account's own discovery port, else its saved port", () => {
    const installDir = fs.mkdtempSync(
      path.join(os.tmpdir(), "awl-iso1-ports-"),
    );
    dirs.push(installDir);
    fs.writeFileSync(
      path.join(installDir, "local-app-accounts.json"),
      JSON.stringify({
        accounts: [
          {
            email: GMAIL,
            port: 65376,
            pid: 1,
            startedAt: "2026-10-08T00:00:00.000Z",
          },
          {
            email: AGT,
            port: 60704,
            pid: 2,
            startedAt: "2026-10-08T00:00:00.000Z",
          },
        ],
      }),
    );
    expect(
      resolveAgentWitchLiveAppHealthPorts(installDir, { accountEmail: AGT }),
    ).toEqual([60704]);

    const otherDir = path.join(installDir, "profiles", "other@example.com");
    fs.mkdirSync(otherDir, { recursive: true });
    fs.writeFileSync(
      path.join(otherDir, "local-app-port.json"),
      JSON.stringify({ localAppPort: 61000 }),
    );
    expect(
      resolveAgentWitchLiveAppHealthPorts(installDir, {
        accountEmail: "other@example.com",
      }),
    ).toEqual([61000]);
    expect(
      resolveAgentWitchLiveAppHealthPorts(installDir, {
        accountEmail: "none@example.com",
      }),
    ).toEqual([]);
  });
});
