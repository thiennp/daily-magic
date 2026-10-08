"use client";

import { useState } from "react";

import Button from "@/components/ui/button/Button";
import AccountH2 from "@/features/account/AccountH2";
import {
  ACCOUNT_CHIP_CLASS,
  ACCOUNT_HINT_CLASS,
} from "@/features/account/accountClasses.constant";
import { ACCOUNT_COPY } from "@/features/account/accountCopy.constant";
import AccountNotifyPrefsTable from "@/features/account/AccountNotifyPrefsTable";
import { type NotifyKey } from "@/features/account/accountNotifyRows.constant";
import AccountQuietHoursFields from "@/features/account/AccountQuietHoursFields";

interface AccountNotifyPanelProps {
  readonly offline: boolean;
}

const ALL_ON: Record<NotifyKey, boolean> = {
  task: true,
  approval: true,
  digest: true,
  invites: true,
  billing: true,
};

export default function AccountNotifyPanel({
  offline,
}: AccountNotifyPanelProps) {
  const copy = ACCOUNT_COPY.notify;
  const [emailOn, setEmailOn] = useState(ALL_ON);
  const [appOn, setAppOn] = useState({ ...ALL_ON, digest: false });
  const [testSent, setTestSent] = useState(false);
  const [quietOn, setQuietOn] = useState(false);
  const [quietFrom, setQuietFrom] = useState("22:00");
  const [quietTo, setQuietTo] = useState("07:00");
  const [quietError, setQuietError] = useState("");

  const changeHour = (kind: "from" | "to", value: string): void => {
    const other = kind === "from" ? quietTo : quietFrom;
    if (value === other) {
      setQuietError(copy.quietSame);
      return;
    }
    setQuietError("");
    (kind === "from" ? setQuietFrom : setQuietTo)(value);
  };

  return (
    <div className="space-y-6" data-testid="account-notify-panel">
      <section className="space-y-3" aria-labelledby="account-notify-h">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <AccountH2
            id="account-notify-h"
            title={copy.h2}
            tip={copy.tip}
            tipLabel="About notifications"
          />
          <div className="flex items-center gap-2">
            {testSent ? (
              <span role="status" className={ACCOUNT_CHIP_CLASS}>
                {copy.testSent}
              </span>
            ) : null}
            <Button
              size="sm"
              variant="outline"
              disabled={offline || testSent}
              onClick={() => {
                setTestSent(true);
              }}
            >
              {copy.sendTest}
            </Button>
          </div>
        </div>
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
      </section>
      <AccountQuietHoursFields
        offline={offline}
        quietOn={quietOn}
        quietFrom={quietFrom}
        quietTo={quietTo}
        error={quietError}
        onOnChange={setQuietOn}
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
