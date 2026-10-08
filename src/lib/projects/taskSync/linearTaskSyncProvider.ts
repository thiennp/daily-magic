import { pushLinearIssue } from "@/lib/projects/taskSync/linearIssueOperations";
import { parseLinearWebhook } from "@/lib/projects/taskSync/parseLinearWebhook";
import type { TaskSyncProvider } from "@/lib/projects/taskSync/taskSync.types";
import { withLinearAccessToken } from "@/lib/projects/taskSync/withLinearAccessToken";

export const linearTaskSyncProvider: TaskSyncProvider = {
  id: "linear",
  parseWebhook: parseLinearWebhook,
  pushTask: async (input) => {
    const ref = await withLinearAccessToken(input.projectId, (token) =>
      pushLinearIssue({ token, ...input }),
    );
    if (ref === null) throw new Error("linear_not_connected");
    return ref;
  },
};
