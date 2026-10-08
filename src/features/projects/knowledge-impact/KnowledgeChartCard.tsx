import type { ReactNode } from "react";

import InfoTip from "@/components/ui/infoTip/InfoTip";
import { MUTED_CLASS } from "@/features/projects/knowledge-impact/knowledgeImpactFormat";
import { PROJECT_KNOWLEDGE_IMPACT_COPY as C } from "@/features/projects/knowledge-impact/projectKnowledgeImpactCopy.constant";

export type KnowledgeChartTable = {
  readonly headers: readonly string[];
  readonly rows: readonly (readonly (string | number)[])[];
};

/** Card shell for one chart: title, one-line description, (i) tip, empty state, hidden table. */
export default function KnowledgeChartCard(props: {
  readonly title: string;
  readonly description: string;
  readonly tip: string;
  readonly isEmpty: boolean;
  readonly table: KnowledgeChartTable;
  readonly footer?: string;
  readonly children: ReactNode;
}) {
  return (
    <figure className="m-0 flex min-w-0 flex-col gap-1 rounded-lg border border-awc-border bg-awc-surface p-3">
      <figcaption className="flex items-center gap-1.5 text-sm font-medium text-awc-fg">
        {props.title}
        <InfoTip text={props.tip} label={`About ${props.title}`} />
      </figcaption>
      <p className={MUTED_CLASS}>{props.description}</p>
      {props.isEmpty ? (
        <p className="py-6 text-center text-xs text-awc-fg-muted">
          {C["chart.empty"]}
        </p>
      ) : (
        <>
          {props.children}
          <table className="sr-only">
            <caption>{props.title}</caption>
            <thead>
              <tr>
                {props.table.headers.map((header) => (
                  <th key={header} scope="col">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {props.table.rows.map((row) => (
                <tr key={String(row[0])}>
                  {row.map((cell, index) => (
                    <td key={`${String(row[0])}-${index}`}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          {props.footer !== undefined ? (
            <p className={MUTED_CLASS}>{props.footer}</p>
          ) : null}
        </>
      )}
    </figure>
  );
}
