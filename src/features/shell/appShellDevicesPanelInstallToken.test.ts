import { readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

const read = (relativePath: string): string =>
  readFileSync(join(process.cwd(), relativePath), "utf8");

/**
 * SHELL-006: POST /api/agent-witch/install-token reserves a device row and
 * revokes older placeholders, so it must never fire just because a page with
 * the AppShell devices rail loaded (desktop mounts the panel twice).
 */
describe("AppShellDevicesPanel install-token side effect", () => {
  it("does not mint an install token on mount", () => {
    const source = read("src/features/shell/AppShellDevicesPanel.tsx");
    expect(source).not.toContain("usePersonalizedAgentWitchInstallCommand");
    expect(source).not.toContain("fetchAgentWitchInstallToken");
    expect(source).toContain('installCommand=""');
  });

  it("keeps the Connect buttons minting lazily when their modal opens", () => {
    for (const file of [
      "src/features/home/ConnectAnotherMacButton.tsx",
      "src/features/home/ConnectThisMacButton.tsx",
    ]) {
      const source = read(file);
      expect(source).toMatch(
        /usePersonalizedAgentWitchInstallCommand\(\{\s*enabled: isModalOpen,/,
      );
      expect(source).toContain("commitIdentityWhenDisabled: true");
    }
  });

  it("still renders the devices rail in both desktop and mobile slots", () => {
    expect(read("src/features/shell/AppShellSidebar.tsx")).toContain(
      "<AppShellDevicesPanel />",
    );
    expect(read("src/features/shell/AppShell.tsx")).toContain(
      "<AppShellDevicesPanel />",
    );
  });
});
