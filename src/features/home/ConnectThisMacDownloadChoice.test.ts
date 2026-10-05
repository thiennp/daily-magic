import { describe, expect, it } from "vitest";

import { buildAgentWitchLocalMacAppDownloadUrl } from "@/lib/agentWitch/buildAgentWitchLocalMacAppDownloadUrl";

describe("ConnectThisMacDownloadChoice wiring", () => {
  it("uses the stable releases/latest URL for the Download for Mac link", () => {
    expect(buildAgentWitchLocalMacAppDownloadUrl()).toContain(
      "/releases/latest/download/AgentWitchLocal.dmg",
    );
  });
});
