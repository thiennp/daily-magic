"use client";

import { useState } from "react";

import { applyThisComputerFolderGap } from "@/features/projects/overview/applyThisComputerFolderGap";
import AwcProjectOverviewFolderPrompt from "@/features/projects/overview/AwcProjectOverviewFolderPrompt";
import AwcProjectOverviewAssistantsCard from "@/features/projects/overview/AwcProjectOverviewAssistantsCard";
import AwcProjectOverviewAttentionBanner from "@/features/projects/overview/AwcProjectOverviewAttentionBanner";
import AwcProjectOverviewCreateTask from "@/features/projects/overview/AwcProjectOverviewCreateTask";
import type { OverviewAttentionItem } from "@/features/projects/overview/buildOverviewAttentionItems";
import AwcProjectOverviewPitfallsCard from "@/features/projects/overview/AwcProjectOverviewPitfallsCard";
import AwcProjectOverviewRecentCard from "@/features/projects/overview/AwcProjectOverviewRecentCard";
import AwcProjectOverviewSetupCard from "@/features/projects/overview/AwcProjectOverviewSetupCard";
import AwcProjectOverviewStatsStrip from "@/features/projects/overview/AwcProjectOverviewStatsStrip";
import { OVERVIEW_GRID2_CLASS } from "@/features/projects/overview/overviewChrome.constant";
import useOverviewPanelData from "@/features/projects/overview/useOverviewPanelData";
import type { AwcProjectPitfallsState } from "@/features/projects/pitfalls/public-api/types";
import type { ProjectEditOnMacCta } from "@/features/projects/utils/public-api/types";
import type { ProjectPageNavTarget } from "@/features/projects/projectPageTabs.constant";
import type UserProjectRecord from "@/lib/projects/types/UserProjectRecord.type";

interface Props {
  readonly project: UserProjectRecord;
  readonly editCta: ProjectEditOnMacCta;
  readonly pitfalls: AwcProjectPitfallsState;
  readonly computerStatus: string | null;
  readonly isOwner: boolean;
  /** Owner or member (not viewer). */
  readonly canCreateTask: boolean;
  readonly onGotoTab: (tab: ProjectPageNavTarget) => void;
  readonly onGotoChat: (threadKey: string | null) => void;
}

export default function AwcProjectOverviewPanel({
  project,
  editCta,
  pitfalls,
  computerStatus,
  isOwner,
  canCreateTask,
  onGotoTab,
  onGotoChat,
}: Props) {
  const [folderGap, setFolderGap] = useState(false);
  const d = useOverviewPanelData({
    project,
    pitfalls,
    computerStatus,
    isOwner,
  });
  const openAttention = (item: OverviewAttentionItem): void => {
    if (item.kind === "run") onGotoTab("settings");
    // Join requests and skill questions both render as cards in the feed.
    else if (item.kind === "join" || item.kind === "skill") onGotoChat(null);
    else onGotoChat(item.membershipId);
  };
  return (
    <div className="flex min-w-0 flex-col gap-4">
      <AwcProjectOverviewStatsStrip
        stats={d.stats}
        onGoto={onGotoTab}
        onOpenChat={() => onGotoChat(null)}
        onShowSetup={d.showSetup}
        trailing={
          canCreateTask ? (
            <AwcProjectOverviewCreateTask
              projectId={project.id}
              onCreated={() => onGotoTab("tasks")}
            />
          ) : null
        }
      />
      {d.attention.length > 0 ? (
        <AwcProjectOverviewAttentionBanner
          items={d.attention}
          onOpen={openAttention}
        />
      ) : null}
      {canCreateTask ? (
        <AwcProjectOverviewFolderPrompt
          projectId={project.id}
          onGoto={onGotoTab}
          onGapChange={setFolderGap}
        />
      ) : null}
      <AwcProjectOverviewSetupCard
        steps={applyThisComputerFolderGap(d.steps, folderGap)}
        editCta={editCta}
        onGoto={onGotoTab}
        hidden={d.setupHidden}
        onHide={d.hideSetup}
      />
      <div className={OVERVIEW_GRID2_CLASS}>
        <div className="flex min-w-0 flex-col gap-4">
          <AwcProjectOverviewAssistantsCard
            assistants={d.assistants}
            canSend={d.canSend}
            onMessage={(id) => onGotoChat(id)}
            onGotoTeam={() => onGotoTab("team")}
          />
          <AwcProjectOverviewPitfallsCard
            summary={d.pitSummary}
            isLoading={d.pitfallsLoading}
            onView={() => onGotoTab("pitfalls")}
          />
        </div>
        <AwcProjectOverviewRecentCard
          items={d.recent}
          onViewAll={() => onGotoChat(null)}
          onOpen={(id) => onGotoChat(id === "whole" ? null : id)}
        />
      </div>
    </div>
  );
}
