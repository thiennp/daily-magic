import type CapabilityTemplateUsageGuide from "@/lib/capabilities/templates/types/CapabilityTemplateUsageGuide.type";

const WRITER_LABELS: Record<
  CapabilityTemplateUsageGuide["supportedWriters"][number],
  string
> = {
  anthropic: "Anthropic (Claude)",
  openai: "OpenAI (Codex)",
  cursor: "Cursor",
  google: "Google (Antigravity)",
};

interface MarketplaceListingUsageGuideProps {
  readonly usageGuide: CapabilityTemplateUsageGuide;
}

export default function MarketplaceListingUsageGuide({
  usageGuide,
}: MarketplaceListingUsageGuideProps) {
  return (
    <div className="mt-4 space-y-3 border-t border-gray-200 pt-4 dark:border-gray-700">
      <h3 className="text-sm font-medium text-gray-800 dark:text-white/90">
        How to use
      </h3>
      <p className="text-sm text-gray-600 dark:text-gray-400">
        {usageGuide.summary}
      </p>
      {usageGuide.prerequisites.length > 0 ? (
        <div>
          <p className="text-xs font-medium text-gray-700 dark:text-gray-300">
            Before you start
          </p>
          <ul className="mt-1 list-disc space-y-1 pl-4 text-xs text-gray-600 dark:text-gray-400">
            {usageGuide.prerequisites.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      ) : null}
      <ol className="list-decimal space-y-2 pl-4 text-xs text-gray-600 dark:text-gray-400">
        {usageGuide.steps.map((step) => (
          <li key={step.title}>
            <span className="font-medium text-gray-700 dark:text-gray-300">
              {step.title}
            </span>
            {" — "}
            {step.body}
          </li>
        ))}
      </ol>
      <p className="text-xs text-gray-500 dark:text-gray-400">
        Writers:{" "}
        {usageGuide.supportedWriters
          .map((writer) => WRITER_LABELS[writer])
          .join(" · ")}
      </p>
    </div>
  );
}
