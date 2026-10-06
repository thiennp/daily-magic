import { describe, expect, it } from "vitest";

import { resolveConnectAnotherMacLabel } from "@/features/home/utils/resolveConnectAnotherMacLabel";

describe("resolveConnectAnotherMacLabel", () => {
  it('says "Add a computer" when there are no devices (HOME-004)', () => {
    expect(resolveConnectAnotherMacLabel(false)).toBe("Add a computer");
  });

  it('says "Add another computer" when devices already exist (HOME-004)', () => {
    expect(resolveConnectAnotherMacLabel(true)).toBe("Add another computer");
  });
});
