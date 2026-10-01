import {
  isProjectActivityAllowlistedAction,
  type ProjectActivityAction,
} from "@/lib/projects/acl/projectActivityAllowlist.constant";
import type ProjectAccessAuditRecord from "@/lib/projects/acl/types/ProjectAccessAuditRecord.type";

const readString = (value: unknown): string | null =>
  typeof value === "string" && value.length > 0 ? value : null;

const readDetail = (value: unknown): Readonly<Record<string, unknown>> => {
  if (value === null || value === undefined) {
    return {};
  }
  if (typeof value === "string") {
    try {
      const parsed: unknown = JSON.parse(value);
      if (
        parsed !== null &&
        typeof parsed === "object" &&
        !Array.isArray(parsed)
      ) {
        return parsed as Readonly<Record<string, unknown>>;
      }
    } catch {
      return {};
    }
    return {};
  }
  if (typeof value === "object" && !Array.isArray(value)) {
    return value as Readonly<Record<string, unknown>>;
  }
  return {};
};

const readAt = (value: unknown): string => {
  if (typeof value === "string") {
    return value;
  }
  if (value instanceof Date) {
    return value.toISOString();
  }
  return new Date(0).toISOString();
};

export const mapProjectAccessAuditRow = (
  row: Record<string, unknown>,
): ProjectAccessAuditRecord | null => {
  const id = readString(row.id);
  const projectId = readString(row.project_id);
  const actorUserId = readString(row.actor_user_id);
  const actionRaw = readString(row.action);
  if (
    id === null ||
    projectId === null ||
    actorUserId === null ||
    actionRaw === null ||
    !isProjectActivityAllowlistedAction(actionRaw)
  ) {
    return null;
  }
  return {
    id,
    projectId,
    actorUserId,
    action: actionRaw as ProjectActivityAction,
    targetUserId: readString(row.target_user_id),
    at: readAt(row.at),
    detail: readDetail(row.detail),
  };
};

export default mapProjectAccessAuditRow;
