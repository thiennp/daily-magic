"use client";

import HomePromptOptimizerCtaBox from "@/features/home/components/HomePromptOptimizerCtaBox";
import MyOfferingsPanel from "@/features/capabilities/MyOfferingsPanel";
import TeamDirectoryPanel from "@/features/capabilities/TeamDirectoryPanel";
import FeedbackInboxPanel from "@/features/feedback/FeedbackInboxPanel";
import ImprovementReviewPanel from "@/features/improvements/ImprovementReviewPanel";
import MarketplaceHomePromo from "@/features/marketplace/MarketplaceHomePromo";
import HomeAttentionPanel from "@/features/home/HomeAttentionPanel";
import HomeComputersCard from "@/features/home/HomeComputersCard";
import HomeCursorCloudPanel from "@/features/home/HomeCursorCloudPanel";
import HomeDashboardBoard from "@/features/home/HomeDashboardBoard";
import HomeDashboardGrid from "@/features/home/HomeDashboardGrid";
import HomeDashboardLowerSection from "@/features/home/HomeDashboardLowerSection";
import HomeLinkAccountGate from "@/features/home/HomeLinkAccountGate";
import HomeOnboardingMainPanel from "@/features/home/HomeOnboardingMainPanel";
import HomePageHead from "@/features/home/HomePageHead";
import HomeProjectsPanel from "@/features/home/HomeProjectsPanel";
import HomeSetupSection from "@/features/home/HomeSetupSection";
import HomeWhatYouCanDo from "@/features/home/HomeWhatYouCanDo";
import {
  AWC_STORYBOOK_INSTALL_COMMAND,
  AWC_STORYBOOK_USER,
} from "@/utils/storybook/awcStorybookFixtures";

const STORY_HOST = "localhost:3000";

export default function AwcHomeSignedInStoryView() {
  const displayName = AWC_STORYBOOK_USER.name ?? AWC_STORYBOOK_USER.email;

  return (
    <HomeLinkAccountGate
      appOrigin="http://localhost:3000"
      installCommand={AWC_STORYBOOK_INSTALL_COMMAND}
      isWebSocketSupported={true}
      host={STORY_HOST}
      below={
        <HomeDashboardLowerSection>
          <HomeWhatYouCanDo
            installCommand={AWC_STORYBOOK_INSTALL_COMMAND}
            isWebSocketSupported={true}
            host={STORY_HOST}
          />
        </HomeDashboardLowerSection>
      }
    >
      <HomeDashboardBoard
        head={<HomePageHead displayName={displayName} />}
        lead={
          <HomeOnboardingMainPanel
            user={AWC_STORYBOOK_USER}
            installCommand={AWC_STORYBOOK_INSTALL_COMMAND}
            isWebSocketSupported={true}
            host={STORY_HOST}
          />
        }
        grid={
          <HomeDashboardGrid
            main={
              <>
                <HomeAttentionPanel />
                <HomeProjectsPanel />
                <MyOfferingsPanel />
                <TeamDirectoryPanel />
                <ImprovementReviewPanel />
              </>
            }
            right={
              <>
                <HomeComputersCard
                  installCommand={AWC_STORYBOOK_INSTALL_COMMAND}
                  isWebSocketSupported={true}
                  host={STORY_HOST}
                />
                <HomeCursorCloudPanel />
                <FeedbackInboxPanel />
                <MarketplaceHomePromo />
                <HomePromptOptimizerCtaBox />
                <HomeSetupSection />
              </>
            }
          />
        }
      />
    </HomeLinkAccountGate>
  );
}
