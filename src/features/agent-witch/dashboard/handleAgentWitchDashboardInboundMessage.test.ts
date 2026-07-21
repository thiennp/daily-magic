import { beforeEach, describe, expect, it, vi } from "vitest";

import { handleAgentWitchDashboardInboundMessage } from "@/features/agent-witch/dashboard/handleAgentWitchDashboardInboundMessage";
import trackOnboardingFromAgentWitchSocketMessage from "@/features/home/utils/trackOnboardingFromAgentWitchSocketMessage";
import { syncAgentRunHeartbeatLocalCacheFromSocket } from "@/features/reports/utils/syncAgentRunHeartbeatLocalCacheFromSocket";
import { syncAgentRunLocalCacheFromSocket } from "@/features/reports/utils/syncAgentRunLocalCacheFromSocket";

vi.mock(
  "@/features/home/utils/trackOnboardingFromAgentWitchSocketMessage",
  () => ({
    default: vi.fn(),
  }),
);

vi.mock("@/features/reports/utils/syncAgentRunLocalCacheFromSocket", () => ({
  syncAgentRunLocalCacheFromSocket: vi.fn(),
}));

vi.mock(
  "@/features/reports/utils/syncAgentRunHeartbeatLocalCacheFromSocket",
  () => ({
    syncAgentRunHeartbeatLocalCacheFromSocket: vi.fn(),
  }),
);

describe("handleAgentWitchDashboardInboundMessage (AGENT-040)", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("tracks onboarding, syncs cache, then publishes to subscribers", () => {
    const publish = vi.fn();
    const raw = '{"type":"agent.run.record"}';

    handleAgentWitchDashboardInboundMessage({ raw, publish });

    expect(trackOnboardingFromAgentWitchSocketMessage).toHaveBeenCalledWith(
      raw,
    );
    expect(syncAgentRunLocalCacheFromSocket).toHaveBeenCalledWith(raw);
    expect(syncAgentRunHeartbeatLocalCacheFromSocket).toHaveBeenCalledWith(raw);
    expect(publish).toHaveBeenCalledWith(raw);
  });
});
