import MyOfferingsPanel from "@/features/capabilities/MyOfferingsPanel";
import TeamDirectoryPanel from "@/features/capabilities/TeamDirectoryPanel";
import FeedbackInboxPanel from "@/features/feedback/FeedbackInboxPanel";
import ImprovementReviewPanel from "@/features/improvements/ImprovementReviewPanel";
import BorrowHarnessCatalog from "@/features/harness/BorrowHarnessCatalog";
import HomeDashboardHero from "@/features/home/HomeDashboardHero";
import HomeOnboardingChecklist from "@/features/home/HomeOnboardingChecklist";
import HomePresencePanel from "@/features/home/HomePresencePanel";
import HomeSetupSection from "@/features/home/HomeSetupSection";
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
    <div className="grid grid-cols-1 gap-6 text-left lg:grid-cols-12 lg:items-start lg:gap-8">
      <aside className="order-2 space-y-6 lg:order-1 lg:col-span-3">
        <HomeOnboardingChecklist />
        <HomePresencePanel />
      </aside>

      <main className="order-1 space-y-6 lg:order-2 lg:col-span-6">
        <HomeDashboardHero user={user} />
        <MyOfferingsPanel />
        <TeamDirectoryPanel />
      </main>

      <aside className="order-3 space-y-6 lg:col-span-3">
        <FeedbackInboxPanel />
        <ImprovementReviewPanel />
        <BorrowHarnessCatalog />
        <HomeSetupSection />
      </aside>
    </div>
  );
}
