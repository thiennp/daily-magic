type TemplateTab = "workflow" | "agent";

interface CapabilityTemplateTabBarProps {
  readonly activeTab: TemplateTab;
  readonly workflowCount: number;
  readonly agentCount: number;
  readonly onChange: (tab: TemplateTab) => void;
}

export default function CapabilityTemplateTabBar({
  activeTab,
  workflowCount,
  agentCount,
  onChange,
}: CapabilityTemplateTabBarProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        type="button"
        onClick={() => {
          onChange("workflow");
        }}
        className={
          activeTab === "workflow"
            ? "rounded-lg bg-brand-50 px-3 py-1.5 text-sm font-medium text-brand-700 dark:bg-brand-950/30 dark:text-brand-300"
            : "rounded-lg px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-white/5"
        }
      >
        Workflows ({workflowCount})
      </button>
      <button
        type="button"
        onClick={() => {
          onChange("agent");
        }}
        className={
          activeTab === "agent"
            ? "rounded-lg bg-brand-50 px-3 py-1.5 text-sm font-medium text-brand-700 dark:bg-brand-950/30 dark:text-brand-300"
            : "rounded-lg px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-white/5"
        }
      >
        Agents ({agentCount})
      </button>
    </div>
  );
}

export type { TemplateTab };
