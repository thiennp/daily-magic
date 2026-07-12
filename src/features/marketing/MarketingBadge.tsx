import type { ReactNode } from "react";

interface MarketingBadgeProps {
  readonly children: ReactNode;
}

export default function MarketingBadge({ children }: MarketingBadgeProps) {
  return (
    <span className="inline-flex items-center rounded-full border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 shadow-theme-xs ring-1 ring-gray-200/60 transition duration-200 hover:-translate-y-px hover:border-brand-200 hover:shadow-theme-sm motion-reduce:transition-none motion-reduce:hover:translate-y-0">
      {children}
    </span>
  );
}
