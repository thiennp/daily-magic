import type ProjectFolderRefRecord from "@/lib/projects/acl/types/ProjectFolderRefRecord.type";

export default function mapProjectFolderRefRow(
  row: Record<string, unknown>,
): ProjectFolderRefRecord {
  return {
    id: String(row.id),
    projectId: String(row.project_id),
    machineOrDeviceRef: String(row.machine_or_device_ref),
    folderPath: String(row.folder_path),
    shared: row.shared !== false,
    deviceOwnerUserId:
      row.device_owner_user_id == null
        ? null
        : String(row.device_owner_user_id),
    deviceName:
      row.device_name == null || String(row.device_name).trim() === ""
        ? null
        : String(row.device_name),
    createdAt: String(row.created_at),
    updatedAt: String(row.updated_at),
  };
}
