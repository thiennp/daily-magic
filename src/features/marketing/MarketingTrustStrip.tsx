import MarketingTrustIcon from "@/features/marketing/components/MarketingTrustIcon";
import {
  MARKETING_TRUST_CARD_CLASSES,
  MARKETING_TRUST_ICON_SHELL_CLASSES,
} from "@/features/marketing/marketingPalette.constant";
import { MARKETING_TRUST_ITEMS } from "@/features/marketing/marketingTrustItems.constant";

export default function MarketingTrustStrip() {
  return (
    <ul
      className="grid max-w-2xl grid-cols-1 gap-2.5 sm:grid-cols-2"
      aria-label="Trust and security highlights"
    >
      {MARKETING_TRUST_ITEMS.map((item) => (
        <li key={item.label}>
          <div className={MARKETING_TRUST_CARD_CLASSES}>
            <span
              className={MARKETING_TRUST_ICON_SHELL_CLASSES}
              aria-hidden="true"
            >
              <MarketingTrustIcon icon={item.icon} />
            </span>
            <span className="min-w-0">{item.label}</span>
          </div>
        </li>
      ))}
    </ul>
  );
}
