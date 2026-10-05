"use client";

import { useMemo } from "react";

import { useAwcProjectAccess } from "@/features/projects/access/hooks/useAwcProjectAccess";
import { useAwcProjectMessengerThreads } from "@/features/projects/messenger/hooks/useAwcProjectMessengerThreads";
import useAwcProjectComposition from "@/features/projects/hooks/useAwcProjectComposition";
import useAwcProjectPitfalls from "@/features/projects/pitfalls/useAwcProjectPitfalls";
import AwcProjectOverviewAttentionBanner from "@/features/projects/overview/AwcProjectOverviewAttentionBanner";
import AwcProjectOverviewPitfallsCard from "@/features/projects/overview/AwcProjectOverviewPitfallsCard";
import AwcProjectOverviewRecentCard from "@/features/projects/overview/AwcProjectOverviewRecentCard";
import AwcProjectOverviewSetupCard from "@/features/projects/overview/AwcProjectOverviewSetupCard";
import AwcProjectOverviewStatsStrip from "@/features/projects/overview/AwcProjectOverviewStatsStrip";
import buildOverviewAttention from "@/features/projects/overview/buildOverviewAttention";
import buildOverviewRecentActivity from "@/features/projects/overview/buildOverviewRecentActivity";
import buildOverviewSetupSteps from "@/features/projects/overview/buildOverviewSetupSteps";
import { OVERVIEW_GRID2_CLASS } from "@/features/projects/overview/overviewChrome.constant";
import summarizeOverviewPitfalls from "@/features/projects/overview/summarizeOverviewPitfalls";
import sumMessengerUnread from "@/features/projects/overview/sumMessengerUnread";
import type { ProjectEditOnMacCta } from "@/features/projects/utils/resolveProjectEditOnMacCta";
import type { ProjectPageTabId } from "@/features/projects/projectPageTabs.constant";
import type UserProjectRecord from "@/lib/projects/types/UserProjectRecord.type";
import { PROJECT_PITFALL_MAX_ACTIVE } from "@agent-witch/shared/pitfalls";

interface AwcProjectOverviewPanelProps {
  readonly project: UserProjectRecord;
  readonly deviceDisplayName: string;
  readonly editCta: ProjectEditOnMacCta;
  readonly onGotoTab: (tab: ProjectPageTabId) => void;
}

export default function AwcProjectOverviewPanel({
  project,
  deviceDisplayName,
  editCta,
  onGotoTab,
}: AwcProjectOverviewPanelProps) {
  const access = useAwcProjectAccess(project.id);
  const { threads } = useAwcProjectMessengerThreads(project.id);
  const pitfalls = useAwcProjectPitfalls(project.id);
  const { counts, isLoading: compositionLoading } = useAwcProjectComposition(
    project.id,
  );

  const unreadCount = sumMessengerUnread(threads);
  const attention = useMemo(() => buildOverviewAttention(threads), [threads]);
  const recent = useMemo(() => buildOverviewRecentActivity(threads), [threads]);
  const pitSummary =
    pitfalls.status === "ready"
      ? summarizeOverviewPitfalls(pitfalls.items)
      : null;
  const steps = useMemo(() => {
    const members = access.loadError ? [] : access.members;
    const folderRefs = access.loadError ? [] : access.folderRefs;
    return buildOverviewSetupSteps({
      members,
      folderRefs,
      repoUrlCount: project.repoUrls.length,
      composition: counts,
      deviceDisplayName,
    });
  }, [
    access.loadError,
    access.members,
    access.folderRefs,
    project.repoUrls.length,
    counts,
    deviceDisplayName,
  ]);
  const memberCount = access.loadError ? 0 : access.members.length;

  return (
    <div className="flex min-w-0 flex-col gap-4">
      <AwcProjectOverviewStatsStrip
        stats={{
          memberCount,
          unreadCount,
          pitfallsActive: pitSummary?.active ?? 0,
          pitfallsMax: PROJECT_PITFALL_MAX_ACTIVE,
          compositionTotal: counts.harness + counts.workflow + counts.agent,
          showComposition: !compositionLoading,
        }}
        onGoto={onGotoTab}
      />
      <div className={OVERVIEW_GRID2_CLASS}>
        <div className="flex min-w-0 flex-col gap-4">
          {attention ? (
            <AwcProjectOverviewAttentionBanner
              attention={attention}
              onOpen={() => {
                onGotoTab("activity");
              }}
            />
          ) : null}
          <AwcProjectOverviewSetupCard
            steps={steps}
            deviceDisplayName={deviceDisplayName}
            editCta={editCta}
            onGoto={onGotoTab}
          />
        </div>
        <div className="flex min-w-0 flex-col gap-4">
          <AwcProjectOverviewRecentCard
            items={recent}
            onViewAll={() => {
              onGotoTab("activity");
            }}
          />
          <AwcProjectOverviewPitfallsCard
            summary={pitSummary}
            isLoading={pitfalls.status === "loading"}
            onView={() => {
              onGotoTab("pitfalls");
            }}
          />
        </div>
      </div>
    </div>
  );
}
