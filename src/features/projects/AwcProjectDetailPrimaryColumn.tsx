"use client";

import AwcProjectRepoUrlsSection from "@/features/projects/repoUrls/AwcProjectRepoUrlsSection";
import AwcProjectEditOnMacActions from "@/features/projects/AwcProjectEditOnMacActions";
import AwcProjectNameEditor from "@/features/projects/AwcProjectNameEditor";
import AwcProjectPresenceBadge from "@/features/projects/AwcProjectPresenceBadge";
import AwcProjectReadOnlyCompositionSections from "@/features/projects/AwcProjectReadOnlyCompositionSections";
import {
  shouldShowProjectEditOnMacHelperText,
  type ProjectEditOnMacCta,
} from "@/features/projects/utils/resolveProjectEditOnMacCta";
import type { ProjectDevicePresenceLabel } from "@/features/projects/utils/buildProjectDevicePresenceLabel";
import type ProjectCompositionItem from "@/lib/projects/types/ProjectCompositionItem.type";
import type ProjectCompositionCounts from "@/lib/projects/types/ProjectCompositionCounts.type";
import formatProjectCompositionCountsLine from "@/lib/projects/formatProjectCompositionCountsLine";
import { APP_SURFACE_BODY_TEXT_CLASS } from "@/components/surfaces/appSurfaceStyles.constant";
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
    <div className="min-w-0">
      <AwcProjectNameEditor
        projectId={project.id}
        initialName={project.name}
        startInEditMode={startRename}
      />
      <p className={`mt-2 ${APP_SURFACE_BODY_TEXT_CLASS}`}>
        Rename here in Agent Witch Cloud. Choose folders and playbooks on{" "}
        {deviceDisplayName} in Agent Witch Local.
      </p>
      <div className="mt-4 flex flex-col gap-3 rounded-xl border border-gray-200/80 bg-gray-50/80 p-4 dark:border-gray-800/80 dark:bg-white/[0.03] sm:flex-row sm:items-center sm:justify-between">
        <AwcProjectPresenceBadge
          statusIcon={presence.statusIcon}
          text={presence.text}
        />
        <AwcProjectEditOnMacActions
          editCta={editCta}
          size="compact"
          layout="buttonOnly"
          fullWidthOnMobile
        />
      </div>
      {editCta.helperText !== null &&
      shouldShowProjectEditOnMacHelperText(editCta.state) ? (
        <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
          {editCta.helperText}
        </p>
      ) : null}
      <dl className="mt-4 space-y-3 text-sm">
        <div>
          <dt className="text-xs font-medium text-gray-500 dark:text-gray-400">
            Folder
          </dt>
          <dd className="mt-0.5 text-gray-800 dark:text-white/90">
            {project.folderPath}
          </dd>
        </div>
        <div>
          <dt className="text-xs font-medium text-gray-500 dark:text-gray-400">
            Composition
          </dt>
          <dd className="mt-0.5 text-gray-800 dark:text-white/90">
            {formatProjectCompositionCountsLine(counts) ??
              "Composition on Mac — open in Agent Witch Local"}
          </dd>
        </div>
      </dl>
      <AwcProjectReadOnlyCompositionSections
        deviceDisplayName={deviceDisplayName}
        items={items}
        isLoading={isCompositionLoading}
      />
      <AwcProjectRepoUrlsSection project={project} />
    </div>
  );
}
