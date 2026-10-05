"use client";

import { twMerge } from "tailwind-merge";

import AwcProjectAccessPanelBody from "@/features/projects/access/AwcProjectAccessPanelBody";
import { AWC_PROJECT_ACCESS_COPY } from "@/features/projects/access/awcProjectAccessCopy.constant";
import { HUMAN_INVITE_UI_COPY } from "@/features/projects/access/humanInvites/humanInviteUiCopy.constant";
import { useAwcProjectAccess } from "@/features/projects/access/hooks/useAwcProjectAccess";
import { ProjectSkillsSection } from "@/features/project-skill-share/public-api/presentation";
import { APP_SURFACE_BODY_TEXT_CLASS } from "@/components/surfaces/appSurfaceStyles.constant";
import { APP_SURFACE_EYEBROW_TEXT_CLASS } from "@/components/surfaces/appSurfaceStyles.constant";
import { resolveProjectAccessLoadError } from "@/lib/projects/acl/mapProjectAccessError";

export type AwcProjectAccessOwnerPanelProps = {
  readonly projectId: string;
  readonly className?: string;
  readonly ownerEmail?: string | null;
  readonly ownerDisplayName?: string | null;
  readonly viewerUserId?: string | null;
};

/** Owner Bots & people panel — access body + skills. */
export default function AwcProjectAccessOwnerPanel({
  projectId,
  className = "",
  ownerEmail = null,
  ownerDisplayName = null,
  viewerUserId = null,
}: AwcProjectAccessOwnerPanelProps) {
  const access = useAwcProjectAccess(projectId);
  const copy = AWC_PROJECT_ACCESS_COPY;
  const humanCopy = HUMAN_INVITE_UI_COPY;
  const ownerReady = !access.isLoading && !access.loadError;

  return (
    <section
      className={twMerge(
        "space-y-4 rounded-2xl border border-gray-200/80 bg-white/80 p-4 shadow-sm dark:border-gray-800/80 dark:bg-gray-950/40",
        className,
      )}
    >
      <header className="space-y-1">
        <p className={APP_SURFACE_EYEBROW_TEXT_CLASS}>{copy.eyebrow}</p>
        <h2 className="text-base font-semibold text-gray-900 dark:text-white">
          {humanCopy.botsPeopleTitle}
        </h2>
        <p className={`text-sm ${APP_SURFACE_BODY_TEXT_CLASS}`}>
          {humanCopy.botsPeopleIntro}
        </p>
      </header>

      {access.isLoading ? (
        <p className="text-sm text-gray-500">{copy.loading}</p>
      ) : null}

      {access.loadError ? (
        <p className="rounded-md border border-amber-200/80 bg-amber-50/80 px-3 py-2 text-sm text-amber-900 dark:border-amber-900/50 dark:bg-amber-950/40 dark:text-amber-100">
          {resolveProjectAccessLoadError(access.loadError, copy.forbidden)}
        </p>
      ) : null}

      {ownerReady ? (
        <AwcProjectAccessPanelBody
          projectId={projectId}
          access={access}
          ownerEmail={ownerEmail}
          ownerDisplayName={ownerDisplayName}
          viewerUserId={viewerUserId}
        />
      ) : null}

      {!access.isLoading ? (
        <ProjectSkillsSection projectId={projectId} />
      ) : null}

      {access.message ? (
        <p className="text-sm text-gray-600 dark:text-gray-300">
          {access.message}
        </p>
      ) : null}
    </section>
  );
}
