import { formatAgentRunEstimateComparison } from "@/features/reports/utils/formatAgentRunEstimateComparison";

export default function AgentRunEstimateComparison(input: {
  readonly estimateSeconds?: number | null;
  readonly actualSeconds?: number | null;
}) {
  const label = formatAgentRunEstimateComparison(input);
  if (label === null) {
    return null;
  }

  return (
    <p className="mt-3 text-sm text-awc-fg dark:text-gray-300">{label}</p>
  );
}
