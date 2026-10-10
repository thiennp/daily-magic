"use client";

import Link from "next/link";

import type { MyMacDevice } from "@/features/agent/hooks/public-api/types";
import AwcProjectCard from "@/features/projects/AwcProjectCard";
import Button from "@/components/ui/button/Button";
import AwcProjectsListLoading from "@/features/projects/AwcProjectsListLoading";
import AwcProjectsListLoadErrorPanel from "@/features/projects/AwcProjectsListLoadErrorPanel";
import { AWC_PROJECTS_PAGE_COPY } from "@/features/projects/awcProjectsPageCopy.constant";
import { APP_SURFACE_TEXT_LINK_CLASS } from "@/components/surfaces/appSurfaceStyles.constant";
import {
  PROJECTS_V5_HEADING_CLASS,
  PROJECTS_V5_MUTED_TEXT_CLASS,
} from "@/features/projects/projectsPageV5Classes.constant";
import type ProjectCompositionCounts from "@/lib/projects/types/ProjectCompositionCounts.type";
import type UserProjectRecord from "@/lib/projects/types/UserProjectRecord.type";
import type { NavConsolidationIntent } from "@/lib/shell/navConsolidationIntent.constant";

const EMPTY_COMPOSITION_COUNTS: ProjectCompositionCounts = {
  harness: 0,
  workflow: 0,
  agent: 0,
};

interface AwcProjectsListBodyProps {
  readonly isLoading: boolean;
  readonly loadFailed: boolean;
  readonly onRetryLoad: () => void;
  readonly onClearSearch: () => void;
  readonly searchQuery: string;
  readonly projects: readonly UserProjectRecord[];
  readonly visibleProjects: readonly UserProjectRecord[];
  readonly compositionCountsByProjectId: Readonly<
    Record<string, ProjectCompositionCounts>
  >;
  readonly devices: readonly MyMacDevice[];
  readonly displayNameById: ReadonlyMap<string, string>;
  readonly localTokenHash: string | null;
  readonly onProjectDeleted?: (projectId: string) => void;
  readonly intent?: NavConsolidationIntent | null;
}

export default function AwcProjectsListBody({
  isLoading,
  loadFailed,
  onRetryLoad,
  onClearSearch,
  searchQuery,
  projects,
  visibleProjects,
  compositionCountsByProjectId,
  devices,
  displayNameById,
  localTokenHash,
  onProjectDeleted,
  intent = null,
}: AwcProjectsListBodyProps) {
  if (isLoading) {
    return <AwcProjectsListLoading />;
  }

  if (loadFailed) {
    return (
      <AwcProjectsListLoadErrorPanel
        onRetry={() => {
          onRetryLoad();
        }}
      />
    );
  }

  if (projects.length === 0) {
    return (
      <div className="flex flex-col items-center gap-3 py-6 text-center">
        <p className={PROJECTS_V5_HEADING_CLASS}>
          {AWC_PROJECTS_PAGE_COPY.emptyTitle}
        </p>
        <p className={`max-w-sm ${PROJECTS_V5_MUTED_TEXT_CLASS}`}>
          {AWC_PROJECTS_PAGE_COPY.emptyBody}{" "}
          <Link href="/" className={APP_SURFACE_TEXT_LINK_CLASS}>
            {AWC_PROJECTS_PAGE_COPY.emptyHomeLink}
          </Link>
        </p>
      </div>
    );
  }

  if (visibleProjects.length === 0) {
    return (
      <div className="mt-4 flex flex-col items-center gap-3 py-6 text-center">
        <p className={PROJECTS_V5_HEADING_CLASS}>
          {AWC_PROJECTS_PAGE_COPY.noMatchTitle(searchQuery.trim())}
        </p>
        <Button size="sm" variant="outline" onClick={onClearSearch}>
          {AWC_PROJECTS_PAGE_COPY.clearSearch}
        </Button>
      </div>
    );
  }

  return (
    <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
      {visibleProjects.map((project) => (
        <li key={project.id} className="min-w-0">
          <AwcProjectCard
            project={project}
            compositionCounts={
              compositionCountsByProjectId[project.id] ??
              EMPTY_COMPOSITION_COUNTS
            }
            devices={devices}
            displayNameById={displayNameById}
            localTokenHash={localTokenHash}
            intent={intent}
            onProjectDeleted={() => {
              onProjectDeleted?.(project.id);
            }}
          />
        </li>
      ))}
    </ul>
  );
}
