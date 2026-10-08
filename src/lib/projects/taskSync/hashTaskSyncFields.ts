import { createHash } from "node:crypto";

import type { TaskSyncFields } from "@/lib/projects/taskSync/taskSync.types";

/** Stable hash of the synced fields — the loop guard compares these. */
export const hashTaskSyncFields = (fields: TaskSyncFields): string =>
  createHash("sha256")
    .update(
      JSON.stringify([
        fields.title,
        fields.status,
        fields.priority,
        fields.description ?? "",
      ]),
    )
    .digest("hex");
