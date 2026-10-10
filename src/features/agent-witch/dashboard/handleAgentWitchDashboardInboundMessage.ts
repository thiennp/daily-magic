import trackOnboardingFromAgentWitchSocketMessage from "@/features/home/utils/trackOnboardingFromAgentWitchSocketMessage";
import { syncAgentRunHeartbeatLocalCacheFromSocket } from "@/features/reports/utils/public-api/presentation";
import { syncAgentRunLocalCacheFromSocket } from "@/features/reports/utils/public-api/presentation";

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
