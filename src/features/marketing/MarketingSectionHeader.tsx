import {
  MARKETING_TEXT_PRIMARY_CLASSES,
  MARKETING_TEXT_SECONDARY_CLASSES,
} from "@/features/marketing/marketingSurfaceClasses.constant";
import { mergeMarketingClasses } from "@/features/marketing/mergeMarketingClasses";

interface MarketingSectionHeaderProps {
  readonly eyebrow?: string;
  readonly title: string;
  readonly description?: string;
  readonly align?: "left" | "center";
  readonly headingId?: string;
}

export default function MarketingSectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  headingId,
}: MarketingSectionHeaderProps) {
  const alignment =
    align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl";

  return (
    <header className={alignment}>
      {eyebrow !== undefined && eyebrow.length > 0 ? (
        <p className="text-sm font-medium uppercase tracking-wider text-zinc-500">
          {eyebrow}
        </p>
      ) : null}
      <h2
        id={headingId}
        className={mergeMarketingClasses(
          "mt-2 text-2xl font-semibold tracking-[-0.02em] sm:text-3xl",
          MARKETING_TEXT_PRIMARY_CLASSES,
        )}
      >
        {title}
      </h2>
      {description !== undefined && description.length > 0 ? (
        <p
          className={mergeMarketingClasses(
            "mt-3 text-base leading-relaxed",
            MARKETING_TEXT_SECONDARY_CLASSES,
          )}
        >
          {description}
        </p>
      ) : null}
    </header>
  );
}
