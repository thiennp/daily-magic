import { describe, expect, it } from "vitest";

import { AWC_PROJECT_INBOX_COPY } from "@/features/projects/access/inbox/awcProjectInboxCopy.constant";
import { mapInboxDispatchError } from "@/features/projects/access/inbox/utils/mapInboxDispatchError";

describe("mapInboxDispatchError", () => {
  it("maps computer_not_assignable causes to computer copy", () => {
    expect(
      mapInboxDispatchError({
        ok: false,
        code: "computer_not_assignable",
        errorMessage: "computer_not_assignable",
        cause: "offline",
      }),
    ).toBe(AWC_PROJECT_INBOX_COPY.dispatchComputerOffline);
    expect(
      mapInboxDispatchError({
        ok: false,
        code: "computer_not_assignable",
        errorMessage: "computer_not_assignable",
        cause: "too_old",
      }),
    ).toBe(AWC_PROJECT_INBOX_COPY.dispatchComputerNeedsUpdate);
    expect(
      mapInboxDispatchError({
        ok: false,
        code: "computer_not_assignable",
        errorMessage: "computer_not_assignable",
      }),
    ).toBe(AWC_PROJECT_INBOX_COPY.dispatchComputerNotAssignable);
  });

  it("computer assign copy says computer, never AWL/agent/device", () => {
    const blob = [
      AWC_PROJECT_INBOX_COPY.dispatchIntro,
      AWC_PROJECT_INBOX_COPY.dispatchPeerEmpty,
      AWC_PROJECT_INBOX_COPY.dispatchComputerOffline,
      AWC_PROJECT_INBOX_COPY.dispatchComputerNeedsUpdate,
      AWC_PROJECT_INBOX_COPY.dispatchComputerNotAssignable,
    ].join("\n");
    expect(blob).toMatch(/computer/i);
    expect(blob).not.toMatch(/\b(AWL|agent|device)\b/i);
  });
});
