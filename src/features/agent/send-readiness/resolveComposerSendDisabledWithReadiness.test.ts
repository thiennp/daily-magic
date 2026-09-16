import { describe, expect, it } from "vitest";

import { buildSendReadinessBannerFromReasonCode } from "@/features/agent/send-readiness/sendReadinessBannerCopy.constant";
import { resolveComposerSendDisabledWithReadiness } from "@/features/agent/send-readiness/resolveComposerSendDisabledWithReadiness";

describe("resolveComposerSendDisabledWithReadiness (OPEN-003)", () => {
  it("blocks send when readiness banner blocksSend even if form would allow send", () => {
    const banner = buildSendReadinessBannerFromReasonCode("update_needed");

    expect(
      resolveComposerSendDisabledWithReadiness({
        isSendDisabled: false,
        readinessBanner: banner,
      }),
    ).toBe(true);
  });

  it("does not block when banner is null", () => {
    expect(
      resolveComposerSendDisabledWithReadiness({
        isSendDisabled: false,
        readinessBanner: null,
      }),
    ).toBe(false);
  });

  it("preserves existing send disabled state", () => {
    expect(
      resolveComposerSendDisabledWithReadiness({
        isSendDisabled: true,
        readinessBanner: null,
      }),
    ).toBe(true);
  });
});
