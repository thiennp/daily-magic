import fs from "node:fs";
import path from "node:path";

import type {
  CrossAccountFolderClaim,
  CrossAccountFolderClaimsFile,
} from "./crossAccountFolderClaim.type";
import {
  AGENT_WITCH_PROFILES_DIR_NAME_FOR_CLAIMS,
  CROSS_ACCOUNT_FOLDER_CLAIMS_FILE_NAME,
} from "./crossAccountFolderGuard.constant";
import { decideCrossAccountFolderClaim } from "./decideCrossAccountFolderClaim";

export const readCrossAccountFolderClaims = (
  installDir: string,
): CrossAccountFolderClaim[] => {
  const filePath = path.join(installDir, CROSS_ACCOUNT_FOLDER_CLAIMS_FILE_NAME);
  try {
    const raw = fs.readFileSync(filePath, "utf-8");
    const parsed = JSON.parse(raw) as Partial<CrossAccountFolderClaimsFile>;
    if (!parsed || !Array.isArray(parsed.claims)) {
      return [];
    }
    return parsed.claims.filter(
      (c) =>
        c &&
        typeof c.accountEmail === "string" &&
        (typeof c.projectId === "string" || c.projectId === null) &&
        typeof c.folderRealPath === "string" &&
        typeof c.claimedAt === "string" &&
        typeof c.lastUsedAt === "string",
    );
  } catch {
    return [];
  }
};

export const claimCrossAccountFolder = (input: {
  readonly installDir: string;
  readonly accountEmail: string;
  readonly projectId?: string | null;
  readonly folderRealPath: string;
  readonly now?: Date;
}):
  | { readonly ok: true }
  | { readonly ok: false; readonly conflictingAccountEmail: string } => {
  const allClaims = readCrossAccountFolderClaims(input.installDir);
  const profilesDir = path.join(
    input.installDir,
    AGENT_WITCH_PROFILES_DIR_NAME_FOR_CLAIMS,
  );

  const activeClaims = allClaims.filter((claim) => {
    try {
      const profileDirName = claim.accountEmail.trim().toLowerCase();
      const stat = fs.statSync(path.join(profilesDir, profileDirName));
      return stat.isDirectory();
    } catch {
      return false;
    }
  });

  const nowIso = (input.now || new Date()).toISOString();
  const decision = decideCrossAccountFolderClaim({
    claims: activeClaims,
    accountEmail: input.accountEmail,
    projectId: input.projectId ?? null,
    folderRealPath: input.folderRealPath,
    nowIso,
  });

  if (!decision.ok) {
    return {
      ok: false,
      conflictingAccountEmail: decision.conflictingAccountEmail,
    };
  }

  const filePath = path.join(
    input.installDir,
    CROSS_ACCOUNT_FOLDER_CLAIMS_FILE_NAME,
  );
  const tmpPath = `${filePath}.${process.pid}.${Date.now()}.tmp`;
  const fileContent: CrossAccountFolderClaimsFile = {
    claims: decision.nextClaims,
  };
  const jsonString = JSON.stringify(fileContent, null, 2) + "\n";

  fs.mkdirSync(input.installDir, { recursive: true });
  fs.writeFileSync(tmpPath, jsonString, "utf-8");
  fs.renameSync(tmpPath, filePath);

  return { ok: true };
};
