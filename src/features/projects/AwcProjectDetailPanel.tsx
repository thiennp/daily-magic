"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import useMyMacDevices from "@/features/agent/hooks/useMyMacDevices";
import AwcProjectChatDock from "@/features/projects/chatDock/AwcProjectChatDock";
import { useAskBoxActivitySync } from "@/features/projects/askBox/useAskBoxActivitySync";
import AwcProjectDetailHeader from "@/features/projects/AwcProjectDetailHeader";
import AwcProjectDetailTabBar from "@/features/projects/AwcProjectDetailTabBar";
import AwcProjectDetailTabPanels from "@/features/projects/AwcProjectDetailTabPanels";
import AwcProjectLeaveConfirmForm from "@/features/projects/AwcProjectLeaveConfirmForm";
import AwcProjectMembersColumn from "@/features/projects/AwcProjectMembersColumn";
import useAwcProjectDetailNavigation from "@/features/projects/hooks/useAwcProjectDetailNavigation";
import useAwcProjectDevicePresentation from "@/features/projects/hooks/useAwcProjectDevicePresentation";
import useLeaveProject from "@/features/projects/hooks/useLeaveProject";
import { useProjectActivityTaskDeepLink } from "@/features/projects/hooks/useProjectActivityTaskDeepLink";
import countImportantProjectPitfalls from "@/features/projects/pitfalls/countImportantProjectPitfalls";
import useAwcProjectPitfalls from "@/features/projects/pitfalls/useAwcProjectPitfalls";
import { useAwcProjectMessengerThreads } from "@/features/projects/messenger/hooks/useAwcProjectMessengerThreads";
import sumMessengerUnread from "@/features/projects/overview/sumMessengerUnread";
import resolveProjectHeaderStatus from "@/features/projects/utils/resolveProjectHeaderStatus";
import useLocalMacBrowserContext from "@/features/home/hooks/useLocalMacBrowserContext";
import isDefaultUserProject from "@/lib/projects/isDefaultUserProject";
import type { ProjectPageActorRole } from "@/lib/projects/acl/humanInvites/authorizeProjectPageActor";
import type UserProjectRecord from "@/lib/projects/types/UserProjectRecord.type";

interface AwcProjectDetailPanelProps {
  readonly project: UserProjectRecord;
  readonly startRename?: boolean;
  readonly startChatOpen?: boolean;
  readonly pageActorRole?: ProjectPageActorRole;
  readonly actorEmail?: string | null;
  readonly actorDisplayName?: string | null;
  readonly actorUserId?: string | null;
}

export default function AwcProjectDetailPanel({
  project,
  startRename = false,
  startChatOpen = false,
  pageActorRole = "owner",
  actorEmail = null,
  actorDisplayName = null,
  actorUserId = null,
}: AwcProjectDetailPanelProps) {
  useProjectActivityTaskDeepLink();
  const router = useRouter();
  const { localTokenHash } = useLocalMacBrowserContext();
  const { devices, displayNameById } = useMyMacDevices();
  const isOwner = pageActorRole === "owner";
  const canDelete = isOwner && !isDefaultUserProject(project);
  const canLeave = !isOwner;
  const nav = useAwcProjectDetailNavigation({ startRename, isOwner });
  const { activeTab, setActiveTab, onGotoTab, onGotoActivity } = nav;
  const device = useAwcProjectDevicePresentation({
    project,
    devices,
    displayNameById,
    localTokenHash,
  });
  const { deviceDisplayName, editCta } = device;
  const headerStatus = resolveProjectHeaderStatus(device);
  const messengerThreads = useAwcProjectMessengerThreads(project.id);
  const reloadThreads = messengerThreads.reload;
  const activityUnreadCount = sumMessengerUnread(messengerThreads.threads);
  const pitfalls = useAwcProjectPitfalls(project.id);
  const rulesImportantCount =
    pitfalls.status === "ready"
      ? countImportantProjectPitfalls(pitfalls.items)
      : 0;
  const { activityRefreshKey, onAskSent } = useAskBoxActivitySync({
    reloadThreads,
    onGotoActivity,
  });
  const [leaveConfirmOpen, setLeaveConfirmOpen] = useState(false);
  const {
    leaveProject,
    errorMessage: leaveError,
    pending: leavePending,
    clearError: clearLeaveError,
  } = useLeaveProject(project.id);

  const runLeave = (): void => {
    void leaveProject().then((ok) => {
      if (!ok) return;
      setLeaveConfirmOpen(false);
      router.push("/projects");
      router.refresh();
    });
  };

  return (
    <div className="grid min-w-0 grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-0 xl:grid-cols-[minmax(0,1fr)_21.25rem]">
      <div className="flex min-w-0 flex-col gap-5 lg:pr-5">
        <AwcProjectDetailHeader
          projectId={project.id}
          projectName={project.name}
          status={headerStatus}
          pageActorRole={pageActorRole}
          editCta={editCta}
          canRename={isOwner}
          canApprove={isOwner}
          canDelete={canDelete}
          canLeave={canLeave}
          onRename={nav.onRename}
          onInvite={() => {
            onGotoTab("team");
          }}
          onDelete={() => {
            setActiveTab("settings");
          }}
          onLeave={() => {
            clearLeaveError();
            setLeaveConfirmOpen(true);
          }}
        />
        <AwcProjectDetailTabBar
          activeTab={activeTab}
          onTabChange={setActiveTab}
          activityUnreadCount={activityUnreadCount}
          rulesImportantCount={rulesImportantCount}
        />
        <AwcProjectDetailTabPanels
          activeTab={activeTab}
          project={project}
          startRename={nav.renameInSettings}
          pageActorRole={pageActorRole}
          deviceDisplayName={deviceDisplayName}
          editCta={editCta}
          pitfalls={pitfalls}
          computerStatus={headerStatus.text}
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
      <AwcProjectChatDock
        startOpen={startChatOpen}
        projectId={project.id}
        threads={messengerThreads.threads}
        onSent={onAskSent}
      />
      {leaveConfirmOpen ? (
        <AwcProjectLeaveConfirmForm
          variant="dialog"
          pending={leavePending}
          errorMessage={leaveError}
          onConfirm={runLeave}
          onCancel={() => {
            clearLeaveError();
            setLeaveConfirmOpen(false);
          }}
        />
      ) : null}
    </div>
  );
}
