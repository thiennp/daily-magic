import { describe, expect, it } from "vitest";

import { resolveAgentWitchInstallId } from "./resolveAgentWitchInstallId";

const identity = (target: string): string => target;

describe("resolveAgentWitchInstallId (61e9c49e)", () => {
  it("differs for two installs on the same host and user", () => {
    const first = resolveAgentWitchInstallId({
      hostname: "box",
      installDir: "/home/box/.agent-witch",
      realpath: identity,
    });
    const second = resolveAgentWitchInstallId({
      hostname: "box",
      installDir: "/home/box/aw-e2e-home/.agent-witch",
      realpath: identity,
    });
    expect(first).toMatch(/^[a-f0-9]{16}$/);
    expect(second).not.toBe(first);
  });

  it("is stable for the same install folder", () => {
    const input = {
      hostname: "Box",
      installDir: "/home/box/.agent-witch",
      realpath: identity,
    };
    expect(resolveAgentWitchInstallId(input)).toBe(
      resolveAgentWitchInstallId({ ...input, hostname: "box" }),
    );
  });

  it("falls back to the raw path when realpath fails", () => {
    const failing = (): string => {
      throw new Error("ENOENT");
    };
    expect(
      resolveAgentWitchInstallId({
        hostname: "box",
        installDir: "/missing",
        realpath: failing,
      }),
    ).toBe(
      resolveAgentWitchInstallId({
        hostname: "box",
        installDir: "/missing",
        realpath: identity,
      }),
    );
  });
});
