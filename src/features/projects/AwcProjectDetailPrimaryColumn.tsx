"use client";

import Link from "next/link";

import { AwcProjectComputerHistorySection } from "@/features/projects/computerHistory/public-api/presentation";
import AwcProjectDetailSection from "@/features/projects/AwcProjectDetailSection";
import AwcProjectEditOnMacActions from "@/features/projects/AwcProjectEditOnMacActions";
import { PROJECT_ACTIVITY_TASK_HASH_WITH_POUND } from "@/features/projects/utils/projectActivityTaskDeepLink.constant";
import AwcProjectNameEditor from "@/features/projects/AwcProjectNameEditor";
import AwcProjectPresenceBadge from "@/features/projects/AwcProjectPresenceBadge";
import AwcProjectReadOnlyCompositionSections from "@/features/projects/AwcProjectReadOnlyCompositionSections";
import AwcProjectPitfallsSection from "@/features/projects/pitfalls/AwcProjectPitfallsSection";
import AwcProjectRepoUrlsSection from "@/features/projects/repoUrls/AwcProjectRepoUrlsSection";
import { AWC_PROJECT_DETAIL_META_LABEL_CLASS } from "@/features/projects/awcProjectDetailSection.constant";
import {
  shouldShowProjectEditOnMacHelperText,
  type ProjectEditOnMacCta,
} from "@/features/projects/utils/resolveProjectEditOnMacCta";
import type { ProjectDevicePresenceLabel } from "@/features/projects/utils/buildProjectDevicePresenceLabel";
import type ProjectCompositionItem from "@/lib/projects/types/ProjectCompositionItem.type";
import type ProjectCompositionCounts from "@/lib/projects/types/ProjectCompositionCounts.type";
import formatProjectCompositionCountsLine from "@/lib/projects/formatProjectCompositionCountsLine";
import { APP_SURFACE_BODY_TEXT_CLASS } from "@/components/surfaces/appSurfaceStyles.constant";
import { APP_SURFACE_EYEBROW_TEXT_CLASS } from "@/components/surfaces/appSurfaceStyles.constant";
import type UserProjectRecord from "@/lib/projects/types/UserProjectRecord.type";

interface AwcProjectDetailPrimaryColumnProps {
  readonly project: UserProjectRecord;
  readonly startRename: boolean;
  readonly deviceDisplayName: string;
  readonly presence: ProjectDevicePresenceLabel;
  readonly editCta: ProjectEditOnMacCta;
  readonly counts: ProjectCompositionCounts;
  readonly items: readonly ProjectCompositionItem[];
  readonly isCompositionLoading: boolean;
}

export default function AwcProjectDetailPrimaryColumn({
  project,
  startRename,
  deviceDisplayName,
  presence,
  editCta,
  counts,
  items,
  isCompositionLoading,
}: AwcProjectDetailPrimaryColumnProps) {
  return (
    <div className="min-w-0 space-y-5">
      <header className="space-y-2">
        <p className={APP_SURFACE_EYEBROW_TEXT_CLASS}>Project</p>
        <AwcProjectNameEditor
          projectId={project.id}
          initialName={project.name}
          startInEditMode={startRename}
        />
        <p className={APP_SURFACE_BODY_TEXT_CLASS}>
          Rename here in Cloud. Choose folders and playbooks on{" "}
          {deviceDisplayName} in AgentWitch Local.
        </p>
      </header>

      <div className="flex flex-col gap-3 rounded-xl border border-awc-border/80 bg-awc-surface-2/80 p-4 dark:border-gray-800/80 dark:bg-white/[0.03] sm:flex-row sm:items-center sm:justify-between">
        <AwcProjectPresenceBadge
          statusIcon={presence.statusIcon}
          text={presence.text}
        />
        <div className="flex w-full flex-wrap items-center gap-2 sm:w-auto sm:justify-end">
          <Link
            href={PROJECT_ACTIVITY_TASK_HASH_WITH_POUND}
            className="inline-flex w-full items-center justify-center rounded-xl bg-gray-900 px-3 py-2 text-xs font-semibold text-white transition hover:bg-black sm:w-auto dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200"
          >
            New task
          </Link>
          <AwcProjectEditOnMacActions
            editCta={editCta}
            size="compact"
            layout="buttonOnly"
            fullWidthOnMobile
          />
        </div>
      </div>
      {editCta.helperText !== null &&
      shouldShowProjectEditOnMacHelperText(editCta.state) ? (
        <p className="-mt-3 text-xs text-awc-fg-muted dark:text-gray-400">
          {editCta.helperText}
        </p>
      ) : null}

      <AwcProjectDetailSection
        title="Overview"
        hint="Paths and bound composition summary."
      >
        <dl className="grid gap-3 sm:grid-cols-2">
          <div>
            <dt className={AWC_PROJECT_DETAIL_META_LABEL_CLASS}>Folder</dt>
            <dd className="mt-1 break-all text-sm text-awc-fg dark:text-white/90">
              {project.folderPath}
            </dd>
          </div>
          <div>
            <dt className={AWC_PROJECT_DETAIL_META_LABEL_CLASS}>Composition</dt>
            <dd className="mt-1 text-sm text-awc-fg dark:text-white/90">
              {formatProjectCompositionCountsLine(counts) ??
                "Open in AgentWitch Local to bind playbooks"}
            </dd>
          </div>
        </dl>
      </AwcProjectDetailSection>

      <AwcProjectReadOnlyCompositionSections
        deviceDisplayName={deviceDisplayName}
        items={items}
        isLoading={isCompositionLoading}
      />
      <AwcProjectPitfallsSection
        projectId={project.id}
        deviceDisplayName={deviceDisplayName}
        editCta={editCta}
      />
      <AwcProjectRepoUrlsSection project={project} />
      <AwcProjectComputerHistorySection projectId={project.id} />
    </div>
  );
}
