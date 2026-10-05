import { describe, expect, it } from "vitest";

import {
  AGENT_WITCH_LOCAL_MAC_APP_DMG_ASSET_NAME,
  buildAgentWitchLocalMacAppDownloadUrl,
} from "@/lib/agentWitch/buildAgentWitchLocalMacAppDownloadUrl";

describe("buildAgentWitchLocalMacAppDownloadUrl", () => {
  it("returns the stable GitHub releases/latest download URL", () => {
    expect(buildAgentWitchLocalMacAppDownloadUrl()).toBe(
      `https://github.com/thiennp/daily-magic/releases/latest/download/${AGENT_WITCH_LOCAL_MAC_APP_DMG_ASSET_NAME}`,
    );
  });

  it("keeps the fixed asset name for CI release uploads", () => {
    expect(AGENT_WITCH_LOCAL_MAC_APP_DMG_ASSET_NAME).toBe("AgentWitchLocal.dmg");
  });
});
