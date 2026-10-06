import { RUNS_WITHOUT_APPROVAL_COPY as C } from "@/features/projects/settings/runsWithoutApproval/runsWithoutApprovalCopy.constant";
import type { RunsWithoutApprovalSwitchView } from "@/features/projects/settings/runsWithoutApproval/runsWithoutApproval.type";

/** Pure: the visible reason shown under the switch when it can't be used. */
export const resolveRunsWithoutApprovalDisabledReason = (
  view: RunsWithoutApprovalSwitchView,
): string | null => {
  if (view.loadState === "loading") return C.loading;
  if (view.loadState === "error") return C.loadError;
  if (view.saving) return C.saving;
  return null;
};
