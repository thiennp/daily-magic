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
    const another = read("src/features/home/ConnectAnotherMacButton.tsx");
    expect(another).toMatch(
      /usePersonalizedAgentWitchInstallCommand\(\{\s*enabled: isModalOpen,/,
    );
    expect(another).toContain("commitIdentityWhenDisabled: true");

    // Home Connect: on a Mac the command is minted only once the Terminal
    // section opens; useConnectTerminalSection still gates it on isModalOpen.
    const thisMac = read("src/features/home/ConnectThisMacButton.tsx");
    expect(thisMac).toMatch(
      /useConnectTerminalSection\(\{\s*operatingSystem,\s*isModalOpen\s*\}\)/,
    );
    expect(thisMac).toMatch(
      /usePersonalizedAgentWitchInstallCommand\(\{\s*enabled: shouldMintCommand,/,
    );
    expect(thisMac).toContain("commitIdentityWhenDisabled: true");
    expect(
      read("src/features/home/hooks/useConnectTerminalSection.ts"),
    ).toMatch(/shouldMintCommand:\s*input\.isModalOpen &&/);
  });

  it("still renders the devices rail in both desktop and mobile slots", () => {
    // V5-2: desktop slot is embedded in the sidebar panel (no nested card).
    expect(read("src/features/shell/AppShellSidebar.tsx")).toContain(
      "<AppShellDevicesPanel embedded />",
    );
    expect(read("src/features/shell/AppShell.tsx")).toContain(
      "<AppShellDevicesPanel />",
    );
  });
});
