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

  return (
    <HomeLinkAccountGate
      appOrigin={appOrigin}
      installCommand={installCommand}
      isWebSocketSupported={isWebSocketSupported}
      host={host}
      below={
        <HomeDashboardLowerSection>
          <HomePromptSdlcSection showComposeForm />
          <HomeCollapsibleMarketingShowcases />
        </HomeDashboardLowerSection>
      }
    >
      <HomeDashboardGrid
        main={
          <>
            <HomeOnboardingMainPanel
              user={user}
              installCommand={installCommand}
              isWebSocketSupported={isWebSocketSupported}
              host={host}
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
  );
}
