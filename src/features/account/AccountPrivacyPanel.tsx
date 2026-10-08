"use client";

import { useState } from "react";

import Button from "@/components/ui/button/Button";
import AccountH2 from "@/features/account/AccountH2";
import {
  ACCOUNT_CHIP_CLASS,
  ACCOUNT_HINT_CLASS,
  ACCOUNT_ROW_CARD_CLASS,
} from "@/features/account/accountClasses.constant";
import { ACCOUNT_COPY } from "@/features/account/accountCopy.constant";
import AccountPrivacyDeleteSection from "@/features/account/AccountPrivacyDeleteSection";
import useBillingPlan from "@/features/billing/hooks/useBillingPlan";

interface AccountPrivacyPanelProps {
  readonly email: string;
  readonly offline: boolean;
  readonly deletionScheduled: boolean;
  readonly onConfirmDelete: () => void;
}

export default function AccountPrivacyPanel({
  email,
  offline,
  deletionScheduled,
  onConfirmDelete,
}: AccountPrivacyPanelProps) {
  const copy = ACCOUNT_COPY.privacy;
  const { plan } = useBillingPlan();
  const [exportAt, setExportAt] = useState<Date | null>(null);
  const planId = plan?.plan ?? null;
  const hasActivePlan = planId === "pro" || planId === "team";

  return (
    <div className="space-y-6" data-testid="account-privacy-panel">
      <section className="space-y-2" aria-labelledby="account-history-h">
        <AccountH2
          id="account-history-h"
          title={copy.historyH2}
          tip={copy.historyTip}
          tipLabel="About history"
        />
        <p className="text-sm text-awc-fg">{copy.historyBody}</p>
      </section>
      <section
        className={`${ACCOUNT_ROW_CARD_CLASS} space-y-3`}
        aria-labelledby="account-export-h"
      >
        <div className="flex flex-wrap items-center justify-between gap-3">
          <AccountH2 id="account-export-h" title={copy.exportH2} />
          <Button
            size="sm"
            variant="outline"
            disabled={offline || exportAt !== null}
            onClick={() => {
              setExportAt(new Date());
            }}
          >
            {exportAt ? copy.exportRequested : copy.requestExport}
          </Button>
        </div>
        <p className="text-sm text-awc-fg">
          {copy.exportBody.replace("{email}", email)}
        </p>
        {exportAt ? (
          <span role="status" className={ACCOUNT_CHIP_CLASS}>
            {copy.requestedAt}{" "}
            {exportAt.toLocaleTimeString("en-GB", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        ) : null}
        <p className={ACCOUNT_HINT_CLASS}>{copy.exportLocalNote}</p>
      </section>
      <AccountPrivacyDeleteSection
        email={email}
        offline={offline}
        hasActivePlan={hasActivePlan}
        planLabel={planId === "team" ? "Team" : "Pro"}
        deletionScheduled={deletionScheduled}
        onConfirmDelete={onConfirmDelete}
      />
    </div>
  );
}
