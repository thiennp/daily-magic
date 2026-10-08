"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { mutateProjectRepoUrls } from "@/features/projects/repoUrls/mutateProjectRepoUrls";
import { formatGitRemote } from "@/features/projects/settings/folder/formatGitRemote";
import type { ProjectFolderStatusResult } from "@/features/projects/settings/folder/projectFolderBridge";
import { AWC_TASKS_SECONDARY_BUTTON_CLASS } from "@/features/projects/tasks/awcProjectTasksChrome.constant";
import type UserProjectRecord from "@/lib/projects/types/UserProjectRecord.type";

/**
 * Owner one-click: the folder's `origin` becomes the project's repo URL when
 * none is saved yet. Saves through the same repo-URL API as the editor.
 */
export default function AwcProjectUseGitRemote({
  project,
  isOwner,
  status,
}: {
  readonly project: UserProjectRecord;
  readonly isOwner: boolean;
  readonly status: ProjectFolderStatusResult | "loading";
}) {
  const router = useRouter();
  const [state, setState] = useState<"idle" | "saving" | "error">("idle");
  const remote =
    status !== "loading" && status.kind === "ready"
      ? (status.status?.gitRemoteUrl ?? null)
      : null;
  if (!isOwner || remote === null || project.repoUrls.length > 0) return null;

  const save = async () => {
    setState("saving");
    const result = await mutateProjectRepoUrls({
      projectId: project.id,
      repoUrls: [remote],
      defaultBranch: project.defaultBranch,
    });
    if (result.ok) router.refresh();
    else setState("error");
  };

  return (
    <div className="flex flex-wrap items-center gap-2 text-[13px] text-awc-fg-muted">
      <button
        type="button"
        className={AWC_TASKS_SECONDARY_BUTTON_CLASS}
        disabled={state === "saving"}
        onClick={() => void save()}
      >
        Use this remote
      </button>
      <span>Save {formatGitRemote(remote)} as the project repository.</span>
      {state === "error" ? (
        <span role="alert">Could not save it. Try the form below.</span>
      ) : null}
    </div>
  );
}
