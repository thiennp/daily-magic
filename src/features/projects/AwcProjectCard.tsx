"use client";

import Link from "next/link";
import { useId } from "react";

import type { MyMacDevice } from "@/features/agent/hooks/useMyMacDevices";
import AwcProjectCardActionsMenu from "@/features/projects/AwcProjectCardActionsMenu";
import AwcProjectPresenceBadge from "@/features/projects/AwcProjectPresenceBadge";
import useAwcProjectDevicePresentation from "@/features/projects/hooks/useAwcProjectDevicePresentation";
import { shouldShowProjectEditOnMacHelperText } from "@/features/projects/utils/resolveProjectEditOnMacCta";
import { APP_SURFACE_NESTED_CARD_CLASS } from "@/components/surfaces/appSurfaceStyles.constant";
import formatProjectCompositionCountsLine from "@/lib/projects/formatProjectCompositionCountsLine";
import type ProjectCompositionCounts from "@/lib/projects/types/ProjectCompositionCounts.type";
import type UserProjectRecord from "@/lib/projects/types/UserProjectRecord.type";

interface AwcProjectCardProps {
  readonly project: UserProjectRecord;
  readonly compositionCounts: ProjectCompositionCounts;
  readonly devices: readonly MyMacDevice[];
  readonly displayNameById: ReadonlyMap<string, string>;
  readonly localTokenHash: string | null;
  readonly onProjectDeleted?: () => void;
}

export default function AwcProjectCard({
  project,
  compositionCounts,
  devices,
  displayNameById,
  localTokenHash,
  onProjectDeleted,
}: AwcProjectCardProps) {
  const { presence, editCta } = useAwcProjectDevicePresentation({
    project,
    devices,
    displayNameById,
    localTokenHash,
  });

  const editHelperId = useId();
  const showHelperText =
    editCta.helperText !== null &&
    shouldShowProjectEditOnMacHelperText(editCta.state);
  const detailHref = `/projects/${project.id}`;

  return (
    <article
      className={`relative flex h-full flex-col ${APP_SURFACE_NESTED_CARD_CLASS}`}
    >
      <Link
        href={detailHref}
        className="absolute inset-0 z-0 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/40"
        aria-label={`Open project ${project.name}`}
      />
      <div className="relative z-10 flex min-w-0 flex-col pointer-events-none">
        <div className="flex min-w-0 items-start justify-between gap-2">
          <div className="min-w-0 flex-1">
            <h3
              className="truncate text-sm font-medium text-gray-800 dark:text-white/90"
              title={project.name}
            >
              {project.name}
            </h3>
            <p
              className="mt-0.5 truncate text-xs text-gray-500 dark:text-gray-400"
              title={project.folderPath}
            >
              {project.folderPath}
            </p>
          </div>
          <div className="pointer-events-auto">
            <AwcProjectCardActionsMenu
              projectId={project.id}
              projectName={project.name}
              editCta={editCta}
              editHelperId={showHelperText ? editHelperId : undefined}
              onProjectDeleted={onProjectDeleted}
            />
          </div>
        </div>
        <div className="mt-3 flex min-w-0 flex-col gap-1">
          <AwcProjectPresenceBadge
            statusIcon={presence.statusIcon}
            text={presence.text}
          />
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {formatProjectCompositionCountsLine(compositionCounts)}
          </p>
        </div>
        {showHelperText ? (
          <p
            id={editHelperId}
            className="mt-auto pt-3 text-xs text-gray-500 dark:text-gray-400"
          >
            {editCta.helperText}
          </p>
        ) : null}
      </div>
    </article>
  );
}
