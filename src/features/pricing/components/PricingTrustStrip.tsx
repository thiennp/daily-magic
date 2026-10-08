import PricingTrustIcon from "@/features/pricing/components/PricingTrustIcon";
import { PRICING_TRUST_ITEMS } from "@/features/pricing/pricingCopy.constant";

export default function PricingTrustStrip() {
  return (
    <ul className="mt-8 grid list-none grid-cols-1 gap-4 p-0 sm:grid-cols-3">
      {PRICING_TRUST_ITEMS.map((item) => (
        <li
          key={item.title}
          className="flex items-start gap-3 rounded-xl border border-awc-border bg-awc-surface px-5 py-4 shadow-sm"
        >
          <PricingTrustIcon name={item.icon} />
          <span className="flex flex-col text-sm text-awc-fg-muted">
            <b className="font-semibold text-awc-fg">{item.title}</b>
            {item.body}
          </span>
        </li>
      ))}
    </ul>
  );
}
