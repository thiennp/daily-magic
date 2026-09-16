import { describe, expect, it } from "vitest";

import { isMacDispatchOfflineErrorMessage } from "@/features/agent/utils/isMacDispatchOfflineErrorMessage";
import {
  MAC_RECONNECTING_QUEUED_ERROR,
  MAC_REPLACED_ERROR,
} from "@/lib/agentWitch/agentWitchDispatchErrorCode.constant";
import { MAC_OFFLINE_FOR_ACCOUNT_ERROR } from "@/lib/agentWitch/macOfflineForAccountErrorMessage.constant";

describe("isMacDispatchOfflineErrorMessage", () => {
  it("matches known Mac offline dispatch errors", () => {
    expect(
      isMacDispatchOfflineErrorMessage(MAC_RECONNECTING_QUEUED_ERROR),
    ).toBe(true);
    expect(
      isMacDispatchOfflineErrorMessage(MAC_OFFLINE_FOR_ACCOUNT_ERROR),
    ).toBe(true);
  });

  it("matches a re-paired Mac so the device list refreshes", () => {
    expect(isMacDispatchOfflineErrorMessage(MAC_REPLACED_ERROR)).toBe(true);
  });

  it("ignores unrelated errors", () => {
    expect(
      isMacDispatchOfflineErrorMessage(
        "Select which Mac should run this task.",
      ),
    ).toBe(false);
  });
});
