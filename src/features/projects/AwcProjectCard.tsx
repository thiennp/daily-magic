"use client";

import Link from "next/link";
import { useId } from "react";

import type { MyMacDevice } from "@/features/agent/hooks/useMyMacDevices";
import { AWC_PROJECTS_PAGE_COPY } from "@/features/projects/awcProjectsPageCopy.constant";
import AwcProjectCardActionsMenu from "@/features/projects/AwcProjectCardActionsMenu";
import AwcProjectPresenceBadge from "@/features/projects/AwcProjectPresenceBadge";
import useAwcProjectDevicePresentation from "@/features/projects/hooks/useAwcProjectDevicePresentation";
import useCanDeleteOwnedProject from "@/features/projects/hooks/useCanDeleteOwnedProject";
import { shouldShowProjectEditOnMacHelperText } from "@/features/projects/utils/resolveProjectEditOnMacCta";
import {
  PROJECTS_V5_CARD_CLASS,
  PROJECTS_V5_CARD_LINK_CLASS,
  PROJECTS_V5_CARD_META_CLASS,
  PROJECTS_V5_CARD_TITLE_CLASS,
  PROJECTS_V5_DEFAULT_CHIP_CLASS,
} from "@/features/projects/projectsPageV5Classes.constant";
import formatProjectCompositionCountsLine from "@/lib/projects/formatProjectCompositionCountsLine";
import formatProjectFolderPathForList from "@/features/projects/utils/formatProjectFolderPathForList";
import resolveProjectListCardTitle from "@/features/projects/utils/resolveProjectListCardTitle";
import type ProjectCompositionCounts from "@/lib/projects/types/ProjectCompositionCounts.type";
import type UserProjectRecord from "@/lib/projects/types/UserProjectRecord.type";
import { buildProjectCardHrefForIntent } from "@/features/projects/navConsolidation/buildProjectCardHrefForIntent";
import type { NavConsolidationIntent } from "@/lib/shell/navConsolidationIntent.constant";

interface AwcProjectCardProps {
  readonly project: UserProjectRecord;
  readonly compositionCounts: ProjectCompositionCounts;
  readonly devices: readonly MyMacDevice[];
  readonly displayNameById: ReadonlyMap<string, string>;
  readonly localTokenHash: string | null;
  readonly onProjectDeleted?: () => void;
  readonly intent?: NavConsolidationIntent | null;
}

export default function AwcProjectCard({
  project,
  compositionCounts,
  devices,
  displayNameById,
  localTokenHash,
  onProjectDeleted,
  intent = null,
}: AwcProjectCardProps) {
  const { presence, editCta } = useAwcProjectDevicePresentation({
    project,
    devices,
    displayNameById,
    localTokenHash,
  });
  const canDelete = useCanDeleteOwnedProject(project.ownerUserId);
  const editHelperId = useId();
  const listTitle = resolveProjectListCardTitle(project);
  const folderPathDisplay = formatProjectFolderPathForList(project.folderPath);
  const compositionLine = formatProjectCompositionCountsLine(compositionCounts);
  const showHelperText =
    editCta.helperText !== null &&
    shouldShowProjectEditOnMacHelperText(editCta.state);
  const detailHref = buildProjectCardHrefForIntent(project.id, intent);

  return (
    <article
      className={`relative flex h-full flex-col ${PROJECTS_V5_CARD_CLASS}`}
    >
      <Link
        href={detailHref}
        className={PROJECTS_V5_CARD_LINK_CLASS}
        aria-label={`Open project ${listTitle.primary}`}
      />
      <div className="relative z-10 flex min-w-0 flex-col pointer-events-none">
        <div className="flex min-w-0 items-start justify-between gap-2">
          <div className="min-w-0 flex-1">
            <h3
              className={PROJECTS_V5_CARD_TITLE_CLASS}
              title={listTitle.primary}
            >
              {listTitle.primary}
            </h3>
            {listTitle.secondaryLabel !== null ? (
              <p className={`mt-1 ${PROJECTS_V5_DEFAULT_CHIP_CLASS}`}>
                {listTitle.secondaryLabel}
              </p>
            ) : null}
            <p
              className={`mt-1 line-clamp-2 break-all ${PROJECTS_V5_CARD_META_CLASS}`}
              title={folderPathDisplay.full}
            >
              {folderPathDisplay.display === ""
                ? AWC_PROJECTS_PAGE_COPY.noFolder
                : folderPathDisplay.display}
            </p>
          </div>
          <div className="pointer-events-auto">
            <AwcProjectCardActionsMenu
              projectId={project.id}
              projectName={project.name}
              editCta={editCta}
              editHelperId={showHelperText ? editHelperId : undefined}
              onProjectDeleted={onProjectDeleted}
              canDelete={canDelete}
              canAssign={project.viewerRole !== "viewer"}
            />
          </div>
        </div>
        <div className="mt-3 flex min-w-0 flex-col gap-1">
          <AwcProjectPresenceBadge
            statusIcon={presence.statusIcon}
            text={presence.text}
          />
          {compositionLine !== null ? (
            <p className={PROJECTS_V5_CARD_META_CLASS}>{compositionLine}</p>
          ) : null}
        </div>
        {showHelperText ? (
          <p
            id={editHelperId}
            className={`mt-auto pt-3 ${PROJECTS_V5_CARD_META_CLASS}`}
          >
            {editCta.helperText}
          </p>
        ) : null}
      </div>
    </article>
  );
}
