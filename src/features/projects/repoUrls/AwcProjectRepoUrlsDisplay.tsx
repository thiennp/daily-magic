"use client";

import AwcBotSupportUrlKindLabel from "@/features/projects/botSupportUrl/AwcBotSupportUrlKindLabel";
import { AWC_PROJECT_REPO_URLS_COPY } from "@/features/projects/repoUrls/awcProjectRepoUrlsCopy.constant";
import type { ProjectRepoMetadata } from "@/lib/projects/validateProjectRepoUrls";

interface AwcProjectRepoUrlsDisplayProps {
  readonly metadata: ProjectRepoMetadata;
  readonly readOnlyNote?: boolean;
}

export default function AwcProjectRepoUrlsDisplay({
  metadata,
  readOnlyNote = false,
}: AwcProjectRepoUrlsDisplayProps) {
  const copy = AWC_PROJECT_REPO_URLS_COPY;

  return (
    <div>
      <h3 className="text-sm font-medium text-gray-800 dark:text-white/90">
        {copy.heading}
      </h3>
      {readOnlyNote ? (
        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
          {copy.readOnlyNote}
        </p>
      ) : null}
      {metadata.repoUrls.length === 0 ? (
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          {copy.empty}
        </p>
      ) : (
        <ul className="mt-2 space-y-1">
          {metadata.repoUrls.map((url) => (
            <li key={url} className="space-y-0.5">
              <AwcBotSupportUrlKindLabel url={url} />
              <p className="break-all font-mono text-xs text-gray-800 dark:text-white/90">
                {url}
              </p>
            </li>
          ))}
        </ul>
      )}
      <dl className="mt-3 text-sm">
        <div>
          <dt className="text-xs font-medium text-gray-500 dark:text-gray-400">
            {copy.defaultBranchLabel}
          </dt>
          <dd className="mt-0.5 text-gray-800 dark:text-white/90">
            {metadata.defaultBranch ?? "—"}
          </dd>
        </div>
      </dl>
    </div>
  );
}
