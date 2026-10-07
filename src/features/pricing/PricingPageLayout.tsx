import Link from "next/link";

import BillingPlanSummary from "@/features/billing/components/BillingPlanSummary";
import PricingBringYourOwn from "@/features/pricing/components/PricingBringYourOwn";
import PricingTrialClosedBanner from "@/features/pricing/components/PricingTrialClosedBanner";
import PricingCompareTable from "@/features/pricing/components/PricingCompareTable";
import PricingFaq from "@/features/pricing/components/PricingFaq";
import PricingHero from "@/features/pricing/components/PricingHero";
import PricingHowAiNotes from "@/features/pricing/components/PricingHowAiNotes";
import PricingOnDemand from "@/features/pricing/components/PricingOnDemand";
import PricingPlanCards from "@/features/pricing/components/PricingPlanCards";
import PricingTrustStrip from "@/features/pricing/components/PricingTrustStrip";
import { MARKETING_TEXT_LINK_CLASSES } from "@/features/marketing/marketingInteractiveClasses.constant";

interface PricingPageLayoutProps {
  readonly signedIn: boolean;
  readonly trialClosedBanner?: boolean;
}

export default function PricingPageLayout({
  signedIn,
  trialClosedBanner = false,
}: PricingPageLayoutProps) {
  return (
    <div className="pb-16">
      {!signedIn && trialClosedBanner ? <PricingTrialClosedBanner /> : null}
      {signedIn ? (
        <nav aria-label="Breadcrumb" className="mb-6 text-sm text-awc-fg-muted">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link href="/" className={MARKETING_TEXT_LINK_CLASSES}>
                Account
              </Link>
            </li>
            <li aria-hidden="true">›</li>
            <li className="font-medium text-awc-fg">Billing and plans</li>
          </ol>
        </nav>
      ) : null}
      {signedIn ? <BillingPlanSummary /> : null}
      <PricingHero />
      <PricingPlanCards signedIn={signedIn} />
      <PricingTrustStrip />
      <PricingCompareTable />
      <PricingBringYourOwn />
      <PricingOnDemand signedIn={signedIn} />
      <PricingHowAiNotes />
      <PricingFaq />
      <p className="mt-10 text-center text-sm text-awc-fg-muted">
        <Link href="/terms" className={MARKETING_TEXT_LINK_CLASSES}>
          Terms
        </Link>
        {" · "}
        <Link href="/privacy" className={MARKETING_TEXT_LINK_CLASSES}>
          Privacy
        </Link>
      </p>
    </div>
  );
}
