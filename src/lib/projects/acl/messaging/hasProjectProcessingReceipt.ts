import { asRowArray, getSql } from "@/lib/db";
import { PROJECT_MESSAGE_KIND_TASK_PROCESSING } from "@/lib/projects/acl/messaging/projectMessage.constants";

/** True when this peer already stored the task.processing receipt to sender. */
export const hasProjectProcessingReceipt = async (input: {
  readonly projectId: string;
  readonly peer: string;
  readonly sender: string;
  readonly summary: string;
}): Promise<boolean> => {
  const rows = asRowArray(
    await getSql()`
      SELECT 1 FROM project_messages
      WHERE project_id = ${input.projectId}
        AND kind = ${PROJECT_MESSAGE_KIND_TASK_PROCESSING}
        AND sender_membership_id = ${input.peer}
        AND to_membership_id = ${input.sender}
        AND summary = ${input.summary}
      LIMIT 1
    `,
  );
  return rows.length > 0;
};
