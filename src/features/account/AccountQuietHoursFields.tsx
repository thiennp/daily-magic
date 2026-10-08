"use client";

import AccountH2 from "@/features/account/AccountH2";
import AccountSwitch from "@/features/account/AccountSwitch";
import {
  ACCOUNT_FIELD_CLASS,
  ACCOUNT_HINT_CLASS,
  ACCOUNT_LABEL_CLASS,
} from "@/features/account/accountClasses.constant";
import { ACCOUNT_COPY } from "@/features/account/accountCopy.constant";

const HOURS = Array.from(
  { length: 24 },
  (_, hour) => `${String(hour).padStart(2, "0")}:00`,
);

interface AccountQuietHoursFieldsProps {
  readonly offline: boolean;
  readonly quietOn: boolean;
  readonly quietFrom: string;
  readonly quietTo: string;
  readonly error: string;
  readonly onOnChange: (value: boolean) => void;
  readonly onFromChange: (value: string) => void;
  readonly onToChange: (value: string) => void;
}

export default function AccountQuietHoursFields({
  offline,
  quietOn,
  quietFrom,
  quietTo,
  error,
  onOnChange,
  onFromChange,
  onToChange,
}: AccountQuietHoursFieldsProps) {
  const copy = ACCOUNT_COPY.notify;
  const tz =
    typeof Intl !== "undefined"
      ? Intl.DateTimeFormat().resolvedOptions().timeZone
      : "UTC";
  const fieldsDisabled = offline || !quietOn;
  const select = (
    id: string,
    label: string,
    value: string,
    onChange: (next: string) => void,
  ) => (
    <div className="space-y-1">
      <label htmlFor={id} className={ACCOUNT_LABEL_CLASS}>
        {label}
      </label>
      <select
        id={id}
        className={ACCOUNT_FIELD_CLASS}
        value={value}
        disabled={fieldsDisabled}
        onChange={(e) => {
          onChange(e.target.value);
        }}
      >
        {HOURS.map((hour) => (
          <option key={hour}>{hour}</option>
        ))}
      </select>
    </div>
  );
  return (
    <section className="space-y-3" aria-labelledby="account-quiet-h">
      <div className="flex items-center justify-between gap-3">
        <AccountH2
          id="account-quiet-h"
          title={copy.quietH2}
          tip={copy.quietTip}
          tipLabel="About quiet hours"
        />
        <AccountSwitch
          label={copy.quietH2}
          checked={quietOn}
          disabled={offline}
          onToggle={() => {
            onOnChange(!quietOn);
          }}
        />
      </div>
      <div className="flex flex-wrap gap-4">
        {select("account-quiet-from", copy.quietFrom, quietFrom, onFromChange)}
        {select("account-quiet-to", copy.quietTo, quietTo, onToChange)}
      </div>
      {error ? (
        <p role="alert" className="text-sm text-awc-bad">
          {error}
        </p>
      ) : null}
      <p className={ACCOUNT_HINT_CLASS}>
        {quietOn
          ? copy.quietOn
              .replace("{from}", quietFrom)
              .replace("{to}", quietTo)
              .replace("{tz}", tz)
          : copy.quietOff}
      </p>
    </section>
  );
}
