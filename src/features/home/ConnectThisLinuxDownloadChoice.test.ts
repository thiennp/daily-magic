import { describe, expect, it } from "vitest";

import {
  buildAgentWitchLocalLinuxAppImageDownloadUrl,
  buildAgentWitchLocalLinuxDebDownloadUrl,
} from "@/lib/agentWitch/buildAgentWitchLocalLinuxAppDownloadUrl";

describe("ConnectThisLinuxDownloadChoice wiring", () => {
  it("uses the tag-pinned release URLs for AppImage and deb links", () => {
    expect(buildAgentWitchLocalLinuxAppImageDownloadUrl()).toContain(
      "/releases/download/awl-linux-v0.1.0/AgentWitchLocal-x86_64.AppImage",
    );
    expect(buildAgentWitchLocalLinuxDebDownloadUrl()).toContain(
      "/releases/download/awl-linux-v0.1.0/agent-witch-local_0.1.0_amd64.deb",
    );
  });
});
