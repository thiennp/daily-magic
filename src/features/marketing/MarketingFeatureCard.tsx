import MarketingCard from "@/features/marketing/MarketingCard";
import MarketingFeaturePreview from "@/features/marketing/MarketingFeaturePreview";
import type { MarketingFeatureItem } from "@/features/marketing/marketingFeatureItems.constant";

interface MarketingFeatureCardProps {
  readonly item: MarketingFeatureItem;
}

export default function MarketingFeatureCard({
  item,
}: MarketingFeatureCardProps) {
  return (
    <MarketingCard className="flex h-full flex-col gap-4 p-5">
      <MarketingFeaturePreview preview={item.preview} />
      <div>
        <h3 className="text-sm font-semibold text-gray-900">{item.title}</h3>
        <p className="mt-2 text-sm text-gray-600">{item.body}</p>
      </div>
    </MarketingCard>
  );
}
