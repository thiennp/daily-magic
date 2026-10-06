import type { ProjectHistoryOffPurgeOutcome } from "./reconcileProjectHistoryOffPurge";

/** True when the outcome came from a confirmed cloud OFF (skip mining and pull). */
export const isConfirmedProjectHistoryOffOutcome = (
  outcome: ProjectHistoryOffPurgeOutcome,
): boolean =>
  outcome === "purged" ||
  outcome === "nothing_to_purge" ||
  outcome === "purge_failed";
