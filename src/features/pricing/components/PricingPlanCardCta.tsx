"use client";

import Link from "next/link";
import { useState } from "react";

import { BILLING_COPY } from "@/features/billing/billingCopy.constant";
import postBillingCheckoutStub from "@/features/billing/postBillingCheckoutStub";
import {
  PRICING_CONTACT_SALES_HREF,
} from "@/features/pricing/pricingAuthHrefs.constant";
import {
  PRICING_CANCEL_NOTE,
  PRICING_TEAM_VOLUME_NOTE,
} from "@/features/pricing/pricingCopy.constant";
import type { PricingPlanCard as PlanCard } from "@/features/pricing/pricingPlans.constant";

interface PricingPlanCardCtaProps {
  readonly plan: PlanCard;
  readonly href: string;
  readonly ctaLabel: string;
  readonly useCheckoutStub: boolean;
}

export default function PricingPlanCardCta({
  plan,
  href,
  ctaLabel,
  useCheckoutStub,
}: PricingPlanCardCtaProps) {
  const [stubNote, setStubNote] = useState<string | null>(null);

  const handleCheckout = () => {
    if (plan.id !== "pro" && plan.id !== "team") {
      return;
    }
    void postBillingCheckoutStub({ plan: plan.id }).then((result) => {
      setStubNote(result.message ?? BILLING_COPY.upgradeStubPending);
    });
  };

  const ctaClassName =
    "inline-flex w-full items-center justify-center rounded-2xl bg-brand-600 px-5 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/40";

  return (
    <div className="mt-6 space-y-2">
      {useCheckoutStub ? (
        <button type="button" onClick={handleCheckout} className={ctaClassName}>
          {ctaLabel}
        </button>
      ) : (
        <Link href={href} className={ctaClassName}>
          {ctaLabel}
        </Link>
      )}
      {stubNote ? (
        <p className="text-center text-xs text-gray-500">{stubNote}</p>
      ) : null}
      {plan.contactSales ? (
        <a
          href={PRICING_CONTACT_SALES_HREF}
          className="inline-flex w-full items-center justify-center rounded-2xl border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-gray-800 transition hover:bg-gray-50"
        >
          Contact sales
        </a>
      ) : null}
      {plan.contactSales ? (
        <p className="text-center text-xs text-gray-500">
          {PRICING_TEAM_VOLUME_NOTE}
        </p>
      ) : null}
      <p className="text-center text-xs text-gray-500">{PRICING_CANCEL_NOTE}</p>
    </div>
  );
}
