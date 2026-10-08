import { ACCOUNT_COPY } from "@/features/account/accountCopy.constant";

export type NotifyKey = "task" | "approval" | "digest" | "invites" | "billing";

interface NotifyRow {
  readonly key: NotifyKey;
  readonly label: string;
  readonly hint: string;
  readonly emailLocked?: boolean;
}

export const ACCOUNT_NOTIFY_ROWS: readonly NotifyRow[] = [
  {
    key: "task",
    label: ACCOUNT_COPY.notify.rowTask,
    hint: ACCOUNT_COPY.notify.rowTaskHint,
  },
  {
    key: "approval",
    label: ACCOUNT_COPY.notify.rowApproval,
    hint: ACCOUNT_COPY.notify.rowApprovalHint,
  },
  {
    key: "digest",
    label: ACCOUNT_COPY.notify.rowDigest,
    hint: ACCOUNT_COPY.notify.rowDigestHint,
  },
  {
    key: "invites",
    label: ACCOUNT_COPY.notify.rowInvites,
    hint: ACCOUNT_COPY.notify.rowInvitesHint,
  },
  {
    key: "billing",
    label: ACCOUNT_COPY.notify.rowBilling,
    hint: ACCOUNT_COPY.notify.rowBillingHint,
    emailLocked: true,
  },
];
