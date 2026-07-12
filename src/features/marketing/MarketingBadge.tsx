import type { ReactNode } from "react";

interface MarketingBadgeProps {
  readonly children: ReactNode;
}

export default function MarketingBadge({ children }: MarketingBadgeProps) {
  return (
    <span className="inline-flex items-center rounded-full bg-brand-500/[0.06] px-3 py-1.5 text-xs font-medium text-slate-600 transition duration-200 hover:-translate-y-px hover:bg-brand-500/10 hover:text-slate-700 motion-reduce:transition-none motion-reduce:hover:translate-y-0">
      {children}
    </span>
  );
}
