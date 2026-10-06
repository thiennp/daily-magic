import { describe, expect, it } from "vitest";

import { shouldHoldInstallTokenIdentityCommit } from "@/features/home/utils/shouldHoldInstallTokenIdentityCommit";

describe("shouldHoldInstallTokenIdentityCommit (HOME-066)", () => {
  it("holds while the modal is open and deferral is requested", () => {
    expect(
      shouldHoldInstallTokenIdentityCommit({
        commitIdentityWhenDisabled: true,
        enabled: true,
      }),
    ).toBe(true);
  });

  it("releases when the modal closes so identity can commit", () => {
    expect(
      shouldHoldInstallTokenIdentityCommit({
        commitIdentityWhenDisabled: true,
        enabled: false,
      }),
    ).toBe(false);
  });

  it("never holds when callers want immediate identity (guide / page load)", () => {
    expect(
      shouldHoldInstallTokenIdentityCommit({
        commitIdentityWhenDisabled: false,
        enabled: true,
      }),
    ).toBe(false);
  });
});
