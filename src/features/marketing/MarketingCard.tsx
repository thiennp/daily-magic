import type { ReactNode } from "react";

interface MarketingCardProps {
  readonly children: ReactNode;
  readonly className?: string;
  readonly id?: string;
}

export default function MarketingCard({
  children,
  className = "",
  id,
}: MarketingCardProps) {
  return (
    <div
      id={id}
      className={`rounded-2xl border border-gray-200/80 bg-white p-6 shadow-theme-sm ring-1 ring-gray-200/50 sm:p-8 ${className}`}
    >
      {children}
    </div>
  );
}
