"use client";

import useAgentWitchServerRelease from "@/features/agent-witch/hooks/useAgentWitchServerRelease";

const buildReleaseTitle = (
  release: NonNullable<
    ReturnType<typeof useAgentWitchServerRelease>["release"]
  >,
): string => {
  const migrationNote = release.deviceSupersessionMigrationApplied
    ? "Device supersession migration applied."
    : "Device supersession migration not applied yet — dispatch may misbehave until db:migrate runs.";

  const commitNote =
    release.commitSha !== null
      ? `Commit ${release.commitSha}.`
      : "No deploy commit SHA in this environment.";

  return `${release.label}. ${commitNote} ${migrationNote}`;
};

export default function AgentWitchServerReleaseBadge() {
  const { release, isLoading } = useAgentWitchServerRelease();

  if (isLoading || release === null) {
    return null;
  }

  const displayText =
    release.shortCommitSha !== null
      ? `${release.label} · ${release.shortCommitSha}`
      : release.label;

  return (
    <span
      className="hidden max-w-[11rem] truncate rounded-md border border-gray-200 bg-gray-50 px-2 py-1 text-[10px] font-medium uppercase tracking-wide text-gray-500 sm:inline dark:border-gray-700 dark:bg-gray-900 dark:text-gray-400"
      title={buildReleaseTitle(release)}
    >
      Live {displayText}
    </span>
  );
}
