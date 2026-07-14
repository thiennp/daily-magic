type TemplateTab = "workflow" | "agent";

interface CapabilityTemplateTabBarProps {
  readonly activeTab: TemplateTab;
  readonly onChange: (tab: TemplateTab) => void;
}

export default function CapabilityTemplateTabBar({
  activeTab,
  onChange,
}: CapabilityTemplateTabBarProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {(["workflow", "agent"] as const).map((tab) => (
        <button
          key={tab}
          type="button"
          onClick={() => {
            onChange(tab);
          }}
          className={
            activeTab === tab
              ? "rounded-lg bg-brand-50 px-3 py-1.5 text-sm font-medium text-brand-700 dark:bg-brand-950/30 dark:text-brand-300"
              : "rounded-lg px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-white/5"
          }
        >
          {tab === "workflow" ? "Workflows (20)" : "Agents (20)"}
        </button>
      ))}
    </div>
  );
}

export type { TemplateTab };
