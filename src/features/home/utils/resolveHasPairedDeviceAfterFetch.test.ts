import { describe, expect, it } from "vitest";

import { resolveHasPairedDeviceAfterFetch } from "@/features/home/utils/resolveHasPairedDeviceAfterFetch";

describe("resolveHasPairedDeviceAfterFetch", () => {
  it("returns true when the API reports active devices (HOME-002)", () => {
    expect(resolveHasPairedDeviceAfterFetch(false, 1, null)).toBe(true);
  });

  it("returns false when the API reports zero devices without error (HOME-002)", () => {
    expect(resolveHasPairedDeviceAfterFetch(true, 0, null)).toBe(false);
  });

  it("keeps the previous value when the fetch fails (HOME-002)", () => {
    expect(
      resolveHasPairedDeviceAfterFetch(
        true,
        0,
        "Could not load connected Macs.",
      ),
    ).toBe(true);
    expect(
      resolveHasPairedDeviceAfterFetch(
        false,
        0,
        "Could not load connected Macs.",
      ),
    ).toBe(false);
  });
});
