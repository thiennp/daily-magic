import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const readSibling = (name: string): string =>
  readFileSync(join(dirname(fileURLToPath(import.meta.url)), name), "utf8");

describe("ConnectThisMacButton", () => {
  it("always opens the Connect modal (never disabled / no-op)", () => {
    const source = readSibling("ConnectThisMacButton.tsx");
    expect(source).toContain("onClick={handleOpenModal}");
    expect(source).not.toMatch(/<button[^>]*disabled=/);
    expect(source).toContain("useConnectThisMacModalNotice");
    expect(source).toContain("notice={notice}");
  });

  it("renders the Update AgentWitch Local too-old copy with a download link", () => {
    const source = readSibling("ConnectThisMacModalNotice.tsx");
    expect(source).toContain("AGENT_WITCH_LOCAL_TOO_OLD_COPY");
    expect(source).toContain("href={notice.downloadUrl}");
  });

  it("device list hides the separate This computer row when a row is already This computer", () => {
    const source = readSibling("HomeConnectedMacsDeviceList.tsx");
    expect(source).toContain(
      "shouldShowConnectThisMac && thisMacIdentity.thisMacDeviceId === null",
    );
  });

  it("HOME-066: defers install-token identity until the Connect modal closes", () => {
    const source = readSibling("ConnectThisMacButton.tsx");
    expect(source).toContain("commitIdentityWhenDisabled: true");
    expect(source).toMatch(
      /usePersonalizedAgentWitchInstallCommand\(\{\s*enabled: shouldMintCommand,/,
    );
  });
});
