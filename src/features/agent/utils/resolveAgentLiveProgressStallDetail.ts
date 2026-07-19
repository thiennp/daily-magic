import type { AgentLiveProgressStallState } from "@/features/agent/utils/resolveAgentLiveProgressStallState";

export const resolveAgentLiveProgressStallDetail = (input: {
  readonly stallState: AgentLiveProgressStallState;
  readonly fallbackDetail: string | null;
}): string | null => {
  if (input.stallState === "stuck") {
    return "No updates from your Mac yet. Check that Agent Witch is running, wake your Mac from Home, or try sending the task again.";
  }

  if (input.stallState === "warning") {
    return (
      input.fallbackDetail ??
      "Still waiting for your Mac agent — this is taking longer than usual…"
    );
  }

  return input.fallbackDetail;
};
