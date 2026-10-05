import { readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

import { buildAgentWitchLocalMacAppDownloadUrl } from "@/lib/agentWitch/buildAgentWitchLocalMacAppDownloadUrl";
import { DOWNLOAD_PAGE_COPY } from "@/features/download/downloadPageCopy.constant";

const root = process.cwd();

describe("Download page wiring", () => {
  it("uses the same tag-pinned Mac release URL as Connect this Mac", () => {
    expect(buildAgentWitchLocalMacAppDownloadUrl()).toContain(
      "/releases/download/awl-mac-v0.1.0/AgentWitchLocal.dmg",
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

  it("names Apple Silicon in page copy", () => {
    expect(DOWNLOAD_PAGE_COPY.siliconNote).toMatch(/Apple Silicon/i);
  });

  it("non-Mac note links to /download without Windows WSL wording", () => {
    expect(DOWNLOAD_PAGE_COPY.nonMacNote).toMatch(/Apple Silicon/i);
    expect(DOWNLOAD_PAGE_COPY.nonMacNote.toLowerCase()).not.toContain("wsl");
    expect(DOWNLOAD_PAGE_COPY.nonMacNote.toLowerCase()).not.toContain(
      "windows via",
    );
  });
});
