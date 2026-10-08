import type { CompareCell } from "@/features/pricing/pricingCompare.constant";

interface PricingCompareCellProps {
  readonly value: CompareCell;
}

export default function PricingCompareCell({ value }: PricingCompareCellProps) {
  if (value === null || value === false) {
    return (
      <>
        <span className="text-awc-fg-subtle" aria-hidden="true">
          –
        </span>
        <span className="sr-only">Not included</span>
      </>
    );
  }
  if (value === true) {
    return (
      <span className="inline-flex items-center gap-1.5 font-semibold text-awc-ok">
        <svg
          width={16}
          height={16}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.9}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          focusable="false"
        >
          <path d="m5 12.5 4.5 4.5L19 7.5" />
        </svg>
        <span className="sr-only">Included</span>
      </span>
    );
  }
  return <span className="text-awc-fg">{value}</span>;
}
