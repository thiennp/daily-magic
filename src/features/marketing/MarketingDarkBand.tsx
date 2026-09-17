import {
  MARKETING_DARK_SECTION_CLASSES,
  MARKETING_DARK_SECTION_MUTED_TEXT_CLASSES,
  MARKETING_EYEBROW_CLASSES,
} from "@/features/marketing/marketingDesignSystem.constant";
import { mergeMarketingClasses } from "@/features/marketing/mergeMarketingClasses";

interface MarketingDarkBandProps {
  readonly eyebrow: string;
  readonly title: string;
  readonly description: string;
}

export default function MarketingDarkBand({
  eyebrow,
  title,
  description,
}: MarketingDarkBandProps) {
  return (
    <div
      className={mergeMarketingClasses(
        MARKETING_DARK_SECTION_CLASSES,
        "mt-10 rounded-2xl px-6 py-10 sm:px-10 sm:py-12",
      )}
    >
      <p
        className={mergeMarketingClasses(
          MARKETING_EYEBROW_CLASSES,
          "text-brand-300",
        )}
      >
        {eyebrow}
      </p>
      <h3 className="mt-3 text-2xl font-bold tracking-[-0.02em] sm:text-3xl">
        {title}
      </h3>
      <p
        className={mergeMarketingClasses(
          "mt-4 max-w-2xl text-base leading-relaxed",
          MARKETING_DARK_SECTION_MUTED_TEXT_CLASSES,
        )}
      >
        {description}
      </p>
    </div>
  );
}
