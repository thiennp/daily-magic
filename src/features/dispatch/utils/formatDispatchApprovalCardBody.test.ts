import { describe, expect, it } from "vitest";

import { DISPATCH_APPROVAL_CARD_COPY as C } from "@/features/dispatch/dispatchApprovalCardCopy.constant";
import { formatDispatchApprovalCardBody } from "@/features/dispatch/utils/formatDispatchApprovalCardBody";

describe("formatDispatchApprovalCardBody (S0 card)", () => {
  it("names the requester when known", () => {
    expect(formatDispatchApprovalCardBody("Sam")).toBe(
      "Sam wants to start a task on your computer.",
    );
  });

  it("uses the no-name line otherwise", () => {
    expect(formatDispatchApprovalCardBody(null)).toBe(
      "Someone in this project wants to start a task on your computer.",
    );
    expect(formatDispatchApprovalCardBody("  ")).toBe(C.bodyNoRequester);
  });

  it("has no jargon in any card string", () => {
    for (const value of Object.values(C)) {
      expect(value).not.toMatch(/agent|dispatch|machine/i);
    }
  });
});
