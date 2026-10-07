import {
  formatPendingApprovalWhoLine,
  pendingAssistantName,
} from "@/features/projects/access/approvalCard/formatPendingApprovalCard";
import type { OneWindowApprovalCardModel } from "@/features/projects/messenger/oneWindow/AwcOneWindowApprovalCard";
import type { AccessPendingView } from "@/features/projects/access/utils/projectAccessApi.types";

const formatTime = (iso: string): string => {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

const formatExpires = (iso: string | null | undefined): string | undefined => {
  if (typeof iso !== "string" || iso.trim().length === 0) return undefined;
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return undefined;
  return `Expires ${date.toLocaleDateString()}`;
};

/** Live Access pending join request → in-feed approval card model (OW-H3). */
export const mapAccessPendingToOneWindowCard = (
  req: AccessPendingView,
): OneWindowApprovalCardModel => {
  const assistantName = pendingAssistantName(req);
  const whoLabel =
    req.approvalCard !== null && req.approvalCard !== undefined
      ? formatPendingApprovalWhoLine({
          assistantName,
          card: req.approvalCard,
        })
      : assistantName;
  return {
    id: req.id,
    kind: "join",
    title: `${assistantName} asks to join`,
    whoLabel,
    action: req.reason?.trim() || "Join as a member. Can message assistants and see tasks.",
    email: undefined,
    status: "waiting",
    timeLabel: formatTime(req.createdAt),
    expiresLabel: formatExpires(req.expiresAt),
  };
};
