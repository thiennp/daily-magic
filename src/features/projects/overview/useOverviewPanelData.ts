"use client";

import { useMemo, useState } from "react";

import { useAutoSkills } from "@/features/project-auto-skills/public-api/presentation";
import { useAwcProjectAccess } from "@/features/projects/access/hooks/useAwcProjectAccess";
import { useHumanInviteWaitingCount } from "@/features/projects/access/humanInvites/hooks/public-api/presentation";
import {
  countRailMembers,
  countRailWaiting,
} from "@/features/projects/members/public-api/types";
import useAwcProjectComposition from "@/features/projects/hooks/useAwcProjectComposition";
import { useAwcProjectMessengerThreads } from "@/features/projects/messenger/hooks/useAwcProjectMessengerThreads";
import buildOverviewAssistants from "@/features/projects/overview/buildOverviewAssistants";
import buildOverviewAttention from "@/features/projects/overview/buildOverviewAttention";
import buildOverviewAttentionItems from "@/features/projects/overview/buildOverviewAttentionItems";
import buildOverviewRecentActivity from "@/features/projects/overview/buildOverviewRecentActivity";
import buildOverviewSetupSteps from "@/features/projects/overview/buildOverviewSetupSteps";
import summarizeOverviewPitfalls from "@/features/projects/overview/summarizeOverviewPitfalls";
import sumMessengerUnread from "@/features/projects/overview/sumMessengerUnread";
import { useProjectPendingRunApprovals } from "@/features/projects/settings/runApprovals/public-api/presentation";
import type { AwcProjectPitfallsState } from "@/features/projects/pitfalls/public-api/types";
import type UserProjectRecord from "@/lib/projects/types/UserProjectRecord.type";
const useOverviewPanelData = (input: {
  readonly project: UserProjectRecord;
  readonly pitfalls: AwcProjectPitfallsState;
  readonly computerStatus: string | null;
  readonly isOwner: boolean;
}) => {
  const access = useAwcProjectAccess(input.project.id);
  const { threads } = useAwcProjectMessengerThreads(input.project.id);
  const { counts, isLoading: compositionLoading } = useAwcProjectComposition(
    input.project.id,
  );
  const [setupHidden, setSetupHidden] = useState(false);
  const members = access.loadError ? [] : access.members;
  const folderRefs = access.loadError ? [] : access.folderRefs;
  // DF-036 F5: same numbers as the Members rail header ("Members · {n}" + "{k} waiting").
  const accessReady = !access.loadError && !access.isLoading;
  const peopleInvites = useHumanInviteWaitingCount(
    input.project.id,
    accessReady,
  );
  const pendingCount = access.loadError
    ? 0
    : countRailWaiting({
        peopleInvites,
        joinRequests: access.pending.length,
        assistantInvites: access.invites.length,
      });
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
  const runApprovals = useProjectPendingRunApprovals(
    input.project.id,
    input.isOwner,
  );
  const joinRequestCount =
    input.isOwner && !access.loadError ? access.pending.length : 0;
  const pendingRunCount = input.isOwner ? runApprovals.approvals.length : 0;
  const skillQuestionCount =
    useAutoSkills(input.project.id, input.isOwner).overview?.pending.length ??
    0;
  const attention = useMemo(
    () =>
      buildOverviewAttentionItems({
        pendingRunCount,
        joinRequestCount,
        skillQuestionCount,
        unread: buildOverviewAttention(threads),
      }),
    [pendingRunCount, joinRequestCount, skillQuestionCount, threads],
  );
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
      memberCount: accessReady ? countRailMembers(members) : 0,
      pendingCount,
      unreadCount: sumMessengerUnread(threads),
      pitfallsActive: pitSummary?.active ?? 0,
      pitfallsMax: pitSummary?.total ?? 0,
      playbooks: counts.harness,
      workflows: counts.workflow,
      agents: counts.agent,
      // The composition (playbooks, workflows, agents) belongs to the owner's computer: members see no counts.
      showComposition: input.isOwner && !compositionLoading,
      computerStatus: input.computerStatus,
      setupHidden,
      setupDone,
      setupTotal: steps.length,
    },
    pitfallsLoading: input.pitfalls.status === "loading",
  };
};

export default useOverviewPanelData;
