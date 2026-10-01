"use client";

import EmptyStatePanelSkeleton from "@/features/empty-states/EmptyStatePanelSkeleton";
import AgentRunsListGuestPanel from "@/features/reports/AgentRunsListGuestPanel";
import AgentRunsListSignedInContent from "@/features/reports/AgentRunsListSignedInContent";
import { useGuestSessionState } from "@/features/empty-states/useGuestSessionState";
import useShellNavContext from "@/features/shell/hooks/useShellNavContext";

export default function AgentRunsList() {
  const { sessionState } = useGuestSessionState();
  const { teamNavEnabled } = useShellNavContext();

  if (sessionState === "loading") {
    return <EmptyStatePanelSkeleton />;
  }

  if (sessionState === "guest") {
    return <AgentRunsListGuestPanel />;
  }

  return <AgentRunsListSignedInContent teamNavEnabled={teamNavEnabled} />;
}
