import type { AgentLiveProgressStallState } from "@/features/agent/utils/resolveAgentLiveProgressStallState";

export const resolveAgentLiveProgressStallDetail = (input: {
  readonly stallState: AgentLiveProgressStallState;
  readonly fallbackDetail: string | null;
}): string | null => {
  if (input.stallState === "stuck") {
    return "No updates from your computer yet. Check that AgentWitch is running, wake your computer from Home, or try sending the task again.";
  }

  if (input.stallState === "warning") {
    return (
      input.fallbackDetail ??
      "Still waiting for your computer agent — this is taking longer than usual…"
    );
  }

  return input.fallbackDetail;
};
