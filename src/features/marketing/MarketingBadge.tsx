import type { ReactNode } from "react";

interface MarketingBadgeProps {
  readonly children: ReactNode;
}

export default function MarketingBadge({ children }: MarketingBadgeProps) {
  return (
    <span className="inline-flex items-center rounded-full border border-gray-200 bg-white px-3 py-1 text-xs font-medium text-gray-700 shadow-theme-xs ring-1 ring-gray-200/60">
      {children}
    </span>
  );
}
