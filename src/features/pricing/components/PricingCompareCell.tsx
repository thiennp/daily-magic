import type { CompareCell } from "@/features/pricing/pricingCompare.constant";

interface PricingCompareCellProps {
  readonly value: CompareCell;
}

export default function PricingCompareCell({ value }: PricingCompareCellProps) {
  if (value === null) {
    return <span className="text-awc-fg-subtle">–</span>;
  }
  if (value === true) {
    return <span className="font-medium text-emerald-700">Included</span>;
  }
  if (value === false) {
    return <span className="text-awc-fg-subtle">Not included</span>;
  }
  return <span className="text-awc-fg">{value}</span>;
}
