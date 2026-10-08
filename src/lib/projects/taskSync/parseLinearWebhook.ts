import {
  LINEAR_BLOCKED_LABEL,
  priorityFromLinear,
  statusFromLinearState,
} from "@/lib/projects/taskSync/linearTaskMapping";
import type { ParsedTaskWebhook } from "@/lib/projects/taskSync/taskSync.types";
import { PROJECT_TASK_DESCRIPTION_MAX_CHARS } from "@/lib/projects/tasks/projectTaskTools.constant";

const asRecord = (v: unknown): Record<string, unknown> | null =>
  v !== null && typeof v === "object" ? (v as Record<string, unknown>) : null;

const text = (v: unknown): string => (typeof v === "string" ? v : "");

const labelNames = (labels: unknown): readonly string[] | null =>
  Array.isArray(labels)
    ? labels.map((l) => text(asRecord(l)?.name).toLowerCase())
    : null;

/** Linear webhook payload (already signature-checked) → neutral event. */
export const parseLinearWebhook = (payload: unknown): ParsedTaskWebhook => {
  const body = asRecord(payload);
  const data = asRecord(body?.data);
  if (body === null || data === null || body.type !== "Issue") {
    return { kind: "ignore" };
  }
  const externalId = text(data.id);
  if (externalId === "") return { kind: "ignore" };
  if (body.action === "remove" || text(data.archivedAt) !== "") {
    return { kind: "unlink", externalId };
  }
  const title = text(data.title).trim();
  const stateType = text(asRecord(data.state)?.type);
  if (title === "" || stateType === "") return { kind: "ignore" };
  const labels = labelNames(data.labels);
  const fullDescription = text(data.description).trim();
  const description = fullDescription.slice(
    0,
    PROJECT_TASK_DESCRIPTION_MAX_CHARS,
  );
  return {
    kind: "upsert",
    ref: {
      externalId,
      identifier: text(data.identifier),
      url: text(data.url) || text(body.url),
    },
    teamId: text(asRecord(data.team)?.id) || text(data.teamId) || null,
    labelsKnown: labels !== null,
    descriptionClipped:
      fullDescription.length > PROJECT_TASK_DESCRIPTION_MAX_CHARS,
    fields: {
      title,
      description: description === "" ? null : description,
      priority: priorityFromLinear(data.priority),
      status: statusFromLinearState(
        stateType,
        labels?.includes(LINEAR_BLOCKED_LABEL.toLowerCase()) ?? false,
      ),
    },
  };
};
