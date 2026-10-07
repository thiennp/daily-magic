"use client";

import { twMerge } from "tailwind-merge";

import AwcProjectInboxSection from "@/features/projects/access/inbox/AwcProjectInboxSection";
import { AWC_PROJECT_ACCESS_COPY } from "@/features/projects/access/awcProjectAccessCopy.constant";
import { HUMAN_INVITE_UI_COPY } from "@/features/projects/access/humanInvites/humanInviteUiCopy.constant";
import { ProjectSkillsSection } from "@/features/project-skill-share/public-api/presentation";
import { APP_SURFACE_BODY_TEXT_CLASS } from "@/components/surfaces/appSurfaceStyles.constant";
import { APP_SURFACE_EYEBROW_TEXT_CLASS } from "@/components/surfaces/appSurfaceStyles.constant";
import type { ProjectPageActorRole } from "@/lib/projects/acl/humanInvites/authorizeProjectPageActor";

export type AwcProjectAccessMemberViewerPanelProps = {
  readonly projectId: string;
  readonly className?: string;
  readonly pageActorRole: Exclude<ProjectPageActorRole, "owner">;
};

/** Member/viewer Bots & people — inbox + skills (no invite admin). */
export default function AwcProjectAccessMemberViewerPanel({
  projectId,
  className = "",
  pageActorRole,
}: AwcProjectAccessMemberViewerPanelProps) {
  const copy = AWC_PROJECT_ACCESS_COPY;
  const humanCopy = HUMAN_INVITE_UI_COPY;
  const canCompose = pageActorRole === "member";

  return (
    <section
      className={twMerge(
        "space-y-4 rounded-2xl border border-awc-border/80 bg-white/80 p-4 shadow-sm dark:border-gray-800/80 dark:bg-gray-950/40",
        className,
      )}
    >
      <header className="space-y-1">
        <p className={APP_SURFACE_EYEBROW_TEXT_CLASS}>{copy.eyebrow}</p>
        <h2 className="text-base font-semibold text-awc-fg dark:text-white">
          {humanCopy.botsPeopleTitle}
        </h2>
        <p className={`text-sm ${APP_SURFACE_BODY_TEXT_CLASS}`}>
          {pageActorRole === "viewer"
            ? humanCopy.roleViewerOneLiner
            : humanCopy.roleMemberOneLiner}
        </p>
      </header>

      <AwcProjectInboxSection
        projectId={projectId}
        enabled
        canCompose={canCompose}
      />

      {pageActorRole === "viewer" ? (
        <p className="text-xs text-awc-fg-muted">{humanCopy.viewerConnectHint}</p>
      ) : null}

      <ProjectSkillsSection projectId={projectId} canEdit={false} />
    </section>
  );
}
