import {
  MARKETING_METRIC_DESCRIPTION_CLASSES,
  MARKETING_METRIC_DIVIDER_CLASSES,
  MARKETING_METRIC_VALUE_CLASSES,
} from "@/features/marketing/marketingDesignSystem.constant";
import { MARKETING_TRUST_ITEMS } from "@/features/marketing/marketingTrustItems.constant";
import { mergeMarketingClasses } from "@/features/marketing/mergeMarketingClasses";

export default function MarketingTrustStrip() {
  return (
    <ul
      className={mergeMarketingClasses(
        "grid grid-cols-1 gap-6 border-y py-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0",
        MARKETING_METRIC_DIVIDER_CLASSES,
      )}
      aria-label="Trust and security highlights"
    >
      {MARKETING_TRUST_ITEMS.map((item) => (
        <li
          key={item.metric}
          className="border-brand-200 lg:border-l lg:px-6 first:lg:border-l-0"
        >
          <p className={MARKETING_METRIC_VALUE_CLASSES}>{item.metric}</p>
          <p className={MARKETING_METRIC_DESCRIPTION_CLASSES}>
            {item.description}
          </p>
        </li>
      ))}
    </ul>
  );
}
