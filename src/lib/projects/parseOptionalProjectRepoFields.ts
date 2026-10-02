import {
  validateDefaultBranch,
  validateProjectRepoUrls,
} from "@/lib/projects/validateProjectRepoUrls";

export type ParseOptionalProjectRepoFieldsResult =
  | {
      readonly ok: true;
      readonly repoUrls?: readonly string[];
      readonly defaultBranch?: string | null;
    }
  | { readonly ok: false; readonly error: string };

/**
 * Parse optional repo metadata from a request body record.
 * Omitted fields → undefined (leave unchanged on update / defaults on create).
 */
export const parseOptionalProjectRepoFields = (
  record: Record<string, unknown>,
): ParseOptionalProjectRepoFieldsResult => {
  const repoUrlsResult =
    record.repoUrls !== undefined
      ? validateProjectRepoUrls(record.repoUrls)
      : undefined;
  if (repoUrlsResult !== undefined && !repoUrlsResult.ok) {
    return repoUrlsResult;
  }

  const defaultBranchResult =
    record.defaultBranch !== undefined
      ? validateDefaultBranch(record.defaultBranch)
      : undefined;
  if (defaultBranchResult !== undefined && !defaultBranchResult.ok) {
    return defaultBranchResult;
  }

  return {
    ok: true,
    ...(repoUrlsResult !== undefined
      ? { repoUrls: repoUrlsResult.repoUrls }
      : {}),
    ...(defaultBranchResult !== undefined
      ? { defaultBranch: defaultBranchResult.defaultBranch }
      : {}),
  };
};
