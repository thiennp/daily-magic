"use client";

import { useMemo, useState } from "react";

import { useAwcProjectAccess } from "@/features/projects/access/hooks/useAwcProjectAccess";
import useAwcProjectComposition from "@/features/projects/hooks/useAwcProjectComposition";
import { useAwcProjectMessengerThreads } from "@/features/projects/messenger/hooks/useAwcProjectMessengerThreads";
import buildOverviewAssistants from "@/features/projects/overview/buildOverviewAssistants";
import buildOverviewAttention from "@/features/projects/overview/buildOverviewAttention";
import buildOverviewRecentActivity from "@/features/projects/overview/buildOverviewRecentActivity";
import buildOverviewSetupSteps from "@/features/projects/overview/buildOverviewSetupSteps";
import summarizeOverviewPitfalls from "@/features/projects/overview/summarizeOverviewPitfalls";
import sumMessengerUnread from "@/features/projects/overview/sumMessengerUnread";
import type { AwcProjectPitfallsState } from "@/features/projects/pitfalls/useAwcProjectPitfalls";
import type UserProjectRecord from "@/lib/projects/types/UserProjectRecord.type";
import { PROJECT_PITFALL_MAX_ACTIVE } from "@agent-witch/shared/pitfalls";

const useOverviewPanelData = (input: {
  readonly project: UserProjectRecord;
  readonly pitfalls: AwcProjectPitfallsState;
  readonly computerStatus: string | null;
}) => {
  const access = useAwcProjectAccess(input.project.id);
  const { threads } = useAwcProjectMessengerThreads(input.project.id);
  const { counts, isLoading: compositionLoading } = useAwcProjectComposition(
    input.project.id,
  );
  const [setupHidden, setSetupHidden] = useState(false);
  const members = access.loadError ? [] : access.members;
  const folderRefs = access.loadError ? [] : access.folderRefs;
  const pendingCount = access.loadError
    ? 0
    : access.pending.length + access.invites.length;
  const steps = useMemo(
    () =>
      buildOverviewSetupSteps({
        members,
        folderRefs,
        repoUrlCount: input.project.repoUrls.length,
        composition: counts,
      }),
    [members, folderRefs, input.project.repoUrls.length, counts],
  );
  const attention = useMemo(() => buildOverviewAttention(threads), [threads]);
  const recent = useMemo(() => buildOverviewRecentActivity(threads), [threads]);
  const assistants = useMemo(
    () => buildOverviewAssistants(members, threads),
    [members, threads],
  );
  const pitSummary =
    input.pitfalls.status === "ready"
      ? summarizeOverviewPitfalls(input.pitfalls.items)
      : null;
  const setupDone = steps.filter((s) => s.done).length;
  return {
    attention,
    recent,
    assistants,
    steps,
    pitSummary,
    canSend: threads?.canSend ?? false,
    setupHidden,
    hideSetup: () => setSetupHidden(true),
    showSetup: () => setSetupHidden(false),
    stats: {
      memberCount: members.length,
      pendingCount,
      unreadCount: sumMessengerUnread(threads),
      pitfallsActive: pitSummary?.active ?? 0,
      pitfallsMax: PROJECT_PITFALL_MAX_ACTIVE,
      playbooks: counts.harness,
      workflows: counts.workflow,
      agents: counts.agent,
      showComposition: !compositionLoading,
      computerStatus: input.computerStatus,
      setupHidden,
      setupDone,
      setupTotal: steps.length,
    },
    pitfallsLoading: input.pitfalls.status === "loading",
  };
};

export default useOverviewPanelData;
