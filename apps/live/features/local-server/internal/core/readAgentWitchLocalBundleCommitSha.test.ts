import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { describe, expect, it } from "vitest";

import { readAgentWitchLocalBundleCommitSha } from "./readAgentWitchLocalBundleCommitSha";

describe("readAgentWitchLocalBundleCommitSha (DF-032)", () => {
  it("returns full + short sha for a stamped bundle", () => {
    expect(
      readAgentWitchLocalBundleCommitSha(
        "80A2449DBF1A110BBB8EB9B6C8EA2C7FAA77C5BC",
      ),
    ).toEqual({
      commitSha: "80a2449dbf1a110bbb8eb9b6c8ea2c7faa77c5bc",
      shortCommitSha: "80a2449",
    });
  });

  it("returns nulls when unstamped or invalid", () => {
    expect(readAgentWitchLocalBundleCommitSha("")).toEqual({
      commitSha: null,
      shortCommitSha: null,
    });
    expect(readAgentWitchLocalBundleCommitSha("main")).toEqual({
      commitSha: null,
      shortCommitSha: null,
    });
  });

  it("GET /health spreads the bundle commit", () => {
    const source = fs.readFileSync(
      path.join(
        path.dirname(fileURLToPath(import.meta.url)),
        "startAgentWitchLocalApp.ts",
      ),
      "utf8",
    );
    const health = source.slice(source.indexOf('pathname === "/health"'));
    expect(health.slice(0, health.indexOf("return;"))).toContain(
      "...readAgentWitchLocalBundleCommitSha()",
    );
  });
});
