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
import AccountPrivacyDeleteSection from "@/features/account/AccountPrivacyDeleteSection";

interface AccountPrivacyPanelProps {
  readonly email: string;
  readonly offline: boolean;
}

export default function AccountPrivacyPanel({
  email,
  offline,
}: AccountPrivacyPanelProps) {
  const copy = ACCOUNT_COPY.privacy;
  const [exportRequested, setExportRequested] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deletionScheduled, setDeletionScheduled] = useState(false);

  return (
    <div className="space-y-6" data-testid="account-privacy-panel">
      <section className="space-y-2">
        <h2 className={ACCOUNT_H2_CLASS}>{copy.historyH2}</h2>
        <p className={ACCOUNT_HINT_CLASS}>{copy.historyTip}</p>
        <p className="text-sm text-awc-fg dark:text-gray-200">{copy.historyBody}</p>
      </section>
      <section className={`${ACCOUNT_ROW_CARD_CLASS} space-y-3`}>
        <h2 className={ACCOUNT_H2_CLASS}>{copy.exportH2}</h2>
        <p className="text-sm text-awc-fg dark:text-gray-200">
          {copy.exportBody.replace("{email}", email)}
        </p>
        <div className="flex flex-wrap items-center gap-2">
          <Button
            size="sm"
            disabled={offline || exportRequested}
            onClick={() => {
              setExportRequested(true);
            }}
          >
            {copy.requestExport}
          </Button>
          {exportRequested ? (
            <span className={ACCOUNT_CHIP_CLASS}>{copy.exportRequested}</span>
          ) : null}
        </div>
        <p className={ACCOUNT_HINT_CLASS}>{copy.exportLocalNote}</p>
      </section>
      <AccountPrivacyDeleteSection
        offline={offline}
        confirmOpen={confirmOpen}
        deletionScheduled={deletionScheduled}
        onOpenConfirm={() => {
          setConfirmOpen(true);
        }}
        onKeep={() => {
          setConfirmOpen(false);
        }}
        onConfirmDelete={() => {
          setDeletionScheduled(true);
          setConfirmOpen(false);
        }}
        onCancelDeletion={() => {
          setDeletionScheduled(false);
          setConfirmOpen(false);
        }}
      />
    </div>
  );
}
