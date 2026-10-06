import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { describe, expect, it } from "vitest";

const readSibling = (name: string): string =>
  readFileSync(join(dirname(fileURLToPath(import.meta.url)), name), "utf8");

describe("usePersonalizedAgentWitchInstallCommand HOME-066", () => {
  it("holds setLocalMacTokenHash / wake refresh while modal enabled", () => {
    const source = readSibling("usePersonalizedAgentWitchInstallCommand.ts");
    expect(source).toContain("useDeferredInstallTokenIdentityCommit");
    expect(source).toContain("commitIdentityWhenDisabled");
    expect(source).not.toContain("setLocalMacTokenHash");
    expect(source).not.toContain("refreshLocalAgentWitchIdentity");
    const deferred = readSibling("useDeferredInstallTokenIdentityCommit.ts");
    expect(deferred).toContain("shouldHoldInstallTokenIdentityCommit");
    expect(deferred).toContain("pendingTokenHashRef");
  });

  it("modal Connect / Update callers opt into deferred identity commit", () => {
    const root = join(dirname(fileURLToPath(import.meta.url)), "..");
    for (const file of [
      "ConnectThisMacButton.tsx",
      "ConnectAnotherMacButton.tsx",
      "hooks/useThisMacLocalInstallActions.ts",
    ]) {
      const source = readFileSync(join(root, file), "utf8");
      expect(source).toContain("commitIdentityWhenDisabled: true");
    }
  });

  it("guide still mints with immediate identity (enabled: showInstallCta)", () => {
    const guide = readFileSync(
      join(
        dirname(fileURLToPath(import.meta.url)),
        "../HomeConnectComputerGuide.tsx",
      ),
      "utf8",
    );
    expect(guide).toMatch(
      /usePersonalizedAgentWitchInstallCommand\(\{\s*enabled: showInstallCta,/,
    );
    expect(guide).not.toContain("commitIdentityWhenDisabled");
  });
});
