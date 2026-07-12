import MyOfferingsPanel from "@/features/capabilities/MyOfferingsPanel";
import TeamDirectoryPanel from "@/features/capabilities/TeamDirectoryPanel";
import AgentDispatchPolicyPanel from "@/features/dispatch/AgentDispatchPolicyPanel";
import BorrowHarnessCatalog from "@/features/harness/BorrowHarnessCatalog";
import HomeDashboardHero from "@/features/home/HomeDashboardHero";
import HomeOnboardingChecklist from "@/features/home/HomeOnboardingChecklist";
import LocalAgentSetupInstructions from "@/features/home/LocalAgentSetupInstructions";
import HarnessWorkspace from "@/features/harness/HarnessWorkspace";
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
    <div className="space-y-8 text-left">
      <HomeDashboardHero user={user} />
      <HomeOnboardingChecklist />
      <MyOfferingsPanel />
      <TeamDirectoryPanel />
      <BorrowHarnessCatalog />

      <details
        id="your-setup"
        className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]"
      >
        <summary className="cursor-pointer text-lg font-semibold text-gray-800 dark:text-white/90">
          Your setup (Mac, rules, and sharing)
        </summary>
        <div className="mt-6 space-y-6">
          <AgentDispatchPolicyPanel />
          <HarnessWorkspace />
          <LocalAgentSetupInstructions />
        </div>
      </details>
    </div>
  );
}
