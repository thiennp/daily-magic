import type { OneWindowApprovalCardModel } from "@/features/projects/messenger/oneWindow/AwcOneWindowApprovalCard";

/** Pending computer-run approval as the run-approvals route lists it. */
export type OneWindowRunApproval = {
  readonly runId: string;
  readonly requesterLabel: string | null;
  readonly prompt: string;
  readonly tool: string;
  readonly computerName: string;
  readonly projectFolder: string;
  readonly approvalExpiresAt: string | null;
};

const MINUTE_MS = 60_000;

const formatTime = (iso: string | null, fallback: string): string => {
  const date = iso === null ? null : new Date(iso);
  return date === null || Number.isNaN(date.getTime())
    ? fallback
    : date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

/** Run approval → in-feed card: waiting while the window is open, timed out after. */
export const mapRunApprovalToOneWindowCard = (
  approval: OneWindowRunApproval,
  nowMs: number = Date.now(),
): OneWindowApprovalCardModel => {
  const who = approval.requesterLabel?.trim() || "An assistant";
  const expiresMs =
    approval.approvalExpiresAt === null
      ? null
      : Date.parse(approval.approvalExpiresAt);
  const timedOut = expiresMs !== null && expiresMs <= nowMs;
  const minsLeft =
    expiresMs === null || timedOut
      ? null
      : Math.max(1, Math.ceil((expiresMs - nowMs) / MINUTE_MS));
  return {
    id: approval.runId,
    kind: "run",
    whoName: who,
    title: `${who} wants ${approval.tool} to run a task`,
    whoLabel: `${who} · ${approval.tool}`,
    action: approval.prompt.split("\n", 1)[0]?.slice(0, 200) ?? "",
    folder: approval.projectFolder,
    computerLabel: approval.computerName,
    status: timedOut ? "timedout" : "waiting",
    timeLabel: formatTime(approval.approvalExpiresAt, "now"),
    ...(minsLeft !== null
      ? { expiresLabel: `Expires in ${minsLeft} min` }
      : {}),
  };
};
