"use client";

import { useState } from "react";

import useMyMacDevices from "@/features/agent/hooks/useMyMacDevices";
import AwcProjectDetailHeader from "@/features/projects/AwcProjectDetailHeader";
import AwcProjectDetailTabBar from "@/features/projects/AwcProjectDetailTabBar";
import AwcProjectDetailTabPanels from "@/features/projects/AwcProjectDetailTabPanels";
import useAwcProjectDetailTab from "@/features/projects/hooks/useAwcProjectDetailTab";
import useAwcProjectDevicePresentation from "@/features/projects/hooks/useAwcProjectDevicePresentation";
import { useProjectActivityTaskDeepLink } from "@/features/projects/hooks/useProjectActivityTaskDeepLink";
import useLocalMacBrowserContext from "@/features/home/hooks/useLocalMacBrowserContext";
import type { ProjectPageActorRole } from "@/lib/projects/acl/humanInvites/authorizeProjectPageActor";
import type UserProjectRecord from "@/lib/projects/types/UserProjectRecord.type";
import { HUMAN_INVITE_UI_COPY } from "@/features/projects/access/humanInvites/humanInviteUiCopy.constant";

interface AwcProjectDetailPanelProps {
  readonly project: UserProjectRecord;
  readonly startRename?: boolean;
  readonly pageActorRole?: ProjectPageActorRole;
  readonly actorEmail?: string | null;
  readonly actorDisplayName?: string | null;
}

export default function AwcProjectDetailPanel({
  project,
  startRename = false,
  pageActorRole = "owner",
}: AwcProjectDetailPanelProps) {
  useProjectActivityTaskDeepLink();
  const { localTokenHash } = useLocalMacBrowserContext();
  const { devices, displayNameById } = useMyMacDevices();
  const isOwner = pageActorRole === "owner";
  const [renameInSettings, setRenameInSettings] = useState(
    startRename && isOwner,
  );
  const { presence, editCta } = useAwcProjectDevicePresentation({
    project,
    devices,
    displayNameById,
    localTokenHash,
  });
  const { activeTab, setActiveTab } = useAwcProjectDetailTab({
    preferSettingsOnMount: renameInSettings,
  });
  const copy = HUMAN_INVITE_UI_COPY;
  const roleChip =
    pageActorRole === "member"
      ? copy.roleChipMember
      : pageActorRole === "viewer"
        ? copy.roleChipViewer
        : null;

  return (
    <div className="flex min-w-0 flex-col gap-5">
      {roleChip ? (
        <p className="inline-flex w-fit rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-700 ring-1 ring-gray-200 dark:bg-white/10 dark:text-gray-200 dark:ring-white/15">
          {roleChip}
        </p>
      ) : null}
      <AwcProjectDetailHeader
        projectName={project.name}
        folderPath={project.folderPath}
        presence={presence}
        editCta={editCta}
        canRename={isOwner}
        onRename={() => {
          setRenameInSettings(true);
          setActiveTab("settings");
        }}
      />
      <AwcProjectDetailTabBar
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
      <AwcProjectDetailTabPanels
        activeTab={activeTab}
        project={project}
        startRename={renameInSettings}
        pageActorRole={pageActorRole}
      />
    </div>
  );
}
