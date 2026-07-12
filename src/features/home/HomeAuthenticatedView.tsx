import MyOfferingsPanel from "@/features/capabilities/MyOfferingsPanel";
import TeamDirectoryPanel from "@/features/capabilities/TeamDirectoryPanel";
import FeedbackInboxPanel from "@/features/feedback/FeedbackInboxPanel";
import ImprovementReviewPanel from "@/features/improvements/ImprovementReviewPanel";
import BorrowHarnessCatalog from "@/features/harness/BorrowHarnessCatalog";
import HomeDashboardHero from "@/features/home/HomeDashboardHero";
import HomeOnboardingChecklist from "@/features/home/HomeOnboardingChecklist";
import HomePresencePanel from "@/features/home/HomePresencePanel";
import HomeSetupSection from "@/features/home/HomeSetupSection";
import {
  HOME_DASHBOARD_GRID_CLASS,
  HOME_LEFT_RAIL_CLASS,
  HOME_MAIN_COLUMN_CLASS,
  HOME_RIGHT_RAIL_CLASS,
} from "@/features/home/homeDashboardLayout.constant";
import type { GlobalRoleValue } from "@/lib/auth/roles";

interface HomeAuthenticatedViewProps {
  readonly user: {
    readonly email: string;
    readonly name: string | null;
    readonly globalRole: GlobalRoleValue;
  };
}

export default function HomeAuthenticatedView({
  user,
}: HomeAuthenticatedViewProps) {
  return (
    <div className={HOME_DASHBOARD_GRID_CLASS}>
      <aside className={HOME_LEFT_RAIL_CLASS}>
        <HomeOnboardingChecklist />
        <HomePresencePanel />
      </aside>

      <main className={HOME_MAIN_COLUMN_CLASS}>
        <HomeDashboardHero user={user} />
        <MyOfferingsPanel />
        <TeamDirectoryPanel />
      </main>

      <aside className={HOME_RIGHT_RAIL_CLASS}>
        <FeedbackInboxPanel />
        <ImprovementReviewPanel />
        <BorrowHarnessCatalog />
        <HomeSetupSection />
      </aside>
    </div>
  );
}
