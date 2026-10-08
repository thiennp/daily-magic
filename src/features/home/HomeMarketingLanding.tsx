import HomeMarketingAuthModalProvider from "@/features/home/components/HomeMarketingAuthModalProvider";
import HomeMarketingHero from "@/features/home/components/HomeMarketingHero";
import HomeMarketingPopularPresets from "@/features/home/components/HomeMarketingPopularPresets";
import HomeMarketingFaq from "@/features/home/HomeMarketingFaq";
import HomeMarketingFeatures from "@/features/home/HomeMarketingFeatures";
import HomeMarketingSecurity from "@/features/home/HomeMarketingSecurity";
import HomeMarketingSteps from "@/features/home/HomeMarketingSteps";
import MarketingCtaBand from "@/features/marketing/MarketingCtaBand";
import MarketingShell from "@/features/marketing/MarketingShell";

/** Design home-v1 signed-out order: hero, what, bots, workflows, files, FAQ, CTA. */
export default function HomeMarketingLanding() {
  return (
    <HomeMarketingAuthModalProvider>
      <MarketingShell>
        <HomeMarketingHero />
        <HomeMarketingFeatures />
        <HomeMarketingSteps />
        <HomeMarketingPopularPresets />
        <HomeMarketingSecurity />
        <HomeMarketingFaq />
        <MarketingCtaBand />
      </MarketingShell>
    </HomeMarketingAuthModalProvider>
  );
}
