export interface CrossAccountFolderClaim {
  readonly accountEmail: string;
  readonly projectId: string | null;
  readonly folderRealPath: string;
  readonly claimedAt: string;
  readonly lastUsedAt: string;
}

export interface CrossAccountFolderClaimsFile {
  readonly claims: readonly CrossAccountFolderClaim[];
}
