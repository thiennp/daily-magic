import { buildOnboardingSteps } from "@/features/home/utils/buildOnboardingSteps";
import { fetchOnboardingAutomationCreated } from "@/features/home/utils/onboardingAutomationCreatedApi";
import hasUserCreatedAutomation from "@/features/home/utils/hasUserCreatedAutomation";
import hasUserCreatedFirstWorkflowOrAgent from "@/features/home/utils/hasUserCreatedFirstWorkflowOrAgent";
import hasUserSentFirstTask from "@/features/home/utils/hasUserSentFirstTask";
import { fetchOnboardingFirstTaskSent } from "@/features/home/utils/onboardingFirstTaskSentApi";
import readOnboardingHasPairedDevice from "@/features/home/utils/readOnboardingHasPairedDevice";
import syncOnboardingAutomationCreatedFlag from "@/features/home/utils/syncOnboardingAutomationCreatedFlag";
import syncOnboardingFirstTaskSentFlag from "@/features/home/utils/syncOnboardingFirstTaskSentFlag";
import { listAgentRunsLocalCache } from "@/features/reports/agentRunLocalCache";

export type { OnboardingStep } from "@/features/home/utils/buildOnboardingSteps";

export async function loadOnboardingSteps() {
  const [
    hasPairedDevice,
    capabilitiesResponse,
    runsResponse,
    dbFirstTaskSent,
    automationsResponse,
    dbAutomationCreated,
  ] = await Promise.all([
    readOnboardingHasPairedDevice(),
    fetch("/api/capabilities/mine"),
    fetch("/api/agent-runs"),
    fetchOnboardingFirstTaskSent(),
    fetch("/api/automations"),
    fetchOnboardingAutomationCreated(),
  ]);

  syncOnboardingFirstTaskSentFlag(dbFirstTaskSent);
  syncOnboardingAutomationCreatedFlag(dbAutomationCreated);

  const capabilitiesData: unknown = capabilitiesResponse.ok
    ? await capabilitiesResponse.json()
    : null;
  const runsData: unknown = runsResponse.ok ? await runsResponse.json() : null;

  const capabilities =
    typeof capabilitiesData === "object" &&
    capabilitiesData !== null &&
    "capabilities" in capabilitiesData &&
    Array.isArray(
      (capabilitiesData as { capabilities: unknown[] }).capabilities,
    )
      ? (
          capabilitiesData as {
            capabilities: Array<{ type: string; name: string }>;
          }
        ).capabilities
      : [];

  const automationsData: unknown = automationsResponse.ok
    ? await automationsResponse.json()
    : null;

  return buildOnboardingSteps({
    hasPairedDevice,
    hasCreatedWorkflowOrAgent: hasUserCreatedFirstWorkflowOrAgent(capabilities),
    hasSentTask: hasUserSentFirstTask(
      typeof runsData === "object" &&
        runsData !== null &&
        "runs" in runsData &&
        Array.isArray((runsData as { runs: unknown[] }).runs)
        ? (runsData as { runs: unknown[] }).runs
        : null,
      listAgentRunsLocalCache().length,
      dbFirstTaskSent,
    ),
    hasScheduledAutomation: hasUserCreatedAutomation(
      automationsData,
      dbAutomationCreated,
    ),
  });
}
