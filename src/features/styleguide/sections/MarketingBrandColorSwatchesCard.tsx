import ComponentCard from "@/components/common/ComponentCard";
import { mergeMarketingClasses } from "@/features/marketing/mergeMarketingClasses";

const SWATCHES = [
  { label: "Canvas", className: "bg-gray-50" },
  { label: "Brand 600", className: "bg-brand-600" },
  { label: "Brand 50", className: "bg-brand-50" },
  { label: "Navy band", className: "bg-gray-950" },
] as const;

export default function MarketingBrandColorSwatchesCard() {
  return (
    <ComponentCard
      title="Color swatches"
      desc="Tailwind tokens from @theme brand + gray."
    >
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {SWATCHES.map((swatch) => (
          <div key={swatch.label} className="space-y-2">
            <div
              className={mergeMarketingClasses(
                "h-14 rounded-lg ring-1 ring-gray-200",
                swatch.className,
              )}
            />
            <p className="text-xs font-medium text-gray-600">{swatch.label}</p>
          </div>
        ))}
      </div>
    </ComponentCard>
  );
}
