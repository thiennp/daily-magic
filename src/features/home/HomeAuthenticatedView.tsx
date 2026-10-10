import HomePromptOptimizerCtaBox from "@/features/home/components/HomePromptOptimizerCtaBox";
import MyOfferingsPanel from "@/features/capabilities/MyOfferingsPanel";
import TeamDirectoryPanel from "@/features/capabilities/TeamDirectoryPanel";
import FeedbackInboxPanel from "@/features/feedback/FeedbackInboxPanel";
import { ImprovementReviewPanel } from "@/features/improvements/public-api/presentation";
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
import { buildAppOriginFromHeaders } from "@/lib/agentWitch/buildAgentWitchInstallUrls";
import { buildLocalAgentInstallUrlsFromHeaders } from "@/lib/agentWitch/buildLocalAgentInstallCommand";
import { isAgentWitchWebSocketAvailableForHost } from "@/lib/agentWitch/isAgentWitchWebSocketAvailable";
import type { GlobalRoleValue } from "@/lib/auth/roles";
import { headers } from "next/headers";

interface HomeAuthenticatedViewProps {
  readonly user: {
    readonly email: string;
    readonly name: string | null;
    readonly globalRole: GlobalRoleValue;
  };
}

export default async function HomeAuthenticatedView({
  user,
}: HomeAuthenticatedViewProps) {
  const requestHeaders = await headers();
  const appOrigin = buildAppOriginFromHeaders(requestHeaders);
  const { installCommand } =
    buildLocalAgentInstallUrlsFromHeaders(requestHeaders);
  const host =
    requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "";
  const isWebSocketSupported = isAgentWitchWebSocketAvailableForHost(host);
  const displayName = user.name ?? user.email;

  return (
    <HomeLinkAccountGate
      appOrigin={appOrigin}
      installCommand={installCommand}
      isWebSocketSupported={isWebSocketSupported}
      host={host}
      below={
        <HomeDashboardLowerSection>
          <HomeWhatYouCanDo
            installCommand={installCommand}
            isWebSocketSupported={isWebSocketSupported}
            host={host}
          />
        </HomeDashboardLowerSection>
      }
    >
      <HomeDashboardBoard
        head={<HomePageHead displayName={displayName} />}
        lead={
          <HomeOnboardingMainPanel
            user={user}
            installCommand={installCommand}
            isWebSocketSupported={isWebSocketSupported}
            host={host}
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
                  installCommand={installCommand}
                  isWebSocketSupported={isWebSocketSupported}
                  host={host}
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
