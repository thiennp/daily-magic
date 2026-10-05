import { describe, expect, it } from "vitest";

import {
  AGENT_WITCH_LOCAL_LINUX_APP_APPIMAGE_ASSET_NAME,
  AGENT_WITCH_LOCAL_LINUX_APP_DEB_ASSET_NAME,
  AGENT_WITCH_LOCAL_LINUX_APP_RELEASE_TAG,
  buildAgentWitchLocalLinuxAppImageDownloadUrl,
  buildAgentWitchLocalLinuxDebDownloadUrl,
} from "@/lib/agentWitch/buildAgentWitchLocalLinuxAppDownloadUrl";

describe("buildAgentWitchLocalLinuxAppDownloadUrl", () => {
  it("returns tag-pinned AppImage and deb URLs", () => {
    expect(buildAgentWitchLocalLinuxAppImageDownloadUrl()).toBe(
      "https://github.com/thiennp/daily-magic/releases/download/awl-linux-v0.1.0/AgentWitchLocal-x86_64.AppImage",
    );
    expect(buildAgentWitchLocalLinuxDebDownloadUrl()).toBe(
      "https://github.com/thiennp/daily-magic/releases/download/awl-linux-v0.1.0/agent-witch-local_0.1.0_amd64.deb",
    );
  });

  it("does not use the repo-wide releases/latest URL", () => {
    expect(buildAgentWitchLocalLinuxAppImageDownloadUrl()).not.toContain(
      "/releases/latest/",
    );
    expect(buildAgentWitchLocalLinuxDebDownloadUrl()).not.toContain(
      "/releases/latest/",
    );
  });

  it("keeps fixed asset names and an awl-linux-v tag", () => {
    expect(AGENT_WITCH_LOCAL_LINUX_APP_APPIMAGE_ASSET_NAME).toBe(
      "AgentWitchLocal-x86_64.AppImage",
    );
    expect(AGENT_WITCH_LOCAL_LINUX_APP_DEB_ASSET_NAME).toBe(
      "agent-witch-local_0.1.0_amd64.deb",
    );
    expect(AGENT_WITCH_LOCAL_LINUX_APP_RELEASE_TAG).toMatch(
      /^awl-linux-v\d+\.\d+\.\d+$/,
    );
  });
});
