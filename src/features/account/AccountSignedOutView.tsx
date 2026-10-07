"use client";

import Link from "next/link";

import AppPanel from "@/components/surfaces/AppPanel";
import { ACCOUNT_COPY } from "@/features/account/accountCopy.constant";
import { APP_SURFACE_CTA_PRIMARY_CLASS } from "@/components/surfaces/appSurfaceStyles.constant";

export default function AccountSignedOutView() {
  const copy = ACCOUNT_COPY.signedOut;
  return (
    <AppPanel className="max-w-lg space-y-4">
      <h1 className="text-2xl font-bold tracking-tight text-awc-fg dark:text-white">
        {copy.title}
      </h1>
      <p className="text-sm text-awc-fg-muted dark:text-gray-400">{copy.body}</p>
      <Link href="/login" className={APP_SURFACE_CTA_PRIMARY_CLASS}>
        {copy.signIn}
      </Link>
    </AppPanel>
  );
}
