import trackOnboardingFromAgentWitchSocketMessage from "@/features/home/utils/trackOnboardingFromAgentWitchSocketMessage";
import { syncAgentRunHeartbeatLocalCacheFromSocket } from "@/features/reports/utils/syncAgentRunHeartbeatLocalCacheFromSocket";
import { syncAgentRunLocalCacheFromSocket } from "@/features/reports/utils/syncAgentRunLocalCacheFromSocket";

/** Shared inbound pipeline before fan-out to dashboard subscribers. */
export const handleAgentWitchDashboardInboundMessage = (input: {
  readonly raw: string;
  readonly publish: (raw: string) => void;
}): void => {
  trackOnboardingFromAgentWitchSocketMessage(input.raw);
  syncAgentRunLocalCacheFromSocket(input.raw);
  syncAgentRunHeartbeatLocalCacheFromSocket(input.raw);
  input.publish(input.raw);
};
