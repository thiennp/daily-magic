import AppPanel from "@/components/surfaces/AppPanel";
import AgentDispatchPolicyPanel from "@/features/dispatch/AgentDispatchPolicyPanel";
import HarnessWorkspace from "@/features/harness/HarnessWorkspace";
import LocalAgentSetupInstructions from "@/features/home/LocalAgentSetupInstructions";

export default function HomeSetupSection() {
  return (
    <AppPanel as="details" id="your-setup">
      <summary className="cursor-pointer text-lg font-semibold text-gray-800 dark:text-white/90">
        Your setup (Mac, rules, and sharing)
      </summary>
      <div className="mt-6 space-y-6">
        <AgentDispatchPolicyPanel />
        <HarnessWorkspace />
        <LocalAgentSetupInstructions />
      </div>
    </AppPanel>
  );
}
