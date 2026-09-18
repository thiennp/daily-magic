import { describe, expect, it } from "vitest";

import { shouldRetryUnreachableWakeIdentityProbe } from "@/features/agent-witch/utils/shouldRetryUnreachableWakeIdentityProbe";

describe("shouldRetryUnreachableWakeIdentityProbe (HOME-050)", () => {
  it("retries when the tab is visible and wake identity is missing", () => {
    expect(
      shouldRetryUnreachableWakeIdentityProbe({
        wakeReachable: false,
        hasIdentity: false,
        isDocumentVisible: true,
      }),
    ).toBe(true);
  });

  it("does not retry while the tab is hidden", () => {
    expect(
      shouldRetryUnreachableWakeIdentityProbe({
        wakeReachable: false,
        hasIdentity: false,
        isDocumentVisible: false,
      }),
    ).toBe(false);
  });

  it("does not retry after a successful wake identity probe", () => {
    expect(
      shouldRetryUnreachableWakeIdentityProbe({
        wakeReachable: true,
        hasIdentity: true,
        isDocumentVisible: true,
      }),
    ).toBe(false);
  });
});
