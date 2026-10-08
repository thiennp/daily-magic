import { MUTED_CLASS } from "@/features/projects/knowledge-impact/knowledgeImpactFormat";

export default function KnowledgeImpactStat(props: {
  readonly label: string;
  readonly value: string;
  readonly hint: string;
}) {
  return (
    <div
      className="rounded-lg border border-gray-200 p-3 dark:border-gray-700"
      title={props.hint}
    >
      <p className={MUTED_CLASS}>{props.label}</p>
      <p className="text-xl font-semibold text-gray-900 dark:text-white">
        {props.value}
      </p>
      <p className={MUTED_CLASS}>{props.hint}</p>
    </div>
  );
}
