import type ProjectCompositionItem from "@/lib/projects/types/ProjectCompositionItem.type";

interface AwcProjectReadOnlyCompositionSectionsProps {
  readonly deviceDisplayName: string;
  readonly items: readonly ProjectCompositionItem[];
  readonly isLoading: boolean;
}

const SECTION_ORDER = ["harness", "workflow", "agent"] as const;

const SECTION_TITLES: Record<(typeof SECTION_ORDER)[number], string> = {
  harness: "Harness",
  workflow: "Workflows",
  agent: "Agents",
};

export default function AwcProjectReadOnlyCompositionSections({
  deviceDisplayName,
  items,
  isLoading,
}: AwcProjectReadOnlyCompositionSectionsProps) {
  return (
    <section className="mt-6 space-y-4">
      {SECTION_ORDER.map((kind) => {
        const sectionItems = items.filter((item) => item.kind === kind);

        return (
          <div key={kind}>
            <h3 className="text-sm font-medium text-gray-800 dark:text-white/90">
              {SECTION_TITLES[kind]}
            </h3>
            {isLoading ? (
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Loading…
              </p>
            ) : sectionItems.length === 0 ? (
              <p className="text-xs text-gray-500 dark:text-gray-400">
                None bound yet — edit on {deviceDisplayName}.
              </p>
            ) : (
              <ul className="mt-1 space-y-1 text-xs text-gray-700 dark:text-gray-200">
                {sectionItems.map((item) => (
                  <li key={item.id}>
                    {item.name}
                    {item.versionLabel !== null
                      ? ` · v${item.versionLabel}`
                      : ""}
                  </li>
                ))}
              </ul>
            )}
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              View-only here — edit on {deviceDisplayName}.
            </p>
          </div>
        );
      })}
    </section>
  );
}
