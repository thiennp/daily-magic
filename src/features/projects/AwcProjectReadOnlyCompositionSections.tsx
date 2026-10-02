import AwcProjectDetailSection from "@/features/projects/AwcProjectDetailSection";
import type ProjectCompositionItem from "@/lib/projects/types/ProjectCompositionItem.type";

interface AwcProjectReadOnlyCompositionSectionsProps {
  readonly deviceDisplayName: string;
  readonly items: readonly ProjectCompositionItem[];
  readonly isLoading: boolean;
}

const SECTION_ORDER = ["harness", "workflow", "agent"] as const;

const SECTION_TITLES: Record<(typeof SECTION_ORDER)[number], string> = {
  harness: "Playbooks",
  workflow: "Workflows",
  agent: "Agents",
};

export default function AwcProjectReadOnlyCompositionSections({
  deviceDisplayName,
  items,
  isLoading,
}: AwcProjectReadOnlyCompositionSectionsProps) {
  return (
    <div className="space-y-3">
      {SECTION_ORDER.map((kind) => {
        const sectionItems = items.filter((item) => item.kind === kind);
        return (
          <AwcProjectDetailSection
            key={kind}
            title={SECTION_TITLES[kind]}
            hint={`View-only here — edit on ${deviceDisplayName}.`}
          >
            {isLoading ? (
              <p className="text-xs text-gray-500 dark:text-gray-400">Loading…</p>
            ) : sectionItems.length === 0 ? (
              <p className="text-xs text-gray-500 dark:text-gray-400">
                None bound yet — open Agent Witch Local on {deviceDisplayName}.
              </p>
            ) : (
              <ul className="space-y-1.5 text-sm text-gray-800 dark:text-gray-100">
                {sectionItems.map((item) => (
                  <li
                    key={item.id}
                    className="rounded-lg border border-gray-200/70 bg-white/70 px-3 py-1.5 dark:border-gray-800/70 dark:bg-white/[0.03]"
                  >
                    {item.name}
                    {item.versionLabel !== null
                      ? ` · v${item.versionLabel}`
                      : ""}
                  </li>
                ))}
              </ul>
            )}
          </AwcProjectDetailSection>
        );
      })}
    </div>
  );
}
