"use client";

import { useState } from "react";

import Button from "@/components/ui/button/Button";
import {
  ACCOUNT_CHIP_CLASS,
  ACCOUNT_H2_CLASS,
  ACCOUNT_HINT_CLASS,
  ACCOUNT_ROW_CARD_CLASS,
} from "@/features/account/accountClasses.constant";
import { ACCOUNT_COPY } from "@/features/account/accountCopy.constant";
import { APP_SURFACE_CTA_SECONDARY_SM_CLASS } from "@/components/surfaces/appSurfaceStyles.constant";

interface AccountSecurityPanelProps {
  readonly email: string;
  readonly offline: boolean;
}

export default function AccountSecurityPanel({
  email,
  offline,
}: AccountSecurityPanelProps) {
  const copy = ACCOUNT_COPY.security;
  const [googleLinked, setGoogleLinked] = useState(false);
  const [elsewhereNote, setElsewhereNote] = useState(false);

  return (
    <div className="space-y-6" data-testid="account-security-panel">
      <section className="space-y-3">
        <h2 className={ACCOUNT_H2_CLASS}>{copy.h2SignIn}</h2>
        <p className={ACCOUNT_HINT_CLASS}>{copy.tipSignIn}</p>
        <div className={`${ACCOUNT_ROW_CARD_CLASS} space-y-1`}>
          <p className="text-sm font-medium text-awc-fg dark:text-gray-200">
            {copy.emailCode.replace("{email}", email)}
          </p>
          <span className={ACCOUNT_CHIP_CLASS}>{copy.emailCodeAlways}</span>
        </div>
        <div className={`${ACCOUNT_ROW_CARD_CLASS} flex flex-wrap items-center justify-between gap-2`}>
          <p className="text-sm text-awc-fg dark:text-gray-200">
            {googleLinked
              ? copy.googleLinked.replace("{email}", email)
              : copy.googleNotLinked}
          </p>
          <button
            type="button"
            className={APP_SURFACE_CTA_SECONDARY_SM_CLASS}
            disabled={offline}
            onClick={() => {
              setGoogleLinked((v) => !v);
            }}
          >
            {googleLinked ? copy.unlinkGoogle : copy.linkGoogle}
          </button>
        </div>
      </section>
      <section className="space-y-3">
        <h2 className={ACCOUNT_H2_CLASS}>{copy.h2Sessions}</h2>
        <p className={ACCOUNT_HINT_CLASS}>{copy.tipSessions}</p>
        <ul className="space-y-2">
          <li className={`${ACCOUNT_ROW_CARD_CLASS} flex flex-wrap items-center justify-between gap-2`}>
            <span className="text-sm font-medium text-awc-fg dark:text-gray-200">
              {copy.sessionChrome}
            </span>
            <span className={ACCOUNT_CHIP_CLASS}>{copy.thisBrowser}</span>
          </li>
        </ul>
        <p className="text-sm font-medium text-awc-fg dark:text-gray-200">
          {copy.emptyTitle}
        </p>
        <p className={ACCOUNT_HINT_CLASS}>{copy.emptyBody}</p>
        <Button
          size="sm"
          variant="outline"
          disabled={offline}
          onClick={() => {
            setElsewhereNote(true);
          }}
        >
          {copy.signOutElsewhere}
        </Button>
        {elsewhereNote ? (
          <p className={ACCOUNT_HINT_CLASS}>{copy.mockOnlyNote}</p>
        ) : null}
      </section>
    </div>
  );
}
