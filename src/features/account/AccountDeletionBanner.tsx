"use client";

import Button from "@/components/ui/button/Button";
import { ACCOUNT_DANGER_BANNER_CLASS } from "@/features/account/accountClasses.constant";
import { ACCOUNT_COPY } from "@/features/account/accountCopy.constant";
import formatAccountDate from "@/features/account/utils/formatAccountDate";

interface AccountDeletionBannerProps {
  readonly deleteAt: Date | null;
  readonly offline: boolean;
  readonly onCancel: () => void;
}

export default function AccountDeletionBanner({
  deleteAt,
  offline,
  onCancel,
}: AccountDeletionBannerProps) {
  if (!deleteAt) {
    return null;
  }
  return (
    <div
      role="status"
      className={`${ACCOUNT_DANGER_BANNER_CLASS} flex flex-wrap items-center gap-3`}
    >
      <p className="min-w-0 flex-1">
        {ACCOUNT_COPY.privacy.deletionBanner.replace(
          "{date}",
          formatAccountDate(deleteAt),
        )}
      </p>
      <Button size="sm" disabled={offline} onClick={onCancel}>
        {ACCOUNT_COPY.privacy.cancelDeletion}
      </Button>
    </div>
  );
}
