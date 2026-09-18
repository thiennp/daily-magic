"use client";

import Link from "next/link";

import type { MyMacDevice } from "@/features/agent/hooks/useMyMacDevices";
import AwcProjectEditOnMacActions from "@/features/projects/AwcProjectEditOnMacActions";
import useAwcProjectDevicePresentation from "@/features/projects/hooks/useAwcProjectDevicePresentation";
import formatProjectCompositionCountsLine from "@/lib/projects/formatProjectCompositionCountsLine";
import type ProjectCompositionCounts from "@/lib/projects/types/ProjectCompositionCounts.type";
import type UserProjectRecord from "@/lib/projects/types/UserProjectRecord.type";
import {
  APP_SURFACE_NESTED_CARD_CLASS,
  APP_SURFACE_CTA_SECONDARY_SM_CLASS,
} from "@/components/surfaces/appSurfaceStyles.constant";

interface AwcProjectListRowProps {
  readonly project: UserProjectRecord;
  readonly compositionCounts: ProjectCompositionCounts;
  readonly devices: readonly MyMacDevice[];
  readonly displayNameById: ReadonlyMap<string, string>;
  readonly localTokenHash: string | null;
}

export default function AwcProjectListRow({
  project,
  compositionCounts,
  devices,
  displayNameById,
  localTokenHash,
}: AwcProjectListRowProps) {
  const { presence, editCta, statusPrefix } = useAwcProjectDevicePresentation({
    project,
    devices,
    displayNameById,
    localTokenHash,
  });

  return (
    <article className={APP_SURFACE_NESTED_CARD_CLASS}>
      <div className="flex min-w-0 flex-col gap-1">
        <h3 className="truncate text-sm font-medium text-gray-800 dark:text-white/90">
          {project.name}
        </h3>
        <p className="truncate text-xs text-gray-500 dark:text-gray-400">
          {project.folderPath}
        </p>
        <p className="text-xs text-gray-600 dark:text-gray-300">
          <span aria-hidden="true">{statusPrefix} </span>
          {presence.text}
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          {formatProjectCompositionCountsLine(compositionCounts)}
        </p>
      </div>
      <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-end">
        <Link
          href={`/projects/${project.id}`}
          className={`${APP_SURFACE_CTA_SECONDARY_SM_CLASS} w-full sm:w-auto`}
        >
          View details
        </Link>
        <AwcProjectEditOnMacActions
          editCta={editCta}
          size="compact"
          layout="buttonOnly"
          fullWidthOnMobile
        />
      </div>
      {editCta.helperText !== null ? (
        <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
          {editCta.helperText}
        </p>
      ) : null}
    </article>
  );
}
