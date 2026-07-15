import { describe, expect, it } from "vitest";

import { resolveConnectAnotherMacLabel } from "@/features/home/utils/resolveConnectAnotherMacLabel";

describe("resolveConnectAnotherMacLabel", () => {
  it('says "Add a Mac" when there are no devices (HOME-004)', () => {
    expect(resolveConnectAnotherMacLabel(false)).toBe("Add a Mac");
  });

  it('says "Add another Mac" when devices already exist (HOME-004)', () => {
    expect(resolveConnectAnotherMacLabel(true)).toBe("Add another Mac");
  });
});
