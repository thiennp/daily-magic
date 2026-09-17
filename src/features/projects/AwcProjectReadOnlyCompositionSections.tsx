interface AwcProjectReadOnlyCompositionSectionsProps {
  readonly deviceDisplayName: string;
}

const SECTIONS = ["Harness", "Workflows", "Agents"] as const;

export default function AwcProjectReadOnlyCompositionSections({
  deviceDisplayName,
}: AwcProjectReadOnlyCompositionSectionsProps) {
  return (
    <section className="mt-6 space-y-2">
      {SECTIONS.map((title) => (
        <div key={title}>
          <h3 className="text-sm font-medium text-gray-800 dark:text-white/90">
            {title}
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            View-only here — edit on {deviceDisplayName}.
          </p>
        </div>
      ))}
    </section>
  );
}
