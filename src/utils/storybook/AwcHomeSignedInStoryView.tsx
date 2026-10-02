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
import HomeOnboardingAutomateNudge from "@/features/home/HomeOnboardingAutomateNudge";
import HomeOnboardingChecklist from "@/features/home/HomeOnboardingChecklist";
import HomeSetupSection from "@/features/home/HomeSetupSection";
import {
  HOME_DASHBOARD_GRID_CLASS,
  HOME_LEFT_RAIL_CLASS,
  HOME_MAIN_COLUMN_CLASS,
  HOME_RIGHT_RAIL_CLASS,
} from "@/features/home/homeDashboardLayout.constant";
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
      >
        <div className={HOME_DASHBOARD_GRID_CLASS}>
          <aside className={HOME_LEFT_RAIL_CLASS}>
            <HomeOnboardingChecklist />
            <HomeOnboardingAutomateNudge />
          </aside>

          <main className={HOME_MAIN_COLUMN_CLASS}>
            <HomeOnboardingMainPanel
              user={AWC_STORYBOOK_USER}
              installCommand={AWC_STORYBOOK_INSTALL_COMMAND}
              isWebSocketSupported={true}
              host={STORY_HOST}
            />
            <HomeProjectsPanel />
            <MyOfferingsPanel />
            <TeamDirectoryPanel />
          </main>

          <aside className={HOME_RIGHT_RAIL_CLASS}>
            <FeedbackInboxPanel />
            <ImprovementReviewPanel />
            <MarketplaceHomePromo />
            <HomeSetupSection />
          </aside>
        </div>
      </HomeLinkAccountGate>
      <div className={HOME_DASHBOARD_GRID_CLASS}>
        <div className={HOME_MAIN_COLUMN_CLASS}>
          <HomePromptSdlcSection />
          <HomeCollapsibleMarketingShowcases />
        </div>
      </div>
    </>
  );
}
