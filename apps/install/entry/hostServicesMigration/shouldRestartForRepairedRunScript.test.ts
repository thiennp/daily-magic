import { describe, expect, it } from "vitest";

import { shouldRestartForRepairedRunScript } from "./shouldRestartForRepairedRunScript";

const account = {
  kind: "account",
  email: "nguyenphongthien@gmail.com",
} as const;

describe("shouldRestartForRepairedRunScript (d5e39215)", () => {
  it("restarts a macOS account host started with another account's profile", () => {
    expect(
      shouldRestartForRepairedRunScript({
        runScriptCurrent: true,
        platform: "darwin",
        scope: account,
        envProfile: "agt-c7f998a3@agents.agentwitch.com",
      }),
    ).toBe(true);
  });

  it("does not restart when the profile already matches (no loop)", () => {
    expect(
      shouldRestartForRepairedRunScript({
        runScriptCurrent: true,
        platform: "darwin",
        scope: account,
        envProfile: "NguyenPhongThien@gmail.com",
      }),
    ).toBe(false);
  });

  it("does not restart when run.sh could not be repaired, off macOS, or for the launcher", () => {
    expect(
      shouldRestartForRepairedRunScript({
        runScriptCurrent: false,
        platform: "darwin",
        scope: account,
        envProfile: "x@y.z",
      }),
    ).toBe(false);
    expect(
      shouldRestartForRepairedRunScript({
        runScriptCurrent: true,
        platform: "linux",
        scope: account,
        envProfile: "x@y.z",
      }),
    ).toBe(false);
    expect(
      shouldRestartForRepairedRunScript({
        runScriptCurrent: true,
        platform: "darwin",
        scope: {
          kind: "launcher",
          services: {
            version: 1,
            mode: "per-account",
            updatedAt: "",
            accounts: [],
          },
        },
        envProfile: "x@y.z",
      }),
    ).toBe(false);
  });
});
