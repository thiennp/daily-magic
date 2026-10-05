import {
  HUMAN_INVITE_DEFAULT_EXPIRES_DAYS,
  HUMAN_INVITE_HARD_MAX_EXPIRES_DAYS,
  HUMAN_INVITE_ROLES,
  type HumanInviteRole,
} from "@/lib/projects/acl/humanInvites/humanInvite.constants";

export const parseHumanInviteRole = (value: unknown): HumanInviteRole | null => {
  if (typeof value !== "string") return null;
  return (HUMAN_INVITE_ROLES as readonly string[]).includes(value)
    ? (value as HumanInviteRole)
    : null;
};

export const clampHumanInviteExpiresDays = (value: unknown): number => {
  const n = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(n) || n < 1) return HUMAN_INVITE_DEFAULT_EXPIRES_DAYS;
  return Math.min(Math.floor(n), HUMAN_INVITE_HARD_MAX_EXPIRES_DAYS);
};

export const parseHumanInviteEmail = (value: unknown): string | null => {
  if (typeof value !== "string" || value.trim().length === 0) return null;
  return value.trim().slice(0, 320).toLowerCase();
};

export const parseRequireEmailMatch = (value: unknown): boolean =>
  value === true || value === "true";
