import HomeMarketingPopularPresetsGrid from "@/features/home/components/HomeMarketingPopularPresetsGrid";
import { HOME_MARKETING_POPULAR_PRESETS_COPY } from "@/features/home/constants/public-api/types";
import { resolveHomePopularPresets } from "@/features/home/utils/public-api/presentation";
import { MarketingSectionHeader } from "@/features/marketing/public-api/presentation";

export default function HomeMarketingPopularPresets() {
  const presets = resolveHomePopularPresets();
  const copy = HOME_MARKETING_POPULAR_PRESETS_COPY;

  return (
    <section className="mt-16" aria-labelledby="popular-presets-heading">
      <MarketingSectionHeader
        title={copy.title}
        description={copy.description}
        headingId="popular-presets-heading"
      />
      <HomeMarketingPopularPresetsGrid presets={presets} />
    </section>
  );
}
