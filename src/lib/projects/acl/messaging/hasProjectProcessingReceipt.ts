import { asRowArray, getSql } from "@/lib/db";
import { PROJECT_MESSAGE_KIND_TASK_PROCESSING } from "@/lib/projects/acl/messaging/projectMessage.constants";

type HasProjectProcessingReceiptInput = {
  readonly projectId: string;
  readonly peer: string;
  readonly summary: string;
} & (
  | {
      /** Membership id of the original bot sender. */
      readonly sender: string;
      readonly ownerUserId?: undefined;
    }
  | {
      /** Null when the original sender is the project Owner. */
      readonly sender: null;
      /** Required for Owner dedupe: project.ownerUserId. */
      readonly ownerUserId: string;
    }
);

/** True when this peer already stored the task.processing receipt to sender. */
export const hasProjectProcessingReceipt = async (
  input: HasProjectProcessingReceiptInput,
): Promise<boolean> => {
  if (input.sender === null) {
    const rows = asRowArray(
      await getSql()`
        SELECT 1 FROM project_messages
        WHERE project_id = ${input.projectId}
          AND kind = ${PROJECT_MESSAGE_KIND_TASK_PROCESSING}
          AND sender_membership_id = ${input.peer}
          AND to_membership_id IS NULL
          AND to_user_id = ${input.ownerUserId}
          AND summary = ${input.summary}
        LIMIT 1
      `,
    );
    return rows.length > 0;
  }
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
