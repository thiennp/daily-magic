export default interface UserProjectRecord {
  readonly id: string;
  readonly ownerUserId: string;
  readonly deviceId: string | null;
  readonly name: string;
  readonly folderPath: string;
  /** Optional git remotes (metadata only). */
  readonly repoUrls: readonly string[];
  /** Optional default branch hint for clone/pull. */
  readonly defaultBranch: string | null;
  readonly lastUsedAt: string | null;
  readonly createdAt: string;
  readonly updatedAt: string;
}
