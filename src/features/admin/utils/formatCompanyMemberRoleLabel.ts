import { COMPANIES_RULES_HUB_COPY as C } from "@/features/admin/companiesRulesHubCopy.constant";
import { GroupRole } from "@/lib/auth/roles";

export const formatCompanyMemberRoleLabel = (role: string): string => {
  if (role === GroupRole.GROUP_SUPER_ADMIN) {
    return C.roleOwner;
  }
  if (role === GroupRole.GROUP_ADMIN) {
    return C.roleAdmin;
  }
  if (role === GroupRole.USER) {
    return C.roleMember;
  }
  return role;
};
