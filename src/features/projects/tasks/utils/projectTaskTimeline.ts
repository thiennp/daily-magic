import type { ProjectTaskDisplayStatus } from "@/features/projects/tasks/projectTaskDisplayStatus";

export type ProjectTaskTimelineStepClass =
  "ok" | "cur" | "pend" | "end-failed" | "end-cancelled";

const TERMINAL: ReadonlySet<ProjectTaskDisplayStatus> = new Set([
  "done",
  "failed",
  "cancelled",
  "denied",
  "timed_out",
  "stopped",
  "stalled",
]);

/**
 * Design timeline: queued → running → terminal (done|failed|cancelled|stopped).
 * DF-027: denied / timed out never ran → queued → outcome; unknown → one step.
 */
export const buildProjectTaskTimelineSteps = (
  status: ProjectTaskDisplayStatus,
): readonly ProjectTaskDisplayStatus[] => {
  if (status === "unknown") return ["unknown"];
  if (status === "denied" || status === "timed_out") return ["queued", status];
  const end: ProjectTaskDisplayStatus =
    status === "done" ||
    status === "failed" ||
    status === "cancelled" ||
    status === "stopped" ||
    status === "stalled"
      ? status
      : "done";
  return ["queued", "running", end];
};

export const projectTaskTimelineStepClass = (
  step: ProjectTaskDisplayStatus,
  current: ProjectTaskDisplayStatus,
): ProjectTaskTimelineStepClass => {
  if (step === current) {
    if (step === "queued" || step === "running" || step === "unknown")
      return "cur";
    if (step === "failed" || step === "timed_out" || step === "stalled")
      return "end-failed";
    if (step === "cancelled" || step === "denied" || step === "stopped")
      return "end-cancelled";
  }
  if (TERMINAL.has(current)) {
    if (step === "queued" || step === "running") return "ok";
    if (step === current && step === "done") return "ok";
  }
  if (current === "running" && step === "queued") return "ok";
  return "pend";
};

/** Created / updated meta time; blank → "—", unparsable → raw string. */
export const formatProjectTaskMetaTime = (iso: string | null): string => {
  if (iso === null || iso.trim().length === 0) return "—";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};
