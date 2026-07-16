import type { ReactNode } from "react";

import MarketingSectionHeader from "@/features/marketing/MarketingSectionHeader";

interface HomeMarketingShowcaseSectionProps {
  readonly eyebrow?: string;
  readonly title: string;
  readonly description?: string;
  readonly children: ReactNode;
  readonly className?: string;
  readonly headingId?: string;
  readonly headerWidth?: "default" | "full";
}

function toHeadingId(title: string): string {
  return `${title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-heading`;
}

export default function HomeMarketingShowcaseSection({
  eyebrow,
  title,
  description,
  children,
  className = "mt-16",
  headingId,
  headerWidth = "default",
}: HomeMarketingShowcaseSectionProps) {
  const resolvedHeadingId = headingId ?? toHeadingId(title);

  return (
    <section className={className} aria-labelledby={resolvedHeadingId}>
      <MarketingSectionHeader
        eyebrow={eyebrow}
        title={title}
        description={description}
        headingId={resolvedHeadingId}
        width={headerWidth}
      />
      <div className="mt-10">{children}</div>
    </section>
  );
}
