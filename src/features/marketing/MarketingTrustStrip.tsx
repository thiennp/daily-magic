import {
  MARKETING_METRIC_DESCRIPTION_CLASSES,
  MARKETING_METRIC_VALUE_CLASSES,
} from "@/features/marketing/marketingDesignSystem.constant";
import { MARKETING_TRUST_ITEMS } from "@/features/marketing/marketingTrustItems.constant";

export default function MarketingTrustStrip() {
  return (
    <ul
      className="grid grid-cols-1 gap-6 py-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8"
      aria-label="Trust and security highlights"
    >
      {MARKETING_TRUST_ITEMS.map((item) => (
        <li key={item.metric}>
          <p className={MARKETING_METRIC_VALUE_CLASSES}>{item.metric}</p>
          <p className={MARKETING_METRIC_DESCRIPTION_CLASSES}>
            {item.description}
          </p>
        </li>
      ))}
    </ul>
  );
}
