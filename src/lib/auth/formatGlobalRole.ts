import { GlobalRole, type GlobalRoleValue } from "@/lib/auth/roles";

const GLOBAL_ROLE_LABELS: Record<GlobalRoleValue, string> = {
  [GlobalRole.SUPER_ADMIN]: "Super admin",
  [GlobalRole.ADMIN]: "Admin",
  [GlobalRole.USER]: "User",
};

export default function formatGlobalRole(role: GlobalRoleValue): string {
  return GLOBAL_ROLE_LABELS[role];
}
