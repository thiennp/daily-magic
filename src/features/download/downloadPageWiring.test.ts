import { readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

import { buildAgentWitchLocalMacAppDownloadUrl } from "@/lib/agentWitch/buildAgentWitchLocalMacAppDownloadUrl";
import { DOWNLOAD_PAGE_COPY } from "@/features/download/downloadPageCopy.constant";

const root = process.cwd();

describe("Download page wiring", () => {
  it("uses the same tag-pinned Mac release URL as Connect this computer", () => {
    expect(buildAgentWitchLocalMacAppDownloadUrl()).toContain(
      "/releases/download/awl-mac-v0.2.8/AgentWitchLocal\.dmg",
    );
  });

  it("DownloadMacAppCta imports the shared URL builder", () => {
    const source = readFileSync(
      join(root, "src/features/download/DownloadMacAppCta.tsx"),
      "utf8",
    );
    expect(source).toContain("buildAgentWitchLocalMacAppDownloadUrl");
    expect(source).not.toContain("github.com/thiennp/daily-magic/releases");
  });

  it("77c33bc5: step tabs have no vertical scroll box and keep the picked step in the URL", () => {
    const tabs = readFileSync(
      join(root, "src/features/download/DownloadStepTabs.tsx"),
      "utf8",
    );
    const wizard = readFileSync(
      join(root, "src/features/download/DownloadWizard.tsx"),
      "utf8",
    );
    expect(tabs).toContain("overflow-y-hidden");
    expect(tabs).toContain("onClick={() => onSelect(item.key)}");
    expect(wizard).toContain("window.history.replaceState");
  });

  it("names Apple Silicon in page copy", () => {
    expect(DOWNLOAD_PAGE_COPY.siliconNote).toMatch(/Apple Silicon/i);
  });

  it("non-Mac note links to /download without Windows WSL wording", () => {
    expect(DOWNLOAD_PAGE_COPY.nonMacNote).toMatch(/Apple Silicon/i);
    expect(DOWNLOAD_PAGE_COPY.nonMacNote).toMatch(/Linux/);
    expect(DOWNLOAD_PAGE_COPY.nonMacNote).not.toMatch(/menu bar app/i);
    expect(DOWNLOAD_PAGE_COPY.nonMacNote.toLowerCase()).not.toContain("wsl");
    expect(DOWNLOAD_PAGE_COPY.nonMacNote.toLowerCase()).not.toContain(
      "windows via",
    );
  });

  it("says the Mac app is Developer ID signed and notarized", () => {
    expect(DOWNLOAD_PAGE_COPY.signedNote).toMatch(/Developer ID/i);
    expect(DOWNLOAD_PAGE_COPY.signedNote).toMatch(/notarized/i);
    expect(DOWNLOAD_PAGE_COPY.signedNote.toLowerCase()).not.toContain(
      "unsigned",
    );
    expect(DOWNLOAD_PAGE_COPY.signedNote.toLowerCase()).not.toContain(
      "right-click",
    );
  });
});
