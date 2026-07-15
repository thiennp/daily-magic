import HomeMarketingHero from "@/features/home/components/HomeMarketingHero";
import HomeMarketingPopularPresets from "@/features/home/components/HomeMarketingPopularPresets";
import HomeMarketingFeatures from "@/features/home/HomeMarketingFeatures";
import HomeMarketingShowcases from "@/features/home/HomeMarketingShowcases";
import HomeMarketingSteps from "@/features/home/HomeMarketingSteps";
import MarketingIntegrationsRow from "@/features/marketing/MarketingIntegrationsRow";
import MarketingShell from "@/features/marketing/MarketingShell";

export default function HomeMarketingLanding() {
  return (
    <MarketingShell>
      <HomeMarketingHero />
      <HomeMarketingPopularPresets />
      <HomeMarketingFeatures />
      <HomeMarketingShowcases />
      <HomeMarketingSteps />
      <MarketingIntegrationsRow />
    </MarketingShell>
  );
}
