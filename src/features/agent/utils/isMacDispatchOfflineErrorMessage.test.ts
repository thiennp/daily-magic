import { describe, expect, it } from "vitest";

import { isMacDispatchOfflineErrorMessage } from "@/features/agent/utils/isMacDispatchOfflineErrorMessage";
import { MAC_OFFLINE_FOR_ACCOUNT_ERROR } from "@/lib/agentWitch/macOfflineForAccountErrorMessage.constant";

describe("isMacDispatchOfflineErrorMessage", () => {
  it("matches known Mac offline dispatch errors", () => {
    expect(
      isMacDispatchOfflineErrorMessage(
        "The selected Mac is not online right now.",
      ),
    ).toBe(true);
    expect(
      isMacDispatchOfflineErrorMessage(MAC_OFFLINE_FOR_ACCOUNT_ERROR),
    ).toBe(true);
  });

  it("ignores unrelated errors", () => {
    expect(
      isMacDispatchOfflineErrorMessage(
        "Select which Mac should run this task.",
      ),
    ).toBe(false);
  });
});
