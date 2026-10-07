"use client";

import { useState } from "react";

import Button from "@/components/ui/button/Button";
import {
  ACCOUNT_CHIP_CLASS,
  ACCOUNT_H2_CLASS,
  ACCOUNT_HINT_CLASS,
} from "@/features/account/accountClasses.constant";
import { ACCOUNT_COPY } from "@/features/account/accountCopy.constant";
import AccountNotifyPrefsTable, {
  type NotifyKey,
} from "@/features/account/AccountNotifyPrefsTable";
import AccountQuietHoursFields from "@/features/account/AccountQuietHoursFields";

interface AccountNotifyPanelProps {
  readonly offline: boolean;
}

export default function AccountNotifyPanel({
  offline,
}: AccountNotifyPanelProps) {
  const copy = ACCOUNT_COPY.notify;
  const [emailOn, setEmailOn] = useState<Record<NotifyKey, boolean>>({
    task: true,
    approval: true,
    digest: true,
    invites: true,
    billing: true,
  });
  const [appOn, setAppOn] = useState<Record<NotifyKey, boolean>>({
    task: true,
    approval: true,
    digest: false,
    invites: true,
    billing: true,
  });
  const [testSent, setTestSent] = useState(false);
  const [quietFrom, setQuietFrom] = useState("");
  const [quietTo, setQuietTo] = useState("");

  return (
    <div className="space-y-6" data-testid="account-notify-panel">
      <section className="space-y-3">
        <h2 className={ACCOUNT_H2_CLASS}>{copy.h2}</h2>
        <p className={ACCOUNT_HINT_CLASS}>{copy.tip}</p>
        <p className={ACCOUNT_HINT_CLASS}>{copy.prefsLocalNote}</p>
        <AccountNotifyPrefsTable
          offline={offline}
          emailOn={emailOn}
          appOn={appOn}
          onEmailChange={(key, value) => {
            setEmailOn((prev) => ({ ...prev, [key]: value }));
          }}
          onAppChange={(key, value) => {
            setAppOn((prev) => ({ ...prev, [key]: value }));
          }}
        />
        <div className="flex flex-wrap items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            disabled={offline}
            onClick={() => {
              setTestSent(true);
            }}
          >
            {copy.sendTest}
          </Button>
          {testSent ? (
            <span className={ACCOUNT_CHIP_CLASS}>{copy.testSent}</span>
          ) : null}
        </div>
      </section>
      <AccountQuietHoursFields
        offline={offline}
        quietFrom={quietFrom}
        quietTo={quietTo}
        onFromChange={setQuietFrom}
        onToChange={setQuietTo}
      />
    </div>
  );
}
