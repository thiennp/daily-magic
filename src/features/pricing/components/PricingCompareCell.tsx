import type { CompareCell } from "@/features/pricing/pricingCompare.constant";

interface PricingCompareCellProps {
  readonly value: CompareCell;
}

export default function PricingCompareCell({ value }: PricingCompareCellProps) {
  if (value === null) {
    return <span className="text-gray-400">–</span>;
  }
  if (value === true) {
    return <span className="font-medium text-emerald-700">Included</span>;
  }
  if (value === false) {
    return <span className="text-gray-400">Not included</span>;
  }
  return <span className="text-gray-800">{value}</span>;
}
