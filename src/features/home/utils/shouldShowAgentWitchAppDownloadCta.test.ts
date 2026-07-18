import { describe, expect, it } from "vitest";

import { shouldShowAgentWitchAppDownloadCta } from "@/features/home/utils/shouldShowAgentWitchAppDownloadCta";

describe("shouldShowAgentWitchAppDownloadCta", () => {
  it("HOME-019: hides download while checking local wake identity", () => {
    expect(
      shouldShowAgentWitchAppDownloadCta({
        isCheckingLocalApp: true,
        isLocalAppInstalled: false,
      }),
    ).toBe(false);
  });

  it("HOME-019: hides download when local Agent Witch app is already installed", () => {
    expect(
      shouldShowAgentWitchAppDownloadCta({
        isCheckingLocalApp: false,
        isLocalAppInstalled: true,
      }),
    ).toBe(false);
  });

  it("HOME-019: shows download only when local app is missing", () => {
    expect(
      shouldShowAgentWitchAppDownloadCta({
        isCheckingLocalApp: false,
        isLocalAppInstalled: false,
      }),
    ).toBe(true);
  });
});
