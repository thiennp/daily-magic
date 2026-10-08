import { describe, expect, it } from "vitest";

import {
  isAntigravityCliHeadlessPermissionDeniedInOutput,
  resolveAntigravityCliHeadlessRunFailureReason,
} from "@/lib/dispatch/isAntigravityCliHeadlessRunFailureInOutput";

describe("isAntigravityCliHeadlessRunFailureInOutput", () => {
  const jetskiDenied =
    'jetski: no output produced — a tool required the "command" permission that headless mode cannot prompt for, so it was auto-denied. Add an allow-rule under permissions.allow in settings.json (e.g. command(<target>)).';

  it("detects jetski permission auto-deny output", () => {
    expect(isAntigravityCliHeadlessPermissionDeniedInOutput(jetskiDenied)).toBe(
      true,
    );
    expect(
      resolveAntigravityCliHeadlessRunFailureReason(jetskiDenied),
    ).toContain("auto-denied");
  });

  it("returns null for ordinary successful output", () => {
    expect(
      resolveAntigravityCliHeadlessRunFailureReason("Updated README.md"),
    ).toBeNull();
  });
});
