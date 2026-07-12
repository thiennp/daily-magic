import MarketingTrustIcon from "@/features/marketing/components/MarketingTrustIcon";
import { MARKETING_TRUST_ITEMS } from "@/features/marketing/marketingTrustItems.constant";
import { mergeMarketingClasses } from "@/features/marketing/mergeMarketingClasses";

export default function MarketingTrustStrip() {
  return (
    <ul
      className="flex flex-wrap gap-2"
      aria-label="Trust and security highlights"
    >
      {MARKETING_TRUST_ITEMS.map((item) => (
        <li key={item.label}>
          <span
            className={mergeMarketingClasses(
              "inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium shadow-theme-xs ring-1 transition duration-200",
              item.emphasized
                ? "border-brand-200/80 bg-brand-50/90 text-brand-800 ring-brand-200/60"
                : "border-gray-200 bg-white/90 text-gray-700 ring-gray-200/60",
            )}
          >
            <MarketingTrustIcon icon={item.icon} />
            {item.label}
          </span>
        </li>
      ))}
    </ul>
  );
}
