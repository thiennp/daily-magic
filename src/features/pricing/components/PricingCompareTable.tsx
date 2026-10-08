import PricingCompareSectionRows from "@/features/pricing/components/PricingCompareSectionRows";
import {
  PRICING_COMPARE_COLUMN_LABELS,
  PRICING_COMPARE_SECTIONS,
} from "@/features/pricing/pricingCompare.constant";
import { PRICING_COMPARE_CAPTION } from "@/features/pricing/pricingCopy.constant";

const PLAN_KEYS = ["trial", "pro", "team"] as const;

export default function PricingCompareTable() {
  return (
    <section className="mt-16" aria-labelledby="pricing-compare-heading">
      <h2
        id="pricing-compare-heading"
        className="text-2xl font-bold tracking-[-0.02em] text-awc-fg"
      >
        Compare plans
      </h2>
      <div className="mt-6 rounded-[14px] border border-awc-border bg-awc-surface shadow-sm">
        <table className="w-full table-fixed border-collapse text-left text-sm max-md:block">
          <caption className="sr-only">{PRICING_COMPARE_CAPTION}</caption>
          <thead className="max-md:sr-only">
            <tr className="bg-awc-surface-2">
              <th scope="col" className="w-[34%] px-4 py-3">
                <span className="sr-only">Feature</span>
              </th>
              {PLAN_KEYS.map((key) => (
                <th
                  key={key}
                  scope="col"
                  className="px-4 py-3 align-top font-semibold text-awc-fg"
                >
                  {PRICING_COMPARE_COLUMN_LABELS[key].name}
                  <span className="block text-[13px] font-normal text-awc-fg-muted">
                    {PRICING_COMPARE_COLUMN_LABELS[key].sub}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="max-md:block">
            {PRICING_COMPARE_SECTIONS.map((section) => (
              <PricingCompareSectionRows
                key={section.heading}
                heading={section.heading}
                rows={section.rows}
              />
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
