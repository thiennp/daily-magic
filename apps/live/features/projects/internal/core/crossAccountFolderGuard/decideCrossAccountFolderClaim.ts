import { isPathInsideFolder } from "../runFolderAllowlist/isPathInsideFolder";
import type { CrossAccountFolderClaim } from "./crossAccountFolderClaim.type";

export const decideCrossAccountFolderClaim = (input: {
  readonly claims: readonly CrossAccountFolderClaim[];
  readonly accountEmail: string;
  readonly projectId: string | null;
  readonly folderRealPath: string;
  readonly nowIso: string;
}):
  | {
      readonly ok: true;
      readonly nextClaims: readonly CrossAccountFolderClaim[];
    }
  | { readonly ok: false; readonly conflictingAccountEmail: string } => {
  const normEmail = input.accountEmail.trim().toLowerCase();
  const normProjectId = input.projectId?.trim() || null;

  for (const claim of input.claims) {
    const claimEmail = claim.accountEmail.trim().toLowerCase();
    if (claimEmail === normEmail) {
      continue;
    }

    const overlap =
      isPathInsideFolder(input.folderRealPath, claim.folderRealPath) ||
      isPathInsideFolder(claim.folderRealPath, input.folderRealPath);

    if (overlap) {
      if (
        claim.folderRealPath === input.folderRealPath &&
        normProjectId !== null &&
        claim.projectId === normProjectId
      ) {
        // Allowed
      } else {
        return { ok: false, conflictingAccountEmail: claim.accountEmail };
      }
    }
  }

  const existingClaim = input.claims.find(
    (c) =>
      c.accountEmail.trim().toLowerCase() === normEmail &&
      c.folderRealPath === input.folderRealPath,
  );

  const nextClaims = input.claims.filter(
    (c) =>
      !(
        c.accountEmail.trim().toLowerCase() === normEmail &&
        c.folderRealPath === input.folderRealPath
      ),
  );

  nextClaims.push({
    accountEmail: existingClaim ? existingClaim.accountEmail : normEmail,
    projectId: normProjectId,
    folderRealPath: input.folderRealPath,
    claimedAt: existingClaim ? existingClaim.claimedAt : input.nowIso,
    lastUsedAt: input.nowIso,
  });

  nextClaims.sort((a, b) => {
    if (a.folderRealPath < b.folderRealPath) return -1;
    if (a.folderRealPath > b.folderRealPath) return 1;
    if (a.accountEmail < b.accountEmail) return -1;
    if (a.accountEmail > b.accountEmail) return 1;
    return 0;
  });

  return { ok: true, nextClaims };
};
