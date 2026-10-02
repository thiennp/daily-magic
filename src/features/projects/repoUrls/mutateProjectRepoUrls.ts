import type { ProjectRepoMetadata } from "@/lib/projects/validateProjectRepoUrls";
import {
  validateDefaultBranch,
  validateProjectRepoUrls,
} from "@/lib/projects/validateProjectRepoUrls";

export type MutateProjectRepoUrlsResult =
  | { readonly ok: true; readonly metadata: ProjectRepoMetadata }
  | { readonly ok: false; readonly errorMessage: string };

/**
 * Owner PATCH for repoUrls + defaultBranch.
 * Provisional: eng API must accept these fields (feat/aw-project-repo-urls-api).
 * Empty list / null clears per locked contract.
 */
export const mutateProjectRepoUrls = async (input: {
  readonly projectId: string;
  readonly repoUrls: readonly string[];
  readonly defaultBranch: string | null;
}): Promise<MutateProjectRepoUrlsResult> => {
  const urlsCheck = validateProjectRepoUrls(input.repoUrls);
  if (!urlsCheck.ok) {
    return { ok: false, errorMessage: urlsCheck.error };
  }
  const branchCheck = validateDefaultBranch(input.defaultBranch);
  if (!branchCheck.ok) {
    return { ok: false, errorMessage: branchCheck.error };
  }

  try {
    const response = await fetch(
      `/api/projects/${encodeURIComponent(input.projectId)}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          repoUrls: urlsCheck.repoUrls,
          defaultBranch: branchCheck.defaultBranch,
        }),
      },
    );
    const body: unknown = await response.json().catch(() => null);
    const errorMessage =
      typeof body === "object" &&
      body !== null &&
      typeof (body as { errorMessage?: unknown }).errorMessage === "string"
        ? (body as { errorMessage: string }).errorMessage
        : "Could not save remotes.";

    if (!response.ok) {
      return { ok: false, errorMessage };
    }

    const project =
      typeof body === "object" &&
      body !== null &&
      typeof (body as { project?: unknown }).project === "object" &&
      (body as { project: unknown }).project !== null
        ? (body as { project: Record<string, unknown> }).project
        : null;

    const repoUrls = Array.isArray(project?.repoUrls)
      ? project.repoUrls.filter((item): item is string => typeof item === "string")
      : [...urlsCheck.repoUrls];
    const defaultBranch =
      project !== null && "defaultBranch" in project
        ? typeof project.defaultBranch === "string"
          ? project.defaultBranch
          : null
        : branchCheck.defaultBranch;

    return {
      ok: true,
      metadata: { repoUrls, defaultBranch },
    };
  } catch {
    return { ok: false, errorMessage: "Could not save remotes." };
  }
};
