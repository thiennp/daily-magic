"use client";

import { ACCOUNT_HINT_CLASS } from "@/features/account/accountClasses.constant";
import AccountSwitch from "@/features/account/AccountSwitch";
import { ACCOUNT_COPY } from "@/features/account/accountCopy.constant";
import {
  ACCOUNT_NOTIFY_ROWS,
  type NotifyKey,
} from "@/features/account/accountNotifyRows.constant";

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
    <div>
      <div
        aria-hidden="true"
        className="grid grid-cols-[minmax(0,1fr)_4.5rem_4.5rem] gap-3 border-b border-awc-border pb-2 text-sm font-medium text-awc-fg-muted"
      >
        <span>{copy.colEvent}</span>
        <span className="text-center">{copy.colEmail}</span>
        <span className="text-center">{copy.colInApp}</span>
      </div>
      <ul>
        {ACCOUNT_NOTIFY_ROWS.map((row) => (
          <li
            key={row.key}
            className="grid grid-cols-[minmax(0,1fr)_4.5rem_4.5rem] items-center gap-3 border-b border-awc-border/70 py-3"
          >
            <div>
              <p className="font-medium text-awc-fg">{row.label}</p>
              <p className={ACCOUNT_HINT_CLASS}>{row.hint}</p>
              {row.emailLocked ? (
                <p className={`${ACCOUNT_HINT_CLASS} mt-1`}>
                  {copy.billingLocked}
                </p>
              ) : null}
            </div>
            <div className="flex justify-center">
              <AccountSwitch
                label={`${row.label}, ${copy.colEmail.toLowerCase()}`}
                checked={emailOn[row.key]}
                disabled={offline || row.emailLocked}
                onToggle={() => {
                  onEmailChange(row.key, !emailOn[row.key]);
                }}
              />
            </div>
            <div className="flex justify-center">
              <AccountSwitch
                label={`${row.label}, in the app`}
                checked={appOn[row.key]}
                disabled={offline}
                onToggle={() => {
                  onAppChange(row.key, !appOn[row.key]);
                }}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
