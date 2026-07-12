import Link from "next/link";
import type { ReactNode } from "react";

import {
  MARKETING_CTA_PRIMARY_CLASSES,
  MARKETING_CTA_SECONDARY_CLASSES,
} from "@/features/marketing/marketingInteractiveClasses.constant";
import { mergeMarketingClasses } from "@/features/marketing/mergeMarketingClasses";

interface MarketingCtaLinkProps {
  readonly href: string;
  readonly children: ReactNode;
  readonly variant?: "primary" | "secondary";
  readonly className?: string;
}

export default function MarketingCtaLink({
  href,
  children,
  variant = "primary",
  className,
}: MarketingCtaLinkProps) {
  const variantClasses =
    variant === "primary"
      ? MARKETING_CTA_PRIMARY_CLASSES
      : MARKETING_CTA_SECONDARY_CLASSES;

  return (
    <Link
      href={href}
      className={mergeMarketingClasses(variantClasses, className)}
    >
      {children}
    </Link>
  );
}
