import type { ReactNode } from "react";

interface MarketingBadgeProps {
  readonly children: ReactNode;
}

export default function MarketingBadge({ children }: MarketingBadgeProps) {
  return (
    <span className="inline-flex items-center rounded-full bg-zinc-100 px-3 py-1.5 text-xs font-medium text-zinc-600">
      {children}
    </span>
  );
}
