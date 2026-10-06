import { describe, expect, it } from "vitest";

import { resolveHomeConnectGuideCtas } from "@/features/home/utils/resolveHomeConnectGuideCtas";

describe("resolveHomeConnectGuideCtas (HOME-067)", () => {
  it("HARD: keeps Connect install command on desktop even when local app looks installed", () => {
    const ctas = resolveHomeConnectGuideCtas({
      isMobileClient: false,
      isCheckingLocalApp: false,
      isLocalAppInstalled: true,
    });
    expect(ctas.showConnectInstallCommand).toBe(true);
    expect(ctas.showAppDownloadCta).toBe(false);
  });

  it("hides Connect install command on mobile", () => {
    expect(
      resolveHomeConnectGuideCtas({
        isMobileClient: true,
        isCheckingLocalApp: false,
        isLocalAppInstalled: false,
      }).showConnectInstallCommand,
    ).toBe(false);
  });
});
