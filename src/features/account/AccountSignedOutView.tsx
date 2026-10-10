"use client";

import Link from "next/link";

import AccountHeader from "@/features/account/AccountHeader";
import { ACCOUNT_COPY } from "@/features/account/accountCopy.constant";
import { APP_SURFACE_CTA_PRIMARY_CLASS } from "@/components/surfaces/appSurfaceStyles.constant";
import { APP_PAGE_STACK_CLASS } from "@/features/shell/public-api/types";

export default function AccountSignedOutView() {
  const copy = ACCOUNT_COPY.signedOut;
  return (
    <div className={APP_PAGE_STACK_CLASS}>
      <AccountHeader />
      <div className="flex max-w-lg flex-col items-start gap-3 rounded-lg border border-dashed border-awc-border-strong bg-awc-surface-2 p-6">
        <h2 className="text-base font-semibold text-awc-fg">{copy.title}</h2>
        <p className="text-sm text-awc-fg-muted">{copy.body}</p>
        <Link href="/login" className={APP_SURFACE_CTA_PRIMARY_CLASS}>
          {copy.signIn}
        </Link>
      </div>
    </div>
  );
}
