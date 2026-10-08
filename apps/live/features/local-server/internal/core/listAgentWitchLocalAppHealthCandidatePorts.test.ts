import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { afterEach, describe, expect, it } from "vitest";

import { writeAgentWitchHostLocalAppAccountsDiscovery } from "./agentWitchHostLocalAppAccountsDiscovery";
import { listAgentWitchLocalAppHealthCandidatePorts } from "./listAgentWitchLocalAppHealthCandidatePorts";

const roots: string[] = [];

afterEach(() => {
  for (const root of roots.splice(0)) {
    fs.rmSync(root, { recursive: true, force: true });
  }
});

const makeProfilesDir = (): string => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "awl-candidate-ports-"));
  roots.push(root);
  const profilesDir = path.join(root, "profiles");
  fs.mkdirSync(profilesDir, { recursive: true });
  return profilesDir;
};

const writeProfile = (
  profilesDir: string,
  email: string,
  port: number | null,
): void => {
  const dir = path.join(profilesDir, email);
  fs.mkdirSync(dir, { recursive: true });
  if (port !== null) {
    fs.writeFileSync(
      path.join(dir, "local-app-port.json"),
      JSON.stringify({ localAppPort: port }),
    );
  }
};

describe("listAgentWitchLocalAppHealthCandidatePorts", () => {
  it("lists discovery ports first and never probes legacy 43347", () => {
    const profilesDir = makeProfilesDir();
    const installDir = path.dirname(profilesDir);
    writeAgentWitchHostLocalAppAccountsDiscovery(installDir, [
      {
        email: "a@example.com",
        port: 53001,
        pid: process.pid,
        startedAt: new Date().toISOString(),
      },
      {
        email: "b@example.com",
        port: 53002,
        pid: process.pid,
        startedAt: new Date().toISOString(),
      },
    ]);
    writeProfile(profilesDir, "a@example.com", 99999);

    const ports = listAgentWitchLocalAppHealthCandidatePorts(profilesDir);

    expect(ports[0]).toBe(53001);
    expect(ports).toContain(53002);
    expect(ports).not.toContain(43347);
  });

  it("returns an empty list when no discovery or shims exist", () => {
    expect(
      listAgentWitchLocalAppHealthCandidatePorts(
        path.join(os.tmpdir(), "awl-missing-profiles-x", "profiles"),
      ),
    ).toEqual([]);
  });
});
