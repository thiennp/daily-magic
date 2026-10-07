"use client";

import Button from "@/components/ui/button/Button";
import {
  ACCOUNT_DANGER_BANNER_CLASS,
  ACCOUNT_H2_CLASS,
  ACCOUNT_HINT_CLASS,
  ACCOUNT_ROW_CARD_CLASS,
} from "@/features/account/accountClasses.constant";
import { ACCOUNT_COPY } from "@/features/account/accountCopy.constant";
import { APP_SURFACE_CTA_SECONDARY_SM_CLASS } from "@/components/surfaces/appSurfaceStyles.constant";

interface AccountPrivacyDeleteSectionProps {
  readonly offline: boolean;
  readonly confirmOpen: boolean;
  readonly deletionScheduled: boolean;
  readonly onOpenConfirm: () => void;
  readonly onKeep: () => void;
  readonly onConfirmDelete: () => void;
  readonly onCancelDeletion: () => void;
}

export default function AccountPrivacyDeleteSection({
  offline,
  confirmOpen,
  deletionScheduled,
  onOpenConfirm,
  onKeep,
  onConfirmDelete,
  onCancelDeletion,
}: AccountPrivacyDeleteSectionProps) {
  const copy = ACCOUNT_COPY.privacy;
  return (
    <section className={`${ACCOUNT_ROW_CARD_CLASS} space-y-3`}>
      <h2 className={ACCOUNT_H2_CLASS}>{copy.deleteH2}</h2>
      <p className={ACCOUNT_HINT_CLASS}>{copy.deleteTip}</p>
      <ul className={`${ACCOUNT_HINT_CLASS} list-disc space-y-1 pl-5`}>
        <li>{copy.blockerPlan}</li>
        <li>{copy.blockerOwner}</li>
        <li>{copy.blockerManaged}</li>
      </ul>
      {deletionScheduled ? (
        <div className={ACCOUNT_DANGER_BANNER_CLASS}>
          <p>{copy.deletionScheduled}</p>
          <button
            type="button"
            className={`${APP_SURFACE_CTA_SECONDARY_SM_CLASS} mt-2`}
            disabled={offline}
            onClick={onCancelDeletion}
          >
            {copy.cancelDeletion}
          </button>
        </div>
      ) : null}
      {!deletionScheduled && !confirmOpen ? (
        <Button size="sm" variant="outline" disabled={offline} onClick={onOpenConfirm}>
          {copy.deleteCta}
        </Button>
      ) : null}
      {confirmOpen && !deletionScheduled ? (
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            className={APP_SURFACE_CTA_SECONDARY_SM_CLASS}
            onClick={onKeep}
          >
            {copy.keepAccount}
          </button>
          <Button size="sm" disabled={offline} onClick={onConfirmDelete}>
            {copy.confirmDelete}
          </Button>
        </div>
      ) : null}
    </section>
  );
}
