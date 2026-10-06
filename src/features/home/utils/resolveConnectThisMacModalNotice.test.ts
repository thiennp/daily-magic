import { describe, expect, it } from "vitest";

import { resolveConnectThisMacModalNotice } from "@/features/home/utils/resolveConnectThisMacModalNotice";

const base = {
  tooOldRefusal: null,
  thisMacDevice: null,
  isThisMacReachable: false,
  isWakeServerReachable: false,
} as const;

describe("resolveConnectThisMacModalNotice", () => {
  it("shows version_too_old for a 409 agent_witch_local_too_old refuse", () => {
    expect(
      resolveConnectThisMacModalNotice({
        ...base,
        tooOldRefusal: {
          error: "agent_witch_local_too_old",
          installBundleVersion: "3",
          minBundleVersion: "200",
          downloadUrl: "/download",
        },
      }),
    ).toEqual({
      kind: "version_too_old",
      installBundleVersion: "3",
      minBundleVersion: "200",
      downloadUrl: "/download",
    });
  });

  it("shows version_too_old when the this-Mac row is connectVersionStatus too_old (even if live)", () => {
    expect(
      resolveConnectThisMacModalNotice({
        ...base,
        thisMacDevice: {
          connectVersionStatus: "too_old",
          installBundleVersion: null,
        },
        isThisMacReachable: true,
        isWakeServerReachable: true,
      }),
    ).toMatchObject({
      kind: "version_too_old",
      installBundleVersion: null,
      downloadUrl: "/download",
    });
  });

  it("shows not_running when this computer is paired but AWL is unreachable", () => {
    expect(
      resolveConnectThisMacModalNotice({
        ...base,
        thisMacDevice: {
          connectVersionStatus: "ok",
          installBundleVersion: "260",
        },
      }),
    ).toEqual({ kind: "not_running" });
  });

  it("shows retry when AWL answers locally but the row is not live", () => {
    expect(
      resolveConnectThisMacModalNotice({
        ...base,
        thisMacDevice: {
          connectVersionStatus: "ok",
          installBundleVersion: "260",
        },
        isWakeServerReachable: true,
      }),
    ).toEqual({ kind: "retry" });
  });

  it("falls back to the download/install body for an unpaired computer", () => {
    expect(resolveConnectThisMacModalNotice(base)).toBeNull();
  });
});
