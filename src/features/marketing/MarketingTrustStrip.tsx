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
              "inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium",
              item.emphasized
                ? "bg-zinc-100 text-zinc-800"
                : "bg-zinc-50 text-zinc-600",
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
