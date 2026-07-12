import MarketingTrustIcon from "@/features/marketing/components/MarketingTrustIcon";
import {
  MARKETING_TRUST_PILL_DEFAULT_CLASSES,
  MARKETING_TRUST_PILL_EMPHASIZED_CLASSES,
} from "@/features/marketing/marketingPalette.constant";
import { MARKETING_TRUST_ITEMS } from "@/features/marketing/marketingTrustItems.constant";

export default function MarketingTrustStrip() {
  return (
    <ul
      className="flex flex-wrap gap-2"
      aria-label="Trust and security highlights"
    >
      {MARKETING_TRUST_ITEMS.map((item) => (
        <li key={item.label}>
          <span
            className={
              item.emphasized
                ? MARKETING_TRUST_PILL_EMPHASIZED_CLASSES
                : MARKETING_TRUST_PILL_DEFAULT_CLASSES
            }
          >
            <MarketingTrustIcon icon={item.icon} />
            {item.label}
          </span>
        </li>
      ))}
    </ul>
  );
}
