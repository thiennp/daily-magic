import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { afterEach, describe, expect, it } from "vitest";

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
  files: { readonly port?: unknown; readonly range?: unknown },
): void => {
  const dir = path.join(profilesDir, email);
  fs.mkdirSync(dir, { recursive: true });
  if (files.port !== undefined) {
    fs.writeFileSync(
      path.join(dir, "local-app-port.json"),
      JSON.stringify(files.port),
    );
  }
  if (files.range !== undefined) {
    // Mac writes `"end" : 65391` (spaces) — still valid JSON.
    fs.writeFileSync(
      path.join(dir, "local-port-range.json"),
      JSON.stringify(files.range, null, 1),
    );
  }
};

describe("listAgentWitchLocalAppHealthCandidatePorts (DF-030/031)", () => {
  it("puts the saved listen port first, then the range, then legacy 43347", () => {
    const profilesDir = makeProfilesDir();
    writeProfile(profilesDir, "a@example.com", {
      port: { localAppPort: 65380 },
      range: { start: 65376, end: 65391 },
    });

    const ports = listAgentWitchLocalAppHealthCandidatePorts(profilesDir);

    expect(ports[0]).toBe(65380);
    expect(ports.slice(1, 16)).toEqual(
      Array.from({ length: 16 }, (_, i) => 65376 + i).filter(
        (p) => p !== 65380,
      ),
    );
    expect(ports.at(-1)).toBe(43347);
    expect(ports).toHaveLength(17);
  });

  it("covers every profile and ignores exhausted / invalid port files", () => {
    const profilesDir = makeProfilesDir();
    writeProfile(profilesDir, "a@example.com", {
      port: { portsExhausted: true },
    });
    writeProfile(profilesDir, "b@example.com", {
      port: { localAppPort: 49160 },
      range: { start: 49152, end: 49167 },
    });
    writeProfile(profilesDir, "c@example.com", {
      port: { localAppPort: "nope" },
    });

    const ports = listAgentWitchLocalAppHealthCandidatePorts(profilesDir);

    expect(ports[0]).toBe(49160);
    expect(ports).toContain(49152);
    expect(ports).toContain(49167);
    expect(ports.at(-1)).toBe(43347);
  });

  it("falls back to legacy 43347 when no profile has port files", () => {
    expect(
      listAgentWitchLocalAppHealthCandidatePorts(
        path.join(os.tmpdir(), "awl-missing-profiles-x"),
      ),
    ).toEqual([43347]);
  });
});
