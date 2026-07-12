import MarketingTrustIcon from "@/features/marketing/components/MarketingTrustIcon";
import {
  MARKETING_TRUST_PILL_DEFAULT_CLASSES,
  MARKETING_TRUST_PILL_EMPHASIZED_CLASSES,
} from "@/features/marketing/marketingPalette.constant";
import { MARKETING_TRUST_ITEMS } from "@/features/marketing/marketingTrustItems.constant";

export default function MarketingTrustStrip() {
  return (
    <ul
      className="grid max-w-lg grid-cols-1 gap-3 sm:grid-cols-2"
      aria-label="Trust and security highlights"
    >
      {MARKETING_TRUST_ITEMS.map((item) => (
        <li key={item.label} className="flex">
          <span
            className={`w-full ${
              item.emphasized
                ? MARKETING_TRUST_PILL_EMPHASIZED_CLASSES
                : MARKETING_TRUST_PILL_DEFAULT_CLASSES
            }`}
          >
            <MarketingTrustIcon icon={item.icon} />
            {item.label}
          </span>
        </li>
      ))}
    </ul>
  );
}
