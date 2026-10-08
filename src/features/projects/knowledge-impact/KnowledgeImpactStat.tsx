import InfoTip from "@/components/ui/infoTip/InfoTip";
import { MUTED_CLASS } from "@/features/projects/knowledge-impact/knowledgeImpactFormat";

export default function KnowledgeImpactStat(props: {
  readonly label: string;
  readonly value: string;
  readonly hint: string;
  /** Longer explanation shown in an (i) tip. */
  readonly tip?: string;
}) {
  return (
    <div className="rounded-lg border border-awc-border bg-awc-surface p-3">
      <p className={`${MUTED_CLASS} flex items-center gap-1.5`}>
        {props.label}
        {props.tip !== undefined ? (
          <InfoTip text={props.tip} label={`About ${props.label}`} />
        ) : null}
      </p>
      <p className="text-xl font-semibold text-awc-fg">{props.value}</p>
      <p className={MUTED_CLASS}>{props.hint}</p>
    </div>
  );
}
