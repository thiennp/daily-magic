"use client";

import Button from "@/components/ui/button/Button";
import AccountH2 from "@/features/account/AccountH2";
import {
  ACCOUNT_CHIP_CLASS,
  ACCOUNT_HINT_CLASS,
  ACCOUNT_ROW_CARD_CLASS,
} from "@/features/account/accountClasses.constant";
import { ACCOUNT_COPY } from "@/features/account/accountCopy.constant";
import { APP_SURFACE_CTA_SECONDARY_SM_CLASS } from "@/components/surfaces/appSurfaceStyles.constant";

interface AccountSessionsSectionProps {
  readonly offline: boolean;
  readonly onSignOutHere: () => void;
}

export default function AccountSessionsSection({
  offline,
  onSignOutHere,
}: AccountSessionsSectionProps) {
  const copy = ACCOUNT_COPY.security;
  return (
    <section className="space-y-3" aria-labelledby="account-sessions-h">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <AccountH2
          id="account-sessions-h"
          title={copy.h2Sessions}
          tip={copy.tipSessions}
          tipLabel="About sessions"
        />
        <Button size="sm" variant="outline" disabled>
          {copy.signOutElsewhere}
        </Button>
      </div>
      <ul className="space-y-2">
        <li
          className={`${ACCOUNT_ROW_CARD_CLASS} flex flex-wrap items-center justify-between gap-2`}
        >
          <span className="text-sm font-medium text-awc-fg">
            {copy.sessionChrome}{" "}
            <span className={ACCOUNT_CHIP_CLASS}>{copy.thisBrowser}</span>
          </span>
          <button
            type="button"
            className={APP_SURFACE_CTA_SECONDARY_SM_CLASS}
            disabled={offline}
            onClick={onSignOutHere}
          >
            {copy.signOut}
          </button>
        </li>
      </ul>
      <p className="text-sm font-medium text-awc-fg">{copy.emptyTitle}</p>
      <p className={ACCOUNT_HINT_CLASS}>{copy.emptyBody}</p>
    </section>
  );
}
