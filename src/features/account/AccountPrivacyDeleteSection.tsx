"use client";

import Link from "next/link";
import { useState } from "react";

import Button from "@/components/ui/button/Button";
import AccountH2 from "@/features/account/AccountH2";
import { ACCOUNT_ROW_CARD_CLASS } from "@/features/account/accountClasses.constant";
import { ACCOUNT_COPY } from "@/features/account/accountCopy.constant";
import ConfirmDestructiveModal from "@/features/shell/ConfirmDestructiveModal";
import formatAccountDate from "@/features/account/utils/formatAccountDate";

interface AccountPrivacyDeleteSectionProps {
  readonly email: string;
  readonly offline: boolean;
  readonly hasActivePlan: boolean;
  readonly planLabel: string;
  readonly deletionScheduled: boolean;
  readonly onConfirmDelete: () => void;
}

export default function AccountPrivacyDeleteSection({
  email,
  offline,
  hasActivePlan,
  planLabel,
  deletionScheduled,
  onConfirmDelete,
}: AccountPrivacyDeleteSectionProps) {
  const copy = ACCOUNT_COPY.privacy;
  const [removalDate, setRemovalDate] = useState<number | null>(null);
  const confirmOpen = removalDate !== null;
  const blocked = hasActivePlan || deletionScheduled;
  const why = deletionScheduled ? copy.deleteAlreadyScheduled : "";
  return (
    <section
      className={`${ACCOUNT_ROW_CARD_CLASS} space-y-3 border-awc-bad-dot/40`}
      aria-labelledby="account-delete-h"
    >
      <AccountH2
        id="account-delete-h"
        title={copy.deleteH2}
        tip={copy.deleteTip}
        tipLabel="About deleting your account"
      />
      <p className="text-sm text-awc-fg">{copy.beforeDelete}</p>
      <ul className="space-y-1 text-sm">
        <li className={hasActivePlan ? "text-awc-bad" : "text-awc-ok"}>
          {hasActivePlan
            ? copy.blockerPlanActive.replace("{plan}", planLabel)
            : copy.planClear}
          {hasActivePlan ? (
            <Link href="/pricing" className="ml-2 font-medium underline">
              {copy.openBilling}
            </Link>
          ) : null}
        </li>
      </ul>
      <Button
        size="sm"
        variant="outline"
        disabled={offline || blocked}
        className="border-awc-bad-dot/40 text-awc-bad"
        onClick={() => {
          setRemovalDate(Date.now() + 7 * 864e5);
        }}
      >
        {copy.deleteCta}
      </Button>
      {why ? <p className="text-sm text-awc-fg-muted">{why}</p> : null}
      <ConfirmDestructiveModal
        isOpen={confirmOpen}
        title={copy.confirmTitle}
        description={copy.confirmBody.replace(
          "{date}",
          formatAccountDate(removalDate ?? 0),
        )}
        confirmLabel={copy.confirmDelete}
        cancelLabel={copy.keepAccount}
        typedConfirmText={email}
        typedConfirmLabel={copy.typeEmail}
        onClose={() => {
          setRemovalDate(null);
        }}
        onConfirm={() => {
          setRemovalDate(null);
          onConfirmDelete();
        }}
      />
    </section>
  );
}
