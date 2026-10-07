"use client";

import AwcProjectDetailTabPanelBody from "@/features/projects/AwcProjectDetailTabPanelBody";
import AwcProjectTabPanelIntro from "@/features/projects/AwcProjectTabPanelIntro";
import type { AwcProjectPitfallsState } from "@/features/projects/pitfalls/useAwcProjectPitfalls";
import {
  PROJECT_PAGE_TAB_IDS,
  type ProjectPageNavTarget,
  type ProjectPageTabId,
} from "@/features/projects/projectPageTabs.constant";
import type { ProjectEditOnMacCta } from "@/features/projects/utils/resolveProjectEditOnMacCta";
import type { ProjectPageActorRole } from "@/lib/projects/acl/humanInvites/authorizeProjectPageActor";
import type UserProjectRecord from "@/lib/projects/types/UserProjectRecord.type";

interface Props {
  readonly activeTab: ProjectPageTabId;
  readonly project: UserProjectRecord;
  readonly startRename: boolean;
  readonly pageActorRole: ProjectPageActorRole;
  readonly deviceDisplayName: string;
  readonly editCta: ProjectEditOnMacCta;
  readonly pitfalls: AwcProjectPitfallsState;
  readonly computerStatus: string | null;
  readonly onGotoTab: (tab: ProjectPageNavTarget) => void;
  readonly onGotoChat: (threadKey: string | null) => void;
}

export default function AwcProjectDetailTabPanels({
  activeTab,
  project,
  startRename,
  pageActorRole,
  deviceDisplayName,
  editCta,
  pitfalls,
  computerStatus,
  onGotoTab,
  onGotoChat,
}: Props) {
  return (
    <>
      {PROJECT_PAGE_TAB_IDS.map((tabId) => {
        const selected = tabId === activeTab;
        return (
          <div
            key={tabId}
            role="tabpanel"
            id={`project-tabpanel-${tabId}`}
            aria-labelledby={`project-tab-${tabId}`}
            hidden={!selected}
            className={selected ? "flex min-w-0 flex-col gap-4 pt-1" : undefined}
          >
            <AwcProjectTabPanelIntro tabId={tabId} />
            <AwcProjectDetailTabPanelBody
              tabId={tabId}
              selected={selected}
              project={project}
              startRename={startRename}
              pageActorRole={pageActorRole}
              deviceDisplayName={deviceDisplayName}
              editCta={editCta}
              pitfalls={pitfalls}
              computerStatus={computerStatus}
              onGotoTab={onGotoTab}
              onGotoChat={onGotoChat}
            />
          </div>
        );
      })}
    </>
  );
}
