import { describe, expect, it } from "vitest";

import { DOWNLOAD_PAGE_COPY } from "@/features/download/downloadPageCopy.constant";
import { buildAgentWitchLocalMacAppDownloadUrl } from "@/lib/agentWitch/buildAgentWitchLocalMacAppDownloadUrl";

describe("ConnectThisMacDownloadChoice wiring", () => {
  it("uses the tag-pinned release URL for the Download for Mac link", () => {
    expect(buildAgentWitchLocalMacAppDownloadUrl()).toContain(
      "/releases/download/awl-mac-v0.2.0/AgentWitchLocal\.dmg",
    );
  });

  it("uses the shared signed/notarized Mac app note", () => {
    expect(DOWNLOAD_PAGE_COPY.signedNote).toMatch(/Developer ID/i);
    expect(DOWNLOAD_PAGE_COPY.signedNote).toMatch(/notarized/i);
  });
});
