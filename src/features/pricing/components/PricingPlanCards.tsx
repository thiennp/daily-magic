import PricingPlanCard from "@/features/pricing/components/PricingPlanCard";
import { PRICING_PLAN_CARDS } from "@/features/pricing/pricingPlans.constant";

interface PricingPlanCardsProps {
  readonly signedIn: boolean;
}

export default function PricingPlanCards({ signedIn }: PricingPlanCardsProps) {
  return (
    <section aria-labelledby="pricing-plans-heading">
      <h2 id="pricing-plans-heading" className="sr-only">
        Plans
      </h2>
      <ul className="mt-10 grid list-none grid-cols-1 gap-4 p-0 md:grid-cols-3">
        {PRICING_PLAN_CARDS.map((plan) => (
          <li key={plan.id} className="min-w-0">
            <PricingPlanCard plan={plan} signedIn={signedIn} />
          </li>
        ))}
      </ul>
    </section>
  );
}
