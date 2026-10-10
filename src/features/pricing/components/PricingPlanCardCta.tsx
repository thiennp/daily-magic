"use client";

import Link from "next/link";
import { useState } from "react";

import { BILLING_COPY } from "@/features/billing/public-api/types";
import { postBillingCheckoutStub } from "@/features/billing/public-api/presentation";
import { PRICING_CONTACT_SALES_HREF } from "@/features/pricing/pricingAuthHrefs.constant";
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
    "inline-flex w-full items-center justify-center rounded-2xl bg-brand-600 px-5 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-awc-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-awc-blue-600/40";

  return (
    <div className="mt-5 space-y-2">
      {useCheckoutStub ? (
        <button
          type="button"
          onClick={handleCheckout}
          aria-label={`${ctaLabel}, ${plan.name}`}
          className={ctaClassName}
        >
          {ctaLabel}
        </button>
      ) : (
        <Link
          href={href}
          aria-label={`${ctaLabel}, ${plan.name}`}
          className={ctaClassName}
        >
          {ctaLabel}
        </Link>
      )}
      {stubNote ? (
        <p className="text-center text-xs text-awc-fg-muted">{stubNote}</p>
      ) : null}
      {plan.contactSales ? (
        <a
          href={PRICING_CONTACT_SALES_HREF}
          className="block text-center text-sm font-medium text-awc-blue-700 underline underline-offset-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-awc-blue-600"
        >
          Contact sales
        </a>
      ) : null}
      {plan.contactSales ? (
        <p className="text-center text-xs text-awc-fg-muted">
          {PRICING_TEAM_VOLUME_NOTE}
        </p>
      ) : null}
      {plan.contactSales ? null : (
        <p className="text-center text-xs text-awc-fg-muted">
          {PRICING_CANCEL_NOTE}
        </p>
      )}
    </div>
  );
}
