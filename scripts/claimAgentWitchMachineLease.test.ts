import { spawn } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it } from "vitest";

import {
  claimAgentWitchMachineLease,
  releaseAgentWitchMachineLease,
  resolveAgentWitchMachineLeasePath,
} from "./claimAgentWitchMachineLease";

const tempLeasePaths: string[] = [];
const childProcesses: ReturnType<typeof spawn>[] = [];

afterEach(() => {
  for (const child of childProcesses.splice(0)) {
    child.kill("SIGTERM");
  }

  for (const leasePath of tempLeasePaths.splice(0)) {
    fs.rmSync(leasePath, { force: true });
  }
});

describe("claimAgentWitchMachineLease", () => {
  it("AGENT-043: scopes lease file per hostname", () => {
    expect(resolveAgentWitchMachineLeasePath("Studio-Mac")).toContain(
      "com.agent-witch.studio-mac.lease.json",
    );
  });

  it("AGENT-043: rejects a fresh lease held by another macOS user", () => {
    const child = spawn(
      process.execPath,
      ["-e", "setInterval(() => {}, 1_000)"],
      { detached: true, stdio: "ignore" },
    );
    child.unref();
    childProcesses.push(child);

    const leasePath = path.join(
      os.tmpdir(),
      `agent-witch-lease-test-${process.pid}.json`,
    );
    tempLeasePaths.push(leasePath);

    fs.writeFileSync(
      leasePath,
      `${JSON.stringify({
        hostname: "Studio-Mac",
        macOsUsername: `not-${os.userInfo().username}`,
        pid: child.pid,
        claimedAt: new Date().toISOString(),
      })}\n`,
      "utf8",
    );

    const result = claimAgentWitchMachineLease({
      leasePath,
      platform: "darwin",
    });

    expect(result.ok).toBe(false);
  });

  it("AGENT-043: allows reclaim after release", () => {
    const leasePath = path.join(
      os.tmpdir(),
      `agent-witch-lease-reclaim-${process.pid}.json`,
    );
    tempLeasePaths.push(leasePath);

    expect(
      claimAgentWitchMachineLease({ leasePath, platform: "darwin" }),
    ).toEqual({ ok: true });
    releaseAgentWitchMachineLease({ leasePath, platform: "darwin" });
    expect(
      claimAgentWitchMachineLease({ leasePath, platform: "darwin" }),
    ).toEqual({ ok: true });
    releaseAgentWitchMachineLease({ leasePath, platform: "darwin" });
  });

  it("AGENT-059: rejects a fresh lease held by another process for the same user", () => {
    const child = spawn(
      process.execPath,
      ["-e", "setInterval(() => {}, 1_000)"],
      { detached: true, stdio: "ignore" },
    );
    child.unref();
    childProcesses.push(child);

    const leasePath = path.join(
      os.tmpdir(),
      `agent-witch-lease-same-user-${process.pid}.json`,
    );
    tempLeasePaths.push(leasePath);

    fs.writeFileSync(
      leasePath,
      `${JSON.stringify({
        hostname: "Studio-Mac",
        macOsUsername: os.userInfo().username,
        pid: child.pid,
        claimedAt: new Date().toISOString(),
      })}\n`,
      "utf8",
    );

    const result = claimAgentWitchMachineLease({
      leasePath,
      platform: "darwin",
    });

    expect(result.ok).toBe(false);
  });
});
