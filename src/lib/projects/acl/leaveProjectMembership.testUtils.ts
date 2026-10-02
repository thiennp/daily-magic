import {
  LEAVE_MEMBER_ROW,
  revokedLeaveMemberRow,
} from "@/lib/projects/acl/leaveProjectMembership.fixtures";

type LeaveSqlOptions = { status?: string; throwOnAudit?: boolean };

export const createLeaveSqlMockImplementation =
  (
    options: LeaveSqlOptions = {},
  ): ((strings: TemplateStringsArray) => Promise<unknown[]>) =>
  async (strings) => {
    const q = String(strings);
    if (q.includes("CREATE TABLE")) return [];
    if (q.includes("FROM project_memberships") && q.includes("SELECT")) {
      return [
        {
          ...LEAVE_MEMBER_ROW,
          ...(options.status ? { status: options.status } : {}),
        },
      ];
    }
    if (q.includes("UPDATE project_memberships"))
      return [revokedLeaveMemberRow()];
    if (
      q.includes("INSERT INTO project_access_audit") &&
      options.throwOnAudit
    ) {
      throw new Error("check constraint project_access_audit_action_check");
    }
    return [];
  };
