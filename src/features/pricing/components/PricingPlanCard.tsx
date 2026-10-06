import Link from "next/link";

import type { PricingPlanCard as PlanCard } from "@/features/pricing/pricingPlans.constant";
import {
  PRICING_CANCEL_NOTE,
  PRICING_TEAM_VOLUME_NOTE,
} from "@/features/pricing/pricingCopy.constant";
import {
  PRICING_CONTACT_SALES_HREF,
  PRICING_PAGE_PATH,
  PRICING_SIGN_IN_HREF,
  PRICING_START_TRIAL_HREF,
} from "@/features/pricing/pricingAuthHrefs.constant";

interface PricingPlanCardProps {
  readonly plan: PlanCard;
  readonly signedIn: boolean;
}

const resolveCtaHref = (planId: PlanCard["id"], signedIn: boolean): string => {
  if (planId === "trial") {
    return signedIn ? PRICING_PAGE_PATH : PRICING_START_TRIAL_HREF;
  }
  return signedIn ? PRICING_PAGE_PATH : PRICING_SIGN_IN_HREF;
};

export default function PricingPlanCard({
  plan,
  signedIn,
}: PricingPlanCardProps) {
  const href = resolveCtaHref(plan.id, signedIn);
  const ctaLabel =
    signedIn && plan.id === "trial"
      ? "Your plan options"
      : plan.ctaLabel;

  return (
    <article
      className={`flex h-full flex-col rounded-2xl border bg-white p-6 shadow-[0_4px_20px_-2px_rgba(16,24,40,0.06)] ring-1 ${plan.accentClass}`}
    >
      {plan.popular ? (
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-blue-700">
          Most popular
        </p>
      ) : null}
      <h2 className="text-2xl font-bold text-gray-900">{plan.name}</h2>
      <p className="mt-1 text-sm text-gray-600">{plan.tag}</p>
      <p className="mt-5 flex items-baseline gap-2">
        <span className="text-4xl font-bold tracking-tight text-gray-950">
          {plan.priceLabel}
        </span>
        <span className="text-sm text-gray-500">{plan.priceSuffix}</span>
      </p>
      <p className="mt-1 text-sm font-medium text-gray-700">{plan.minLine}</p>
      <ul className="mt-5 flex-1 space-y-2.5 text-sm text-gray-700">
        {plan.feats.map((feat) => (
          <li key={feat} className="flex gap-2">
            <span className="mt-0.5 text-blue-600" aria-hidden="true">
              ✓
            </span>
            <span>{feat}</span>
          </li>
        ))}
      </ul>
      <div className="mt-6 space-y-2">
        <Link
          href={href}
          className="inline-flex w-full items-center justify-center rounded-2xl bg-brand-600 px-5 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/40"
        >
          {ctaLabel}
        </Link>
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
        <p className="text-center text-xs text-gray-500">
          {PRICING_CANCEL_NOTE}
        </p>
      </div>
    </article>
  );
}
