import PricingPlanCardCta from "@/features/pricing/components/PricingPlanCardCta";
import type { PricingPlanCard as PlanCard } from "@/features/pricing/pricingPlans.constant";
import {
  PRICING_PAGE_PATH,
  PRICING_SIGN_IN_HREF,
  PRICING_SIGNED_IN_TRIAL_HREF,
  PRICING_START_TRIAL_HREF,
} from "@/features/pricing/pricingAuthHrefs.constant";

interface PricingPlanCardProps {
  readonly plan: PlanCard;
  readonly signedIn: boolean;
}

const resolveCtaHref = (planId: PlanCard["id"], signedIn: boolean): string => {
  if (planId === "trial") {
    return signedIn ? PRICING_SIGNED_IN_TRIAL_HREF : PRICING_START_TRIAL_HREF;
  }
  return signedIn ? PRICING_PAGE_PATH : PRICING_SIGN_IN_HREF;
};

export default function PricingPlanCard({
  plan,
  signedIn,
}: PricingPlanCardProps) {
  const href = resolveCtaHref(plan.id, signedIn);
  const useCheckoutStub = signedIn && (plan.id === "pro" || plan.id === "team");
  const ctaLabel =
    signedIn && plan.id === "trial" ? "Your plan options" : plan.ctaLabel;

  return (
    <article
      aria-labelledby={`pricing-plan-${plan.id}`}
      className={`relative flex h-full flex-col rounded-2xl border border-t-4 bg-awc-surface p-5 shadow-[0_4px_20px_-2px_rgba(16,24,40,0.06)] ring-1 ${plan.accentClass}`}
    >
      {plan.popular ? (
        <span className="absolute -top-[13px] right-4 inline-flex items-center gap-1 rounded-full bg-awc-blue-600 px-2.5 py-1 text-xs font-bold text-white">
          <svg
            width={12}
            height={12}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.9}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            focusable="false"
          >
            <path d="m12 3 2.8 5.8 6.2.9-4.5 4.4 1 6.2L12 17.3 6.5 20.3l1-6.2L3 9.7l6.2-.9z" />
          </svg>
          Most popular
        </span>
      ) : null}
      <h3
        id={`pricing-plan-${plan.id}`}
        className="text-xl font-bold text-awc-fg"
      >
        {plan.name}
      </h3>
      <p className="mt-1 text-sm text-awc-fg-muted">{plan.tag}</p>
      <p className="mt-5 flex items-baseline gap-2">
        <span className="text-4xl font-bold tracking-tight text-awc-fg">
          {plan.priceLabel}
        </span>
        <span className="text-sm text-awc-fg-muted">{plan.priceSuffix}</span>
      </p>
      <p className="mt-1 text-sm text-awc-fg-muted">{plan.minLine}</p>
      <ul className="mt-5 flex-1 space-y-2.5 text-sm text-awc-fg">
        {plan.feats.map((feat) => (
          <li key={feat} className="flex gap-2">
            <svg
              width={16}
              height={16}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.9}
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              focusable="false"
              className="mt-0.5 shrink-0 text-awc-blue-600"
            >
              <path d="m5 12.5 4.5 4.5L19 7.5" />
            </svg>
            <span className="min-w-0 [overflow-wrap:anywhere]">{feat}</span>
          </li>
        ))}
      </ul>
      <PricingPlanCardCta
        plan={plan}
        href={href}
        ctaLabel={ctaLabel}
        useCheckoutStub={useCheckoutStub}
      />
    </article>
  );
}
