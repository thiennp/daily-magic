import { beforeEach, describe, expect, it, vi } from "vitest";

import {
  markOnboardingSetupAcknowledged,
  readOnboardingSetupAcknowledged,
} from "@/features/home/utils/onboardingSetupAcknowledgedStore";
import { mockBrowserLocalStorage } from "@/test/mockBrowserLocalStorage";

const persistMock = vi.hoisted(() => vi.fn());

vi.mock("@/features/home/utils/onboardingSetupAcknowledgedApi", () => ({
  persistOnboardingSetupAcknowledged: persistMock,
}));

describe("onboardingSetupAcknowledgedStore", () => {
  beforeEach(() => {
    mockBrowserLocalStorage();
    window.localStorage.clear();
    persistMock.mockClear();
  });

  it("persists setup-acknowledged across reads", () => {
    expect(readOnboardingSetupAcknowledged()).toBe(false);

    markOnboardingSetupAcknowledged();

    expect(readOnboardingSetupAcknowledged()).toBe(true);
    expect(persistMock).toHaveBeenCalledTimes(1);
  });
});
