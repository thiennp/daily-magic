"use client";

import HomePromptSdlcSection from "@/features/home/components/HomePromptSdlcSection";
import MyOfferingsPanel from "@/features/capabilities/MyOfferingsPanel";
import TeamDirectoryPanel from "@/features/capabilities/TeamDirectoryPanel";
import FeedbackInboxPanel from "@/features/feedback/FeedbackInboxPanel";
import ImprovementReviewPanel from "@/features/improvements/ImprovementReviewPanel";
import MarketplaceHomePromo from "@/features/marketplace/MarketplaceHomePromo";
import HomeOnboardingMainPanel from "@/features/home/HomeOnboardingMainPanel";
import HomeProjectsPanel from "@/features/home/HomeProjectsPanel";
import HomeLinkAccountGate from "@/features/home/HomeLinkAccountGate";
import HomeCollapsibleMarketingShowcases from "@/features/home/HomeCollapsibleMarketingShowcases";
import HomeDashboardGrid from "@/features/home/HomeDashboardGrid";
import HomeDashboardLowerSection from "@/features/home/HomeDashboardLowerSection";
import HomeSetupSection from "@/features/home/HomeSetupSection";
import {
  AWC_STORYBOOK_INSTALL_COMMAND,
  AWC_STORYBOOK_USER,
} from "@/utils/storybook/awcStorybookFixtures";

const STORY_HOST = "localhost:3000";

export default function AwcHomeSignedInStoryView() {
  return (
    <>
      <HomeLinkAccountGate
        appOrigin="http://localhost:3000"
        installCommand={AWC_STORYBOOK_INSTALL_COMMAND}
        isWebSocketSupported={true}
        host={STORY_HOST}
        below={
          <HomeDashboardLowerSection>
            <HomePromptSdlcSection showComposeForm storybookPreview />
            <HomeCollapsibleMarketingShowcases />
          </HomeDashboardLowerSection>
        }
      >
        <HomeDashboardGrid
          main={
            <>
              <HomeOnboardingMainPanel
                user={AWC_STORYBOOK_USER}
                installCommand={AWC_STORYBOOK_INSTALL_COMMAND}
                isWebSocketSupported={true}
                host={STORY_HOST}
              />
              <HomeProjectsPanel />
              <MyOfferingsPanel />
              <TeamDirectoryPanel />
            </>
          }
          right={
            <>
              <FeedbackInboxPanel />
              <ImprovementReviewPanel />
              <MarketplaceHomePromo />
              <HomeSetupSection />
            </>
          }
        />
      </HomeLinkAccountGate>
    </>
  );
}
