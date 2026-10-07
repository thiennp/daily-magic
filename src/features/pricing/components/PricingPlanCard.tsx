import PricingPlanCardCta from "@/features/pricing/components/PricingPlanCardCta";
import type { PricingPlanCard as PlanCard } from "@/features/pricing/pricingPlans.constant";
import {
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
  const useCheckoutStub =
    signedIn && (plan.id === "pro" || plan.id === "team");
  const ctaLabel =
    signedIn && plan.id === "trial" ? "Your plan options" : plan.ctaLabel;

  return (
    <article
      className={`flex h-full flex-col rounded-2xl border bg-awc-surface p-6 shadow-[0_4px_20px_-2px_rgba(16,24,40,0.06)] ring-1 ${plan.accentClass}`}
    >
      {plan.popular ? (
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-blue-700">
          Most popular
        </p>
      ) : null}
      <h2 className="text-2xl font-bold text-awc-fg">{plan.name}</h2>
      <p className="mt-1 text-sm text-awc-fg-muted">{plan.tag}</p>
      <p className="mt-5 flex items-baseline gap-2">
        <span className="text-4xl font-bold tracking-tight text-awc-fg">
          {plan.priceLabel}
        </span>
        <span className="text-sm text-awc-fg-muted">{plan.priceSuffix}</span>
      </p>
      <p className="mt-1 text-sm font-medium text-awc-fg">{plan.minLine}</p>
      <ul className="mt-5 flex-1 space-y-2.5 text-sm text-awc-fg">
        {plan.feats.map((feat) => (
          <li key={feat} className="flex gap-2">
            <span className="mt-0.5 text-blue-600" aria-hidden="true">
              ✓
            </span>
            <span>{feat}</span>
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
