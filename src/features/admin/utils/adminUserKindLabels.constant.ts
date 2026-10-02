import type AdminUserKind from "@/lib/auth/types/AdminUserKind.type";
import { ADMIN_USER_KINDS } from "@/lib/auth/types/AdminUserKind.type";

/** Clear labels for admin users Kind column + filter. */
export const ADMIN_USER_KIND_LABELS: Record<AdminUserKind, string> = {
  real: "Real",
  bot: "Bot",
  test: "Test",
};

export const ADMIN_USER_KIND_FILTER_ALL = "all" as const;

export type AdminUserKindFilter =
  | typeof ADMIN_USER_KIND_FILTER_ALL
  | AdminUserKind;

export const ADMIN_USER_KIND_FILTER_OPTIONS: readonly AdminUserKindFilter[] = [
  ADMIN_USER_KIND_FILTER_ALL,
  ...ADMIN_USER_KINDS,
];

export const adminUserKindFilterLabel = (
  filter: AdminUserKindFilter,
): string => {
  if (filter === ADMIN_USER_KIND_FILTER_ALL) {
    return "All kinds";
  }
  return ADMIN_USER_KIND_LABELS[filter];
};
