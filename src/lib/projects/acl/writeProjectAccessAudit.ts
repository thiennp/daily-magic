import type { ProjectAccessAuditAction } from "@/lib/projects/acl/types/ProjectAccessAuditRecord.type";

export type WriteProjectAccessAuditInput = {
  readonly projectId: string;
  readonly actorUserId: string;
  readonly action: ProjectAccessAuditAction;
  readonly targetUserId?: string | null;
  readonly detail?: Readonly<Record<string, unknown>>;
};

/**
 * No-op: project Activity history purged from Neon (Lead Option A).
 * Call sites kept so leave/approve/msg paths never fail on audit INSERT.
 */
export const writeProjectAccessAudit = async (
  input: WriteProjectAccessAuditInput,
): Promise<void> => {
  void input;
};
