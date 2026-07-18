import MyOfferingsPanel from "@/features/capabilities/MyOfferingsPanel";
import TeamDirectoryPanel from "@/features/capabilities/TeamDirectoryPanel";
import FeedbackInboxPanel from "@/features/feedback/FeedbackInboxPanel";
import ImprovementReviewPanel from "@/features/improvements/ImprovementReviewPanel";
import MarketplaceHomePromo from "@/features/marketplace/MarketplaceHomePromo";
import HomeConnectedMacsPanel from "@/features/home/HomeConnectedMacsPanel";
import HomeOnboardingMainPanel from "@/features/home/HomeOnboardingMainPanel";
import HomeLinkAccountGate from "@/features/home/HomeLinkAccountGate";
import HomeOnboardingAutomateNudge from "@/features/home/HomeOnboardingAutomateNudge";
import HomeOnboardingChecklist from "@/features/home/HomeOnboardingChecklist";
import HomeSetupSection from "@/features/home/HomeSetupSection";
import {
  HOME_DASHBOARD_GRID_CLASS,
  HOME_LEFT_RAIL_CLASS,
  HOME_MAIN_COLUMN_CLASS,
  HOME_RIGHT_RAIL_CLASS,
} from "@/features/home/homeDashboardLayout.constant";
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
    >
      <div className={HOME_DASHBOARD_GRID_CLASS}>
        <aside className={HOME_LEFT_RAIL_CLASS}>
          <HomeOnboardingChecklist />
          <HomeOnboardingAutomateNudge />
          <HomeConnectedMacsPanel
            installCommand={installCommand}
            isWebSocketSupported={isWebSocketSupported}
            host={host}
          />
        </aside>

        <main className={HOME_MAIN_COLUMN_CLASS}>
          <HomeOnboardingMainPanel user={user} />
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
  );
}
