import { describe, expect, it } from "vitest";

import { resolveHomeNotLinkedConnectBlockState } from "@/features/home/utils/resolveHomeNotLinkedConnectBlockState";

describe("resolveHomeNotLinkedConnectBlockState", () => {
  it("prefers connected when this computer is linked", () => {
    expect(
      resolveHomeNotLinkedConnectBlockState({
        shouldShowConnectThisMac: false,
        isConnecting: true,
        isFailed: true,
        hasConnectedThisComputer: true,
      }),
    ).toBe("connected");
  });

  it("shows connecting while install is engaged", () => {
    expect(
      resolveHomeNotLinkedConnectBlockState({
        shouldShowConnectThisMac: true,
        isConnecting: true,
        isFailed: false,
        hasConnectedThisComputer: false,
      }),
    ).toBe("connecting");
  });

  it("shows failed when Local is not running", () => {
    expect(
      resolveHomeNotLinkedConnectBlockState({
        shouldShowConnectThisMac: true,
        isConnecting: false,
        isFailed: true,
        hasConnectedThisComputer: false,
      }),
    ).toBe("failed");
  });

  it("shows not_linked as the default connect state", () => {
    expect(
      resolveHomeNotLinkedConnectBlockState({
        shouldShowConnectThisMac: true,
        isConnecting: false,
        isFailed: false,
        hasConnectedThisComputer: false,
      }),
    ).toBe("not_linked");
  });
});
