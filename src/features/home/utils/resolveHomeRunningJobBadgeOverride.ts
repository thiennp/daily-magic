import { AgentRunStatus } from "@/lib/dispatch/AgentRunStatus.constant";
import type AgentRunRecord from "@/lib/dispatch/types/AgentRunRecord.type";

export const resolveHomeRunningJobBadgeOverride = (input: {
  readonly run: AgentRunRecord;
  readonly approvalWaitingLabel: string | null;
}): string | null => {
  const approval = (input.approvalWaitingLabel ?? "").trim();
  if (approval.length > 0) {
    return approval;
  }
  if (input.run.status === AgentRunStatus.PENDING_APPROVAL) {
    return "Waiting on you";
  }
  return null;
};

export const resolveHomeRunningJobBadgeClassName = (input: {
  readonly run: AgentRunRecord;
  readonly approvalWaitingLabel: string | null;
}): string | null => {
  const override = resolveHomeRunningJobBadgeOverride(input);
  if (
    override === "Waiting on you" ||
    (input.approvalWaitingLabel ?? "").trim().length > 0
  ) {
    return "bg-brand-100 text-brand-800 dark:bg-brand-950/40 dark:text-brand-200";
  }
  return null;
};
