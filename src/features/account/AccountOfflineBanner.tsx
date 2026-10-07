"use client";

import { ACCOUNT_BANNER_CLASS } from "@/features/account/accountClasses.constant";
import { ACCOUNT_COPY } from "@/features/account/accountCopy.constant";

interface AccountOfflineBannerProps {
  readonly offline: boolean;
}

export default function AccountOfflineBanner({
  offline,
}: AccountOfflineBannerProps) {
  if (!offline) {
    return null;
  }
  return (
    <p role="status" className={ACCOUNT_BANNER_CLASS}>
      {ACCOUNT_COPY.offline}
    </p>
  );
}
