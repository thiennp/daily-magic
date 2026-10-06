"use client";

import useMyMacDevices from "@/features/agent/hooks/useMyMacDevices";
import AwcProjectAskBox from "@/features/projects/askBox/AwcProjectAskBox";
import { useAskBoxActivitySync } from "@/features/projects/askBox/useAskBoxActivitySync";
import AwcProjectDetailHeader from "@/features/projects/AwcProjectDetailHeader";
import AwcProjectDetailTabBar from "@/features/projects/AwcProjectDetailTabBar";
import AwcProjectDetailTabPanels from "@/features/projects/AwcProjectDetailTabPanels";
import AwcProjectMembersColumn from "@/features/projects/AwcProjectMembersColumn";
import AwcProjectRoleChip from "@/features/projects/AwcProjectRoleChip";
import useAwcProjectDetailNavigation from "@/features/projects/hooks/useAwcProjectDetailNavigation";
import useAwcProjectDevicePresentation from "@/features/projects/hooks/useAwcProjectDevicePresentation";
import { useProjectActivityTaskDeepLink } from "@/features/projects/hooks/useProjectActivityTaskDeepLink";
import useAwcProjectPitfalls from "@/features/projects/pitfalls/useAwcProjectPitfalls";
import { useAwcProjectMessengerThreads } from "@/features/projects/messenger/hooks/useAwcProjectMessengerThreads";
import sumMessengerUnread from "@/features/projects/overview/sumMessengerUnread";
import useLocalMacBrowserContext from "@/features/home/hooks/useLocalMacBrowserContext";
import type { ProjectPageActorRole } from "@/lib/projects/acl/humanInvites/authorizeProjectPageActor";
import type UserProjectRecord from "@/lib/projects/types/UserProjectRecord.type";
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
  const nav = useAwcProjectDetailNavigation({ startRename, isOwner });
  const { activeTab, setActiveTab, onGotoTab, onGotoActivity } = nav;
  const { deviceDisplayName, presence, editCta } =
    useAwcProjectDevicePresentation({
      project,
      devices,
      displayNameById,
      localTokenHash,
    });
  const messengerThreads = useAwcProjectMessengerThreads(project.id);
  const reloadThreads = messengerThreads.reload;
  const activityUnreadCount = sumMessengerUnread(messengerThreads.threads);
  const pitfalls = useAwcProjectPitfalls(project.id);
  const pitfallsCount =
    pitfalls.status === "ready" ? countActiveProjectPitfalls(pitfalls.items) : 0;
  const { activityRefreshKey, onAskSent } = useAskBoxActivitySync({
    reloadThreads,
    onGotoActivity,
  });

  return (
    <div className="grid min-w-0 grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-0 xl:grid-cols-[minmax(0,1fr)_21.25rem]">
      <div className="flex min-w-0 flex-col gap-5 lg:pr-5">
        <AwcProjectRoleChip pageActorRole={pageActorRole} />
        <AwcProjectDetailHeader
          projectName={project.name}
          folderPath={project.folderPath}
          presence={presence}
          deviceDisplayName={deviceDisplayName}
          editCta={editCta}
          canRename={isOwner}
          onRename={nav.onRename}
          onInvite={() => {
            onGotoTab("team");
          }}
          onDelete={() => {
            setActiveTab("settings");
          }}
        />
        <AwcProjectAskBox
          projectId={project.id}
          threads={messengerThreads.threads}
          onSent={onAskSent}
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
          startRename={nav.renameInSettings}
          pageActorRole={pageActorRole}
          deviceDisplayName={deviceDisplayName}
          editCta={editCta}
          pitfalls={pitfalls}
          onGotoTab={onGotoTab}
          onGotoActivity={onGotoActivity}
          activityInitialThreadKey={nav.activityThreadKey}
          activityRefreshKey={activityRefreshKey}
          onActivityUnreadMaybeChanged={reloadThreads}
        />
      </div>
      <AwcProjectMembersColumn
        projectId={project.id}
        pageActorRole={pageActorRole}
        ownerEmail={actorEmail}
        ownerDisplayName={actorDisplayName}
        viewerUserId={actorUserId}
        onMessageHelper={onGotoActivity}
      />
    </div>
  );
}
