import { describe, expect, it } from "vitest";

import {
  buildAgentWitchLocalInstallUpdateHeaderButtonHtml,
  buildAgentWitchLocalInstallUpdatePromptHtml,
} from "./buildAgentWitchLocalInstallUpdatePromptHtml";

describe("buildAgentWitchLocalInstallUpdatePromptHtml", () => {
  it("renders update UI only when a newer bundle exists", () => {
    expect(
      buildAgentWitchLocalInstallUpdatePromptHtml({
        updateAvailable: false,
        localBundleVersion: "90",
        remoteBundleVersion: "90",
        checkError: null,
      }),
    ).toBe("");

    const html = buildAgentWitchLocalInstallUpdatePromptHtml({
      updateAvailable: true,
      localBundleVersion: "89",
      remoteBundleVersion: "91",
      checkError: null,
    });

    expect(html).toContain("Update available");
    expect(html).toContain('action="/api/update"');
    expect(html).toContain("A newer Agent Witch is ready");

    expect(
      buildAgentWitchLocalInstallUpdateHeaderButtonHtml({
        updateAvailable: true,
        localBundleVersion: "89",
        remoteBundleVersion: "91",
        checkError: null,
      }),
    ).toContain("Update");
  });
});
