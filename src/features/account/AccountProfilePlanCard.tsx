"use client";

import Link from "next/link";

import {
  ACCOUNT_CHIP_CLASS,
  ACCOUNT_H2_CLASS,
  ACCOUNT_HINT_CLASS,
  ACCOUNT_ROW_CARD_CLASS,
} from "@/features/account/accountClasses.constant";
import { ACCOUNT_COPY } from "@/features/account/accountCopy.constant";
import type { BillingPlanId } from "@/features/billing/public-api/types";

function planChipLabel(plan: BillingPlanId | null): string {
  const copy = ACCOUNT_COPY.profile;
  if (plan === "pro") return copy.planPro;
  if (plan === "team") return copy.planTeam;
  if (plan === "trial") return copy.planTrial;
  if (plan === "admin_free") return copy.planFree;
  return copy.planNone;
}

interface AccountProfilePlanCardProps {
  readonly planId: BillingPlanId | null;
}

export default function AccountProfilePlanCard({
  planId,
}: AccountProfilePlanCardProps) {
  const copy = ACCOUNT_COPY.profile;
  const hasPaidOrTrial =
    planId === "pro" || planId === "team" || planId === "trial";
  return (
    <section className={`${ACCOUNT_ROW_CARD_CLASS} space-y-3`}>
      <div className="flex flex-wrap items-center gap-2">
        <h2 className={ACCOUNT_H2_CLASS}>{copy.planH2}</h2>
        <span className={ACCOUNT_CHIP_CLASS}>{planChipLabel(planId)}</span>
      </div>
      <p className={ACCOUNT_HINT_CLASS}>{copy.planHelp}</p>
      <Link
        href="/pricing"
        className="inline-flex h-10 items-center justify-center rounded-xl bg-brand-600 px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-awc-blue-700"
      >
        {hasPaidOrTrial ? copy.ctaManage : copy.ctaStart}
      </Link>
    </section>
  );
}
