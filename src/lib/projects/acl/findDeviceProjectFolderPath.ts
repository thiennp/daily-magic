import { ensureProjectAclSchema } from "@/lib/projects/acl/ensureProjectAclSchema";
import { asRowArray, getSql } from "@/lib/db";
import { isValidProjectFolderPath } from "@/lib/projects/validateProjectFolderPath";

/** Folder this computer registered for the project (latest valid ref), or null. */
export const findDeviceProjectFolderPath = async (
  projectId: string,
  deviceId: string | null | undefined,
): Promise<string | null> => {
  const device = deviceId?.trim() ?? "";
  if (device.length === 0) return null;
  await ensureProjectAclSchema();
  const rows = asRowArray(
    await getSql()`
      SELECT folder_path
      FROM project_folder_refs
      WHERE project_id = ${projectId} AND machine_or_device_ref = ${device}
      ORDER BY updated_at DESC
    `,
  );
  const match = rows
    .map((row) => String(row.folder_path).trim())
    .find((path) => path.length > 0 && isValidProjectFolderPath(path));
  return match ?? null;
};
