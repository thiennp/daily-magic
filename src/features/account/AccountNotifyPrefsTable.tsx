"use client";

import {
  ACCOUNT_HINT_CLASS,
} from "@/features/account/accountClasses.constant";
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

interface AccountNotifyPrefsTableProps {
  readonly offline: boolean;
  readonly emailOn: Record<NotifyKey, boolean>;
  readonly appOn: Record<NotifyKey, boolean>;
  readonly onEmailChange: (key: NotifyKey, value: boolean) => void;
  readonly onAppChange: (key: NotifyKey, value: boolean) => void;
}

export default function AccountNotifyPrefsTable({
  offline,
  emailOn,
  appOn,
  onEmailChange,
  onAppChange,
}: AccountNotifyPrefsTableProps) {
  const copy = ACCOUNT_COPY.notify;
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[28rem] text-left text-sm">
        <thead>
          <tr className="border-b border-awc-border text-awc-fg-muted dark:border-gray-700">
            <th className="py-2 pr-3 font-medium">{copy.colEvent}</th>
            <th className="py-2 pr-3 font-medium">{copy.colEmail}</th>
            <th className="py-2 font-medium">{copy.colInApp}</th>
          </tr>
        </thead>
        <tbody>
          {ACCOUNT_NOTIFY_ROWS.map((row) => (
            <tr
              key={row.key}
              className="border-b border-awc-border/70 dark:border-gray-800"
            >
              <td className="py-3 pr-3 align-top">
                <p className="font-medium text-awc-fg dark:text-gray-200">
                  {row.label}
                </p>
                <p className={ACCOUNT_HINT_CLASS}>{row.hint}</p>
                {row.emailLocked ? (
                  <p className={`${ACCOUNT_HINT_CLASS} mt-1`}>
                    {copy.billingLocked}
                  </p>
                ) : null}
              </td>
              <td className="py-3 pr-3 align-top">
                <input
                  type="checkbox"
                  aria-label={`${row.label} ${copy.colEmail}`}
                  checked={emailOn[row.key]}
                  disabled={offline || row.emailLocked}
                  onChange={(e) => {
                    onEmailChange(row.key, e.target.checked);
                  }}
                />
              </td>
              <td className="py-3 align-top">
                <input
                  type="checkbox"
                  aria-label={`${row.label} ${copy.colInApp}`}
                  checked={appOn[row.key]}
                  disabled={offline}
                  onChange={(e) => {
                    onAppChange(row.key, e.target.checked);
                  }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
