export default interface ProjectFolderRefRecord {
  readonly id: string;
  readonly projectId: string;
  readonly machineOrDeviceRef: string;
  readonly folderPath: string;
  /** Other project members can see this folder when true. */
  readonly shared: boolean;
  /** Registered owner of the computer, when the device row still exists. */
  readonly deviceOwnerUserId: string | null;
  readonly deviceName: string | null;
  readonly createdAt: string;
  readonly updatedAt: string;
}
