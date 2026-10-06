"use client";

import { useCallback, useState } from "react";

import useMyMacDevices from "@/features/agent/hooks/useMyMacDevices";
import AwcProjectDetailHeader from "@/features/projects/AwcProjectDetailHeader";
import AwcProjectDetailTabBar from "@/features/projects/AwcProjectDetailTabBar";
import AwcProjectDetailTabPanels from "@/features/projects/AwcProjectDetailTabPanels";
import AwcProjectMembersColumn from "@/features/projects/AwcProjectMembersColumn";
import useAwcProjectDetailTab from "@/features/projects/hooks/useAwcProjectDetailTab";
import useAwcProjectDevicePresentation from "@/features/projects/hooks/useAwcProjectDevicePresentation";
import { useProjectActivityTaskDeepLink } from "@/features/projects/hooks/useProjectActivityTaskDeepLink";
import useAwcProjectPitfalls from "@/features/projects/pitfalls/useAwcProjectPitfalls";
import { useAwcProjectMessengerThreads } from "@/features/projects/messenger/hooks/useAwcProjectMessengerThreads";
import sumMessengerUnread from "@/features/projects/overview/sumMessengerUnread";
import useLocalMacBrowserContext from "@/features/home/hooks/useLocalMacBrowserContext";
import {
  isProjectPageTabId,
  type ProjectPageNavTarget,
} from "@/features/projects/projectPageTabs.constant";
import type { ProjectPageActorRole } from "@/lib/projects/acl/humanInvites/authorizeProjectPageActor";
import type UserProjectRecord from "@/lib/projects/types/UserProjectRecord.type";
import { HUMAN_INVITE_UI_COPY } from "@/features/projects/access/humanInvites/humanInviteUiCopy.constant";
import { countActiveProjectPitfalls } from "@agent-witch/shared/pitfalls";

interface AwcProjectDetailPanelProps {
  readonly project: UserProjectRecord;
  readonly startRename?: boolean;
  readonly pageActorRole?: ProjectPageActorRole;
  readonly actorEmail?: string | null;
  readonly actorDisplayName?: string | null;
  readonly actorUserId?: string | null;
}

export default function AwcProjectDetailPanel({
  project,
  startRename = false,
  pageActorRole = "owner",
  actorEmail = null,
  actorDisplayName = null,
  actorUserId = null,
}: AwcProjectDetailPanelProps) {
  useProjectActivityTaskDeepLink();
  const { localTokenHash } = useLocalMacBrowserContext();
  const { devices, displayNameById } = useMyMacDevices();
  const isOwner = pageActorRole === "owner";
  const [renameInSettings, setRenameInSettings] = useState(
    startRename && isOwner,
  );
  const [activityThreadKey, setActivityThreadKey] = useState<string | null>(
    null,
  );
  const { deviceDisplayName, presence, editCta } =
    useAwcProjectDevicePresentation({
      project,
      devices,
      displayNameById,
      localTokenHash,
    });
  const { activeTab, setActiveTab } = useAwcProjectDetailTab({
    preferSettingsOnMount: renameInSettings,
  });
  const messengerThreads = useAwcProjectMessengerThreads(project.id);
  const activityUnreadCount = sumMessengerUnread(messengerThreads.threads);
  const pitfalls = useAwcProjectPitfalls(project.id);
  const pitfallsCount =
    pitfalls.status === "ready" ? countActiveProjectPitfalls(pitfalls.items) : 0;
  const onGotoTab = useCallback(
    (tab: ProjectPageNavTarget) => {
      if (isProjectPageTabId(tab)) {
        setActiveTab(tab);
        return;
      }
      if (tab === "team") {
        document
          .getElementById("project-members-column")
          ?.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    },
    [setActiveTab],
  );
  const onGotoActivity = useCallback(
    (threadKey: string | null) => {
      setActivityThreadKey(threadKey === null ? "whole" : threadKey);
      setActiveTab("activity");
    },
    [setActiveTab],
  );
  const copy = HUMAN_INVITE_UI_COPY;
  const roleChip =
    pageActorRole === "member"
      ? copy.roleChipMember
      : pageActorRole === "viewer"
        ? copy.roleChipViewer
        : null;

  return (
    <div className="grid min-w-0 grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-0 xl:grid-cols-[minmax(0,1fr)_21.25rem]">
      <div className="flex min-w-0 flex-col gap-5 lg:pr-5">
        {roleChip ? (
          <p className="inline-flex w-fit rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-700 ring-1 ring-gray-200 dark:bg-white/10 dark:text-gray-200 dark:ring-white/15">
            {roleChip}
          </p>
        ) : null}
        <AwcProjectDetailHeader
          projectName={project.name}
          folderPath={project.folderPath}
          presence={presence}
          deviceDisplayName={deviceDisplayName}
          editCta={editCta}
          canRename={isOwner}
          onRename={() => {
            setRenameInSettings(true);
            setActiveTab("settings");
          }}
          onInvite={() => {
            onGotoTab("team");
          }}
          onDelete={() => {
            setActiveTab("settings");
          }}
        />
        <AwcProjectDetailTabBar
          activeTab={activeTab}
          onTabChange={setActiveTab}
          activityUnreadCount={activityUnreadCount}
          pitfallsCount={pitfallsCount}
        />
        <AwcProjectDetailTabPanels
          activeTab={activeTab}
          project={project}
          startRename={renameInSettings}
          pageActorRole={pageActorRole}
          deviceDisplayName={deviceDisplayName}
          editCta={editCta}
          pitfalls={pitfalls}
          onGotoTab={onGotoTab}
          onGotoActivity={onGotoActivity}
          activityInitialThreadKey={activityThreadKey}
          onActivityUnreadMaybeChanged={messengerThreads.reload}
        />
      </div>
      <AwcProjectMembersColumn
        projectId={project.id}
        pageActorRole={pageActorRole}
        ownerEmail={actorEmail}
        ownerDisplayName={actorDisplayName}
        viewerUserId={actorUserId}
      />
    </div>
  );
}
