import type { AgentRunPartialOutputSection } from "@/features/dispatch/utils/parseAgentRunPartialOutputSections";

interface AgentRunPartialOutputSectionViewProps {
  readonly section: AgentRunPartialOutputSection;
}

export default function AgentRunPartialOutputSectionView({
  section,
}: AgentRunPartialOutputSectionViewProps) {
  if (section.kind === "table") {
    return (
      <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
        <table className="min-w-full text-left text-xs">
          <thead className="bg-gray-100/80 dark:bg-gray-900/60">
            <tr>
              {section.table.headers.map((header) => (
                <th
                  key={header}
                  className="px-3 py-2 font-medium text-gray-700 dark:text-gray-200"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {section.table.rows.map((row, rowIndex) => (
              <tr
                key={`row-${rowIndex}`}
                className="border-t border-gray-200 dark:border-gray-700"
              >
                {row.map((cell, cellIndex) => (
                  <td
                    key={`${rowIndex}-${cellIndex}`}
                    className="px-3 py-2 align-top text-gray-700 dark:text-gray-300"
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  if (section.kind === "bullet-list") {
    return (
      <ul className="list-disc space-y-1 pl-5 text-xs text-gray-700 dark:text-gray-300">
        {section.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    );
  }

  if (section.kind === "callout") {
    return (
      <p className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-900 dark:border-amber-900/50 dark:bg-amber-950/30 dark:text-amber-100">
        {section.text}
      </p>
    );
  }

  return (
    <p className="text-xs whitespace-pre-wrap text-gray-700 dark:text-gray-300">
      {section.text}
    </p>
  );
}
