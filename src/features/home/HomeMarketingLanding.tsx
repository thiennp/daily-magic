import HomeAgentAccessPrompt from "@/features/agent-access/HomeAgentAccessPrompt";
import HomeMarketingHero from "@/features/home/components/HomeMarketingHero";
import HomeMarketingPopularPresets from "@/features/home/components/HomeMarketingPopularPresets";
import HomeMarketingFeatures from "@/features/home/HomeMarketingFeatures";
import HomeMarketingShowcases from "@/features/home/HomeMarketingShowcases";
import HomeMarketingSteps from "@/features/home/HomeMarketingSteps";
import MarketingCtaBand from "@/features/marketing/MarketingCtaBand";
import MarketingIntegrationsRow from "@/features/marketing/MarketingIntegrationsRow";
import MarketingShell from "@/features/marketing/MarketingShell";

export default function HomeMarketingLanding() {
  return (
    <MarketingShell>
      <HomeMarketingHero />
      <HomeAgentAccessPrompt />
      <HomeMarketingPopularPresets />
      <HomeMarketingFeatures />
      <HomeMarketingShowcases />
      <HomeMarketingSteps />
      <MarketingCtaBand />
      <MarketingIntegrationsRow />
    </MarketingShell>
  );
}
