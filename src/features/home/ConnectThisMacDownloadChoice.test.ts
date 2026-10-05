import { describe, expect, it } from "vitest";

import { buildAgentWitchLocalMacAppDownloadUrl } from "@/lib/agentWitch/buildAgentWitchLocalMacAppDownloadUrl";

describe("ConnectThisMacDownloadChoice wiring", () => {
  it("uses the tag-pinned release URL for the Download for Mac link", () => {
    expect(buildAgentWitchLocalMacAppDownloadUrl()).toContain(
      "/releases/download/awl-mac-v0.1.0/AgentWitchLocal.dmg",
    );
  });
});
