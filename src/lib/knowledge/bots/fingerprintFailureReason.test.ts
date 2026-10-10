import { describe, expect, it } from "vitest";

import { fingerprintFailureReason } from "./fingerprintFailureReason";

describe("fingerprintFailureReason", () => {
  it("treats the same mistake with different numbers, ids and paths as one", () => {
    const a = fingerprintFailureReason(
      "Build failed at step 3 in src/a/b.ts (ab12cd34)",
    );
    const b = fingerprintFailureReason(
      "build failed at step 7 in lib/x/y.ts (ff00aa11)",
    );
    expect(a).not.toBeNull();
    expect(a).toBe(b);
  });

  it("separates different mistakes and ignores empty reasons", () => {
    expect(fingerprintFailureReason("missing api key")).not.toBe(
      fingerprintFailureReason("lease expired"),
    );
    expect(fingerprintFailureReason("   ")).toBeNull();
    expect(fingerprintFailureReason("12345 /a/b/c 'x'")).toBeNull();
  });
});
