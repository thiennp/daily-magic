import PricingCompareCell from "@/features/pricing/components/PricingCompareCell";
import {
  PRICING_COMPARE_COLUMN_LABELS,
  PRICING_COMPARE_SECTIONS,
} from "@/features/pricing/pricingCompare.constant";
import { PRICING_COMPARE_CAPTION } from "@/features/pricing/pricingCopy.constant";

export default function PricingCompareTable() {
  return (
    <section className="mt-16" aria-labelledby="pricing-compare-heading">
      <h2
        id="pricing-compare-heading"
        className="text-2xl font-bold tracking-[-0.02em] text-gray-900"
      >
        Compare plans
      </h2>
      <div className="mt-6 overflow-x-auto rounded-2xl border border-gray-200 bg-white shadow-sm">
        <table className="min-w-full border-collapse text-left text-sm">
          <caption className="sr-only">{PRICING_COMPARE_CAPTION}</caption>
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th scope="col" className="px-4 py-3 font-semibold text-gray-700">
                Feature
              </th>
              <th scope="col" className="px-4 py-3 font-semibold text-teal-800">
                {PRICING_COMPARE_COLUMN_LABELS.trial}
              </th>
              <th scope="col" className="px-4 py-3 font-semibold text-blue-800">
                {PRICING_COMPARE_COLUMN_LABELS.pro}
              </th>
              <th scope="col" className="px-4 py-3 font-semibold text-violet-800">
                {PRICING_COMPARE_COLUMN_LABELS.team}
              </th>
            </tr>
          </thead>
          <tbody>
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

function PricingCompareSectionRows({
  heading,
  rows,
}: {
  readonly heading: string;
  readonly rows: (typeof PRICING_COMPARE_SECTIONS)[number]["rows"];
}) {
  return (
    <>
      <tr className="bg-gray-50/80">
        <th
          colSpan={4}
          scope="colgroup"
          className="px-4 py-2 text-xs font-semibold uppercase tracking-wide text-gray-500"
        >
          {heading}
        </th>
      </tr>
      {rows.map((row) => (
        <tr key={row.feature} className="border-t border-gray-100">
          <th
            scope="row"
            className="px-4 py-3 font-medium text-gray-900"
            title={row.tip}
          >
            {row.feature}
            {row.tip ? (
              <span className="mt-0.5 block text-xs font-normal text-gray-500">
                {row.tip}
              </span>
            ) : null}
          </th>
          <td className="px-4 py-3">
            <PricingCompareCell value={row.trial} />
          </td>
          <td className="px-4 py-3">
            <PricingCompareCell value={row.pro} />
          </td>
          <td className="px-4 py-3">
            <PricingCompareCell value={row.team} />
          </td>
        </tr>
      ))}
    </>
  );
}
