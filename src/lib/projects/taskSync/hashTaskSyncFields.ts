import { createHash } from "node:crypto";

import type { TaskSyncFields } from "@/lib/projects/taskSync/taskSync.types";

/** Hash of just the description (clipped-description baseline). */
export const hashDescription = (description: string | null): string =>
  createHash("sha256")
    .update(description ?? "")
    .digest("hex");

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
