import type { ProjectAccessAuditAction } from "@/lib/projects/acl/types/ProjectAccessAuditRecord.type";
import { writeProjectAccessAudit } from "@/lib/projects/acl/writeProjectAccessAudit";
import { getUserProjectById } from "@/lib/projects/userProjectQueries";

export const auditProjectAclActivityEvent = async (input: {
  readonly projectId: string;
  readonly actorUserId: string;
  readonly action: ProjectAccessAuditAction;
  readonly targetUserId?: string | null;
  readonly detail?: Readonly<Record<string, unknown>>;
}): Promise<void> => {
  const project = await getUserProjectById(input.projectId);
  if (project === null) {
    return;
  }
  await writeProjectAccessAudit(input);
};
