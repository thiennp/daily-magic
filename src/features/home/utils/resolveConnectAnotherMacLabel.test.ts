import { describe, expect, it } from "vitest";

import { resolveConnectAnotherMacLabel } from "@/features/home/utils/resolveConnectAnotherMacLabel";

describe("resolveConnectAnotherMacLabel", () => {
  it('says "Connect this computer" when there are no computers (HOME-004, V5-2)', () => {
    expect(resolveConnectAnotherMacLabel(false)).toBe("Connect this computer");
    expect(resolveConnectAnotherMacLabel(false)).not.toMatch(/Add a computer/);
  });

  it('says "Connect another computer" when devices already exist (HOME-004, V5-2)', () => {
    expect(resolveConnectAnotherMacLabel(true)).toBe(
      "Connect another computer",
    );
  });
});
