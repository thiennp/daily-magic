import { describe, expect, it } from "vitest";

import { shouldOpenConnectInstallPasteModal } from "@/features/home/utils/shouldOpenConnectInstallPasteModal";

describe("shouldOpenConnectInstallPasteModal (HOME-054)", () => {
  it("opens the paste modal only on macOS", () => {
    expect(shouldOpenConnectInstallPasteModal("mac")).toBe(true);
    expect(shouldOpenConnectInstallPasteModal("linux")).toBe(false);
    expect(shouldOpenConnectInstallPasteModal("windows")).toBe(false);
    expect(shouldOpenConnectInstallPasteModal("other")).toBe(false);
  });
});
