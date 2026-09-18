"use client";

import Link from "next/link";

import type { MyMacDevice } from "@/features/agent/hooks/useMyMacDevices";
import AwcProjectListRow from "@/features/projects/AwcProjectListRow";
import { APP_SURFACE_TEXT_LINK_CLASS } from "@/components/surfaces/appSurfaceStyles.constant";
import type ProjectCompositionCounts from "@/lib/projects/types/ProjectCompositionCounts.type";
import type UserProjectRecord from "@/lib/projects/types/UserProjectRecord.type";

const EMPTY_COMPOSITION_COUNTS: ProjectCompositionCounts = {
  harness: 0,
  workflow: 0,
  agent: 0,
};

interface AwcProjectsListBodyProps {
  readonly isLoading: boolean;
  readonly searchQuery: string;
  readonly projects: readonly UserProjectRecord[];
  readonly visibleProjects: readonly UserProjectRecord[];
  readonly compositionCountsByProjectId: Readonly<
    Record<string, ProjectCompositionCounts>
  >;
  readonly devices: readonly MyMacDevice[];
  readonly displayNameById: ReadonlyMap<string, string>;
  readonly localTokenHash: string | null;
}

export default function AwcProjectsListBody({
  isLoading,
  searchQuery,
  projects,
  visibleProjects,
  compositionCountsByProjectId,
  devices,
  displayNameById,
  localTokenHash,
}: AwcProjectsListBodyProps) {
  if (isLoading) {
    return (
      <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
        Loading projects…
      </p>
    );
  }

  if (projects.length === 0) {
    return (
      <div className="mt-6 flex flex-col items-center gap-3 py-6 text-center">
        <p className="text-sm font-medium text-gray-800 dark:text-white/90">
          No projects yet.
        </p>
        <p className="max-w-sm text-sm text-gray-500 dark:text-gray-400">
          Connect a Mac, then add the first repo it should work on.
        </p>
        <Link href="/" className={APP_SURFACE_TEXT_LINK_CLASS}>
          Go to home to connect a Mac
        </Link>
      </div>
    );
  }

  if (visibleProjects.length === 0) {
    return (
      <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
        No projects match &ldquo;{searchQuery.trim()}&rdquo;.
      </p>
    );
  }

  return (
    <ul className="mt-2 divide-y divide-gray-200/80 dark:divide-gray-800/80">
      {visibleProjects.map((project) => (
        <li key={project.id}>
          <AwcProjectListRow
            project={project}
            compositionCounts={
              compositionCountsByProjectId[project.id] ??
              EMPTY_COMPOSITION_COUNTS
            }
            devices={devices}
            displayNameById={displayNameById}
            localTokenHash={localTokenHash}
          />
        </li>
      ))}
    </ul>
  );
}
