"use client";

import Link from "next/link";

import type { MyMacDevice } from "@/features/agent/hooks/useMyMacDevices";
import AwcProjectEditOnMacActions from "@/features/projects/AwcProjectEditOnMacActions";
import useAwcProjectDevicePresentation from "@/features/projects/hooks/useAwcProjectDevicePresentation";
import type UserProjectRecord from "@/lib/projects/types/UserProjectRecord.type";

interface AwcProjectListRowProps {
  readonly project: UserProjectRecord;
  readonly devices: readonly MyMacDevice[];
  readonly displayNameById: ReadonlyMap<string, string>;
  readonly localTokenHash: string | null;
}

export default function AwcProjectListRow({
  project,
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
    <article className="rounded-xl border border-gray-200 bg-white px-4 py-3 dark:border-gray-800 dark:bg-white/[0.02]">
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
          Composition counts sync in a later release — edit on your Mac to
          manage Harness, Workflows, and Agents.
        </p>
      </div>
      <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-end">
        <Link
          href={`/projects/${project.id}`}
          className="inline-flex items-center justify-center rounded-xl border border-gray-200 bg-white px-3 py-2 text-xs font-medium text-gray-700 transition hover:border-brand-200 hover:bg-brand-50/40 dark:border-gray-800 dark:bg-white/[0.02] dark:text-gray-200 dark:hover:border-brand-900/40"
        >
          View details
        </Link>
        <AwcProjectEditOnMacActions
          editCta={editCta}
          size="compact"
          layout="buttonOnly"
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
