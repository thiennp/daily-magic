"use client";

import Link from "next/link";

import useMyMacDevices from "@/features/agent/hooks/useMyMacDevices";
import AwcProjectAccessPanel from "@/features/projects/access/AwcProjectAccessPanel";
import AwcProjectMessengerSection from "@/features/projects/messenger/AwcProjectMessengerSection";
import AwcProjectDeleteControl from "@/features/projects/AwcProjectDeleteControl";
import AwcProjectDetailPrimaryColumn from "@/features/projects/AwcProjectDetailPrimaryColumn";
import useAwcProjectComposition from "@/features/projects/hooks/useAwcProjectComposition";
import useAwcProjectDevicePresentation from "@/features/projects/hooks/useAwcProjectDevicePresentation";
import useLocalMacBrowserContext from "@/features/home/hooks/useLocalMacBrowserContext";
import AppPanel from "@/components/surfaces/AppPanel";
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
  actorEmail = null,
  actorDisplayName = null,
}: AwcProjectDetailPanelProps) {
  const { localTokenHash } = useLocalMacBrowserContext();
  const { devices, displayNameById } = useMyMacDevices();
  const isOwner = pageActorRole === "owner";
  const { deviceDisplayName, presence, editCta } =
    useAwcProjectDevicePresentation({
      project,
      devices,
      displayNameById,
      localTokenHash,
    });
  const {
    counts,
    items,
    isLoading: isCompositionLoading,
  } = useAwcProjectComposition(project.id);
  const copy = HUMAN_INVITE_UI_COPY;
  const roleChip =
    pageActorRole === "member"
      ? copy.roleChipMember
      : pageActorRole === "viewer"
        ? copy.roleChipViewer
        : null;

  return (
    <div className="grid grid-cols-1 gap-8 xl:grid-cols-[minmax(0,1fr)_minmax(20rem,24rem)] xl:items-start xl:gap-8">
      <div className="min-w-0 xl:col-start-1 xl:row-start-1">
        <AppPanel padding="compact">
          <p className="mb-5">
            <Link
              href="/projects"
              className="text-sm font-medium text-brand-600 hover:text-brand-700 dark:text-brand-400"
            >
              ← All projects
            </Link>
          </p>
          {roleChip ? (
            <p className="mb-3 inline-flex rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700 dark:bg-brand-950/40 dark:text-brand-200">
              {roleChip}
            </p>
          ) : null}
          <AwcProjectDetailPrimaryColumn
            project={project}
            startRename={startRename && isOwner}
            deviceDisplayName={deviceDisplayName}
            presence={presence}
            editCta={editCta}
            counts={counts}
            items={items}
            isCompositionLoading={isCompositionLoading}
          />
        </AppPanel>
      </div>
      <aside className="order-2 min-w-0 xl:sticky xl:top-6 xl:order-none xl:col-start-2 xl:row-start-1">
        <AwcProjectAccessPanel
          projectId={project.id}
          className="mt-0"
          pageActorRole={pageActorRole}
          ownerEmail={isOwner ? actorEmail : null}
          ownerDisplayName={isOwner ? actorDisplayName : null}
        />
      </aside>
      <div className="order-3 min-w-0 xl:order-none xl:col-span-2 xl:col-start-1 xl:row-start-2">
        <AppPanel padding="compact">
          <AwcProjectMessengerSection projectId={project.id} />
        </AppPanel>
      </div>
      {isOwner ? (
        <div className="order-4 min-w-0 xl:order-none xl:col-start-1 xl:row-start-3">
          <AwcProjectDeleteControl project={project} variant="detail" />
        </div>
      ) : null}
    </div>
  );
}
