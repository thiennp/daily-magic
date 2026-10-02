import type UserProjectRecord from "@/lib/projects/types/UserProjectRecord.type";

const parseRepoUrls = (value: unknown): readonly string[] => {
  if (!Array.isArray(value)) {
    return [];
  }
  return value.filter((item): item is string => typeof item === "string");
};

export default function mapUserProjectRow(
  row: Record<string, unknown>,
): UserProjectRecord {
  return {
    id: String(row.id),
    ownerUserId: String(row.owner_user_id),
    deviceId: row.device_id ? String(row.device_id) : null,
    name: String(row.name),
    folderPath: String(row.folder_path ?? ""),
    repoUrls: parseRepoUrls(row.repo_urls),
    defaultBranch: row.default_branch ? String(row.default_branch) : null,
    lastUsedAt: row.last_used_at ? String(row.last_used_at) : null,
    createdAt: String(row.created_at),
    updatedAt: String(row.updated_at),
  };
}
