"use client";

import { useState } from "react";

import AccountH2 from "@/features/account/AccountH2";
import { ACCOUNT_COPY } from "@/features/account/accountCopy.constant";
import AccountNotifyPrefsTable from "@/features/account/AccountNotifyPrefsTable";
import AccountQuietHoursFields from "@/features/account/AccountQuietHoursFields";
import type { AccountPrefs } from "@/lib/account/accountPrefs";

interface AccountNotifyPanelProps {
  readonly offline: boolean;
  readonly prefs: AccountPrefs;
  readonly onPrefsChange: (next: AccountPrefs) => void;
}

export default function AccountNotifyPanel({
  offline,
  prefs,
  onPrefsChange,
}: AccountNotifyPanelProps) {
  const copy = ACCOUNT_COPY.notify;
  const [quietError, setQuietError] = useState("");
  const { quiet } = prefs;

  const changeHour = (kind: "from" | "to", value: string): void => {
    const other = kind === "from" ? quiet.to : quiet.from;
    if (value === other) {
      setQuietError(copy.quietSame);
      return;
    }
    setQuietError("");
    onPrefsChange({ ...prefs, quiet: { ...quiet, [kind]: value } });
  };

  return (
    <div className="space-y-6" data-testid="account-notify-panel">
      <section className="space-y-3" aria-labelledby="account-notify-h">
        <AccountH2
          id="account-notify-h"
          title={copy.h2}
          tip={copy.tip}
          tipLabel="About notifications"
        />
        <AccountNotifyPrefsTable
          offline={offline}
          emailOn={prefs.emailOn}
          appOn={prefs.appOn}
          onEmailChange={(key, value) => {
            onPrefsChange({
              ...prefs,
              emailOn: { ...prefs.emailOn, [key]: value },
            });
          }}
          onAppChange={(key, value) => {
            onPrefsChange({
              ...prefs,
              appOn: { ...prefs.appOn, [key]: value },
            });
          }}
        />
      </section>
      <AccountQuietHoursFields
        offline={offline}
        quietOn={quiet.on}
        quietFrom={quiet.from}
        quietTo={quiet.to}
        error={quietError}
        onOnChange={(on) => {
          onPrefsChange({ ...prefs, quiet: { ...quiet, on } });
        }}
        onFromChange={(value) => {
          changeHour("from", value);
        }}
        onToChange={(value) => {
          changeHour("to", value);
        }}
      />
    </div>
  );
}
