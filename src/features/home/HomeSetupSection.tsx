import AgentDispatchPolicyPanel from "@/features/dispatch/AgentDispatchPolicyPanel";
import HarnessWorkspace from "@/features/harness/HarnessWorkspace";
import LocalAgentSetupInstructions from "@/features/home/LocalAgentSetupInstructions";

export default function HomeSetupSection() {
  return (
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
  );
}
