import MarketingBadge from "@/features/marketing/MarketingBadge";
import { MARKETING_TRUST_ITEMS } from "@/features/marketing/marketingTrustItems.constant";

export default function MarketingTrustStrip() {
  return (
    <div className="flex flex-wrap gap-2">
      {MARKETING_TRUST_ITEMS.map((item) => (
        <MarketingBadge key={item.label}>{item.label}</MarketingBadge>
      ))}
    </div>
  );
}
