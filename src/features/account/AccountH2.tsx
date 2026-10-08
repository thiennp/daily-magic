import InfoTip from "@/components/ui/infoTip/InfoTip";
import { ACCOUNT_H2_CLASS } from "@/features/account/accountClasses.constant";

interface AccountH2Props {
  readonly id: string;
  readonly title: string;
  readonly tip?: string;
  readonly tipLabel?: string;
}

/** Section title with the design's (i) tip next to it. */
export default function AccountH2({
  id,
  title,
  tip,
  tipLabel,
}: AccountH2Props) {
  return (
    <h2 id={id} className={`${ACCOUNT_H2_CLASS} flex items-center gap-2`}>
      {title}
      {tip ? <InfoTip text={tip} label={tipLabel} /> : null}
    </h2>
  );
}
