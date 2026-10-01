export default interface ProjectFolderRefRecord {
  readonly id: string;
  readonly projectId: string;
  readonly machineOrDeviceRef: string;
  readonly folderPath: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}
