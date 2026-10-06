import type { RunsWithoutApprovalToggleStep } from "@/features/projects/settings/runsWithoutApproval/runsWithoutApproval.type";

/**
 * Pure: turning ON asks first; turning OFF saves right away (no confirm).
 * Nothing happens while the row is loading or saving.
 */
export const resolveRunsWithoutApprovalToggle = (input: {
  readonly enabled: boolean;
  readonly busy: boolean;
}): RunsWithoutApprovalToggleStep => {
  if (input.busy) return { kind: "none" };
  if (input.enabled) return { kind: "save", value: false };
  return { kind: "confirm" };
};
