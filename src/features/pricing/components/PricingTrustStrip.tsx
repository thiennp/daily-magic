import { PRICING_TRUST_ITEMS } from "@/features/pricing/pricingCopy.constant";

export default function PricingTrustStrip() {
  return (
    <ul className="mt-10 grid list-none grid-cols-1 gap-4 p-0 sm:grid-cols-3">
      {PRICING_TRUST_ITEMS.map((item) => (
        <li
          key={item.title}
          className="rounded-2xl border border-awc-border bg-awc-surface px-5 py-4 text-center shadow-sm"
        >
          <p className="font-semibold text-awc-fg">{item.title}</p>
          <p className="mt-1 text-sm text-awc-fg-muted">{item.body}</p>
        </li>
      ))}
    </ul>
  );
}
