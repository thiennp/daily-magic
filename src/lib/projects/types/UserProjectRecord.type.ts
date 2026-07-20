export default interface UserProjectRecord {
  readonly id: string;
  readonly ownerUserId: string;
  readonly deviceId: string | null;
  readonly name: string;
  readonly folderPath: string;
  readonly lastUsedAt: string | null;
  readonly createdAt: string;
  readonly updatedAt: string;
}
