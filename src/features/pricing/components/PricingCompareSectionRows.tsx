import InfoTip from "@/components/ui/infoTip/InfoTip";
import PricingCompareCell from "@/features/pricing/components/PricingCompareCell";
import type { PricingCompareSection } from "@/features/pricing/pricingCompare.constant";
import { PRICING_COMPARE_COLUMN_LABELS } from "@/features/pricing/pricingCompare.constant";

const CELL_CLASS =
  "px-4 py-3 align-top max-md:block max-md:border-0 max-md:py-1 max-md:before:mr-2.5 max-md:before:inline-block max-md:before:min-w-14 max-md:before:text-[13px] max-md:before:font-semibold max-md:before:text-awc-fg-muted max-md:before:content-[attr(data-label)]";

const PLAN_KEYS = ["trial", "pro", "team"] as const;

export default function PricingCompareSectionRows({
  heading,
  rows,
}: PricingCompareSection) {
  return (
    <>
      <tr className="bg-awc-tile max-md:block max-md:border-t max-md:border-awc-border">
        <th
          colSpan={4}
          scope="colgroup"
          className="px-4 py-2 text-left text-[13px] font-bold uppercase tracking-wide text-awc-blue-800 max-md:block"
        >
          {heading}
        </th>
      </tr>
      {rows.map((row) => (
        <tr
          key={row.feature}
          className="border-t border-awc-border max-md:block max-md:py-2.5"
        >
          <th
            scope="row"
            className="px-4 py-3 text-left align-top font-medium text-awc-fg max-md:block max-md:pb-1 max-md:pt-2 max-md:font-bold"
          >
            {row.feature}
            {row.tip ? (
              <>
                {" "}
                <InfoTip text={row.tip} label={`About ${row.feature}`} />
              </>
            ) : null}
          </th>
          {PLAN_KEYS.map((key) => (
            <td
              key={key}
              data-label={PRICING_COMPARE_COLUMN_LABELS[key].name}
              className={CELL_CLASS}
            >
              <PricingCompareCell value={row[key]} />
            </td>
          ))}
        </tr>
      ))}
    </>
  );
}
