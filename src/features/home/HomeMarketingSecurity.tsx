import { HOME_MARKETING_SECURITY_COPY } from "@/features/home/constants/homeMarketingLandingCopy.constant";
import MarketingDarkBand from "@/features/marketing/MarketingDarkBand";

export default function HomeMarketingSecurity() {
  return (
    <section id="security" className="mt-6" aria-label="Your files">
      <MarketingDarkBand
        eyebrow="Your files"
        title={HOME_MARKETING_SECURITY_COPY.title}
        description={HOME_MARKETING_SECURITY_COPY.body}
      />
    </section>
  );
}
