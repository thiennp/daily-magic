"use client";

import {
  ACCOUNT_FIELD_CLASS,
  ACCOUNT_H2_CLASS,
  ACCOUNT_HINT_CLASS,
  ACCOUNT_LABEL_CLASS,
} from "@/features/account/accountClasses.constant";
import { ACCOUNT_COPY } from "@/features/account/accountCopy.constant";

interface AccountQuietHoursFieldsProps {
  readonly offline: boolean;
  readonly quietFrom: string;
  readonly quietTo: string;
  readonly onFromChange: (value: string) => void;
  readonly onToChange: (value: string) => void;
}

export default function AccountQuietHoursFields({
  offline,
  quietFrom,
  quietTo,
  onFromChange,
  onToChange,
}: AccountQuietHoursFieldsProps) {
  const copy = ACCOUNT_COPY.notify;
  const tz =
    typeof Intl !== "undefined"
      ? Intl.DateTimeFormat().resolvedOptions().timeZone
      : "UTC";
  const quietActive = quietFrom.length > 0 && quietTo.length > 0;
  return (
    <section className="space-y-3">
      <h2 className={ACCOUNT_H2_CLASS}>{copy.quietH2}</h2>
      <p className={ACCOUNT_HINT_CLASS}>{copy.quietTip}</p>
      <div className="flex flex-wrap gap-4">
        <label className="space-y-1">
          <span className={ACCOUNT_LABEL_CLASS}>{copy.quietFrom}</span>
          <input
            type="time"
            className={ACCOUNT_FIELD_CLASS}
            value={quietFrom}
            disabled={offline}
            onChange={(e) => {
              onFromChange(e.target.value);
            }}
          />
        </label>
        <label className="space-y-1">
          <span className={ACCOUNT_LABEL_CLASS}>{copy.quietTo}</span>
          <input
            type="time"
            className={ACCOUNT_FIELD_CLASS}
            value={quietTo}
            disabled={offline}
            onChange={(e) => {
              onToChange(e.target.value);
            }}
          />
        </label>
      </div>
      <p className={ACCOUNT_HINT_CLASS}>
        {quietActive
          ? copy.quietOn
              .replace("{from}", quietFrom)
              .replace("{to}", quietTo)
              .replace("{tz}", tz)
          : copy.quietOff}
      </p>
    </section>
  );
}
