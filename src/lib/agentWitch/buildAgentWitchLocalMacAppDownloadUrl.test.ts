import { describe, expect, it } from "vitest";

import {
  AGENT_WITCH_LOCAL_MAC_APP_DMG_ASSET_NAME,
  AGENT_WITCH_LOCAL_MAC_APP_RELEASE_TAG,
  buildAgentWitchLocalMacAppDownloadUrl,
} from "@/lib/agentWitch/buildAgentWitchLocalMacAppDownloadUrl";

describe("buildAgentWitchLocalMacAppDownloadUrl", () => {
  it("returns the tag-pinned GitHub release download URL", () => {
    expect(buildAgentWitchLocalMacAppDownloadUrl()).toBe(
      "https://github.com/thiennp/daily-magic/releases/download/awl-mac-v0.2.2/AgentWitchLocal.dmg",
    );
  });

  it("does not use the repo-wide releases/latest URL", () => {
    expect(buildAgentWitchLocalMacAppDownloadUrl()).not.toContain(
      "/releases/latest/",
    );
  });

  it("keeps the fixed asset name and an awl-mac-v tag for release uploads", () => {
    expect(AGENT_WITCH_LOCAL_MAC_APP_DMG_ASSET_NAME).toBe(
      "AgentWitchLocal.dmg",
    );
    expect(AGENT_WITCH_LOCAL_MAC_APP_RELEASE_TAG).toMatch(
      /^awl-mac-v\d+\.\d+\.\d+$/,
    );
  });
});
