import { randomUUID } from "node:crypto";

import type { ProjectAccessAuditAction } from "@/lib/projects/acl/types/ProjectAccessAuditRecord.type";
import { ensureProjectAclSchema } from "@/lib/projects/acl/ensureProjectAclSchema";
import { getSql } from "@/lib/db";

export const writeProjectAccessAudit = async (input: {
  readonly projectId: string;
  readonly actorUserId: string;
  readonly action: ProjectAccessAuditAction;
  readonly targetUserId?: string | null;
  readonly detail?: Readonly<Record<string, unknown>>;
}): Promise<void> => {
  await ensureProjectAclSchema();
  const sql = getSql();
  const detailJson = JSON.stringify(input.detail ?? {});
  await sql`
    INSERT INTO project_access_audit (
      id, project_id, actor_user_id, action, target_user_id, detail
    )
    VALUES (
      ${randomUUID()},
      ${input.projectId},
      ${input.actorUserId},
      ${input.action},
      ${input.targetUserId ?? null},
      ${detailJson}::jsonb
    )
  `;
};
