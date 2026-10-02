import {
  PROJECT_INVITE_DEFAULT_EXPIRES_DAYS,
  PROJECT_INVITE_DEFAULT_MAX_USES,
  PROJECT_INVITE_HARD_MAX_EXPIRES_DAYS,
  PROJECT_INVITE_HARD_MAX_USES,
} from "@/lib/projects/acl/invites/projectInvite.constants";
import {
  isProjectAclScope,
  PROJECT_ACL_DEFAULT_MEMBER_SCOPES,
  type ProjectAclScope,
} from "@/lib/projects/acl/projectAclScopes.constant";

export const clampInviteMaxUses = (raw: unknown): number => {
  if (typeof raw !== "number" || !Number.isFinite(raw)) {
    return PROJECT_INVITE_DEFAULT_MAX_USES;
  }
  const n = Math.floor(raw);
  if (n < 1) return PROJECT_INVITE_DEFAULT_MAX_USES;
  return Math.min(n, PROJECT_INVITE_HARD_MAX_USES);
};

export const clampInviteExpiresDays = (raw: unknown): number => {
  if (typeof raw !== "number" || !Number.isFinite(raw)) {
    return PROJECT_INVITE_DEFAULT_EXPIRES_DAYS;
  }
  const n = Math.floor(raw);
  if (n < 1) return PROJECT_INVITE_DEFAULT_EXPIRES_DAYS;
  return Math.min(n, PROJECT_INVITE_HARD_MAX_EXPIRES_DAYS);
};

export const parseInviteScopes = (raw: unknown): readonly ProjectAclScope[] => {
  if (!Array.isArray(raw)) {
    return PROJECT_ACL_DEFAULT_MEMBER_SCOPES;
  }
  const filtered = raw.filter(
    (item): item is ProjectAclScope =>
      typeof item === "string" && isProjectAclScope(item),
  );
  return filtered.length > 0 ? filtered : PROJECT_ACL_DEFAULT_MEMBER_SCOPES;
};
