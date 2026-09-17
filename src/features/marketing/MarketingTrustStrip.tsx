import MarketingTrustIcon from "@/features/marketing/components/MarketingTrustIcon";
import {
  MARKETING_TRUST_CARD_CLASSES,
  MARKETING_TRUST_ICON_SHELL_CLASSES,
} from "@/features/marketing/marketingPalette.constant";
import { MARKETING_METRIC_DIVIDER_CLASSES } from "@/features/marketing/marketingDesignSystem.constant";
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
          key={item.label}
          className="border-brand-200 lg:border-l lg:px-6 first:lg:border-l-0"
        >
          <div className={MARKETING_TRUST_CARD_CLASSES}>
            <span
              className={mergeMarketingClasses(
                MARKETING_TRUST_ICON_SHELL_CLASSES,
                "mb-2",
              )}
              aria-hidden="true"
            >
              <MarketingTrustIcon icon={item.icon} />
            </span>
            <span className="min-w-0 font-medium">{item.label}</span>
          </div>
        </li>
      ))}
    </ul>
  );
}
