import { mapAccessAuditActionToActivityEvent } from "@/lib/projects/acl/activity/mapAccessAuditActionToActivityEvent";
import { writeProjectActivityEvent } from "@/lib/projects/acl/activity/writeProjectActivityEvent";
import type { ProjectAccessAuditAction } from "@/lib/projects/acl/types/ProjectAccessAuditRecord.type";

export type WriteProjectAccessAuditInput = {
  readonly projectId: string;
  readonly actorUserId: string;
  readonly action: ProjectAccessAuditAction;
  readonly targetUserId?: string | null;
  /** Optional display-name snapshot for the target (never an email). */
  readonly targetLabel?: string | null;
  readonly detail?: Readonly<Record<string, unknown>>;
};

/**
 * Legacy entry point kept so call sites need no change. Allowed actions map
 * onto the owner-only Access log (writeProjectActivityEvent); the rest
 * (msg.*, key.*, webhook.*, claim/check, ...) are ignored. Never throws.
 */
export const writeProjectAccessAudit = async (
  input: WriteProjectAccessAuditInput,
): Promise<void> => {
  const mapped = mapAccessAuditActionToActivityEvent(input);
  if (mapped === null) {
    return;
  }
  await writeProjectActivityEvent(mapped);
};
