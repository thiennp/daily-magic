import type { AwcProjectAccessPending } from "@/features/projects/access/hooks/loadAwcProjectAccess";

/** The fields the pending join card reads. */
export type PendingRequest = Pick<
  AwcProjectAccessPending,
  | "id"
  | "requesterUserId"
  | "reason"
  | "requesterIsAgent"
  | "requesterLabel"
  | "wakeLinkSet"
> &
  Pick<
    AwcProjectAccessPending,
    "approvalCard" | "suggestedProjectDisplayName"
  > &
  Partial<Pick<AwcProjectAccessPending, "createdAt">>;
