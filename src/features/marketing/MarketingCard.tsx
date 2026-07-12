import type { ElementType, ReactNode } from "react";

import { MARKETING_CARD_INTERACTIVE_CLASSES } from "@/features/marketing/marketingInteractiveClasses.constant";
import { mergeMarketingClasses } from "@/features/marketing/mergeMarketingClasses";

interface MarketingCardProps {
  readonly children: ReactNode;
  readonly className?: string;
  readonly id?: string;
  readonly as?: "article" | "aside" | "section" | "div";
  readonly interactive?: boolean;
}

export default function MarketingCard({
  children,
  className = "",
  id,
  as: Component = "div",
  interactive = false,
}: MarketingCardProps) {
  const Tag = Component as ElementType;

  return (
    <Tag
      id={id}
      className={mergeMarketingClasses(
        "rounded-2xl border border-gray-200/80 bg-white/95 p-6 shadow-theme-sm ring-1 ring-gray-200/50 sm:p-8",
        interactive ? MARKETING_CARD_INTERACTIVE_CLASSES : "",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
