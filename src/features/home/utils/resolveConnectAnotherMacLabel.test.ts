import { describe, expect, it } from "vitest";

import { resolveConnectAnotherMacLabel } from "@/features/home/utils/resolveConnectAnotherMacLabel";

describe("resolveConnectAnotherMacLabel", () => {
  it('says "Connect a Mac" when there are no devices (HOME-004)', () => {
    expect(resolveConnectAnotherMacLabel(false)).toBe("Connect a Mac");
  });

  it('says "Connect another Mac" when devices already exist (HOME-004)', () => {
    expect(resolveConnectAnotherMacLabel(true)).toBe("Connect another Mac");
  });
});
