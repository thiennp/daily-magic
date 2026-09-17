import { MARKETING_SECTION_HEADING_CLASSES } from "@/features/marketing/marketingDesignSystem.constant";
import {
  MARKETING_EYEBROW_TEXT_CLASSES,
  MARKETING_TEXT_SECONDARY_CLASSES,
} from "@/features/marketing/marketingSurfaceClasses.constant";
import { mergeMarketingClasses } from "@/features/marketing/mergeMarketingClasses";

interface MarketingSectionHeaderProps {
  readonly eyebrow?: string;
  readonly title: string;
  readonly description?: string;
  readonly align?: "left" | "center";
  readonly width?: "default" | "full";
  readonly headingId?: string;
}

export default function MarketingSectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  width = "default",
  headingId,
}: MarketingSectionHeaderProps) {
  const alignment =
    align === "center"
      ? "mx-auto max-w-2xl text-center"
      : width === "full"
        ? "w-full"
        : "max-w-2xl";

  return (
    <header className={alignment}>
      {eyebrow !== undefined && eyebrow.length > 0 ? (
        <p
          className={mergeMarketingClasses(
            "text-sm font-medium uppercase tracking-wider",
            MARKETING_EYEBROW_TEXT_CLASSES,
          )}
        >
          {eyebrow}
        </p>
      ) : null}
      <h2
        id={headingId}
        className={mergeMarketingClasses(
          "mt-2 text-2xl sm:text-3xl",
          MARKETING_SECTION_HEADING_CLASSES,
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
