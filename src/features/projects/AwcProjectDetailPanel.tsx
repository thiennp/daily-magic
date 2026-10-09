"use client";

import AwcProjectChatDock from "@/features/projects/chatDock/AwcProjectChatDock";
import { useAwcProjectChatSurface } from "@/features/projects/chatDock/useAwcProjectChatSurface";
import AwcProjectDetailBanners from "@/features/projects/AwcProjectDetailBanners";
import AwcProjectDetailHeader from "@/features/projects/AwcProjectDetailHeader";
import AwcProjectDetailTabBar from "@/features/projects/AwcProjectDetailTabBar";
import AwcProjectDetailTabPanels from "@/features/projects/AwcProjectDetailTabPanels";
import AwcProjectLeaveConfirmForm from "@/features/projects/AwcProjectLeaveConfirmForm";
import AwcProjectMembersColumn from "@/features/projects/AwcProjectMembersColumn";
import useAwcProjectDetailNavigation from "@/features/projects/hooks/useAwcProjectDetailNavigation";
import useAwcProjectDetailPanelData from "@/features/projects/hooks/useAwcProjectDetailPanelData";
import useAwcProjectLeaveFlow from "@/features/projects/hooks/useAwcProjectLeaveFlow";
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

/** Project page: header, tabs, Members rail, Chat dock (P1-S1: no Activity tab). */
export default function AwcProjectDetailPanel({
  project,
  startRename = false,
  startChatOpen = false,
  pageActorRole = "owner",
  actorEmail = null,
  actorDisplayName = null,
  actorUserId = null,
}: AwcProjectDetailPanelProps) {
  const isOwner = pageActorRole === "owner";
  const nav = useAwcProjectDetailNavigation({ startRename, isOwner });
  const { activeTab, setActiveTab, onGotoTab } = nav;
  const d = useAwcProjectDetailPanelData(project);
  const chat = useAwcProjectChatSurface({
    startOpen: startChatOpen,
    reloadThreads: d.messengerThreads.reload,
  });
  const leave = useAwcProjectLeaveFlow(project.id);

  return (
    <div className="grid min-w-0 grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-0 xl:grid-cols-[minmax(0,1fr)_21.25rem]">
      <div className="flex min-w-0 flex-col gap-5 lg:pr-5">
        <AwcProjectDetailHeader
          projectId={project.id}
          projectName={project.name}
          status={d.headerStatus}
          pageActorRole={pageActorRole}
          editCta={d.editCta}
          canRename={isOwner}
          canApprove={isOwner}
          canDelete={isOwner}
          canLeave={!isOwner}
          onRename={nav.onRename}
          onInvite={() => onGotoTab("team")}
          onDelete={() => setActiveTab("settings")}
          onLeave={leave.open}
        />
        <AwcProjectDetailBanners
          project={project}
          pageActorRole={pageActorRole}
          onAttachComputer={() => onGotoTab("team")}
        />
        <AwcProjectDetailTabBar
          activeTab={activeTab}
          onTabChange={setActiveTab}
          rulesImportantCount={d.rulesImportantCount}
          openTasksCount={d.openTasksCount}
        />
        <AwcProjectDetailTabPanels
          activeTab={activeTab}
          project={project}
          startRename={nav.renameInSettings}
          pageActorRole={pageActorRole}
          deviceDisplayName={d.deviceDisplayName}
          editCta={d.editCta}
          pitfalls={d.pitfalls}
          computerStatus={d.headerStatus.text}
          onGotoTab={onGotoTab}
          onGotoChat={chat.onGotoChat}
        />
      </div>
      <AwcProjectMembersColumn
        projectId={project.id}
        pageActorRole={pageActorRole}
        ownerEmail={actorEmail}
        ownerDisplayName={actorDisplayName}
        viewerUserId={actorUserId}
        onMessageHelper={chat.onGotoChat}
        onOpenSettings={() => setActiveTab("settings")}
        onLeave={leave.open}
      />
      <AwcProjectChatDock
        project={project}
        isOwner={isOwner}
        threads={d.messengerThreads.threads}
        chat={chat}
        onUnreadMaybeChanged={d.messengerThreads.reload}
      />
      {leave.isOpen ? (
        <AwcProjectLeaveConfirmForm
          variant="dialog"
          pending={leave.pending}
          errorMessage={leave.errorMessage}
          onConfirm={leave.confirm}
          onCancel={leave.cancel}
        />
      ) : null}
    </div>
  );
}
