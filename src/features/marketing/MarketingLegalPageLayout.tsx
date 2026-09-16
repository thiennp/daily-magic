import MarketingShell from "@/features/marketing/MarketingShell";
import {
  MARKETING_TEXT_PRIMARY_CLASSES,
  MARKETING_TEXT_SECONDARY_CLASSES,
  MARKETING_TEXT_MUTED_CLASSES,
} from "@/features/marketing/marketingSurfaceClasses.constant";
import { mergeMarketingClasses } from "@/features/marketing/mergeMarketingClasses";

interface MarketingLegalSection {
  readonly heading: string;
  readonly body: string;
}

interface MarketingLegalPageLayoutProps {
  readonly title: string;
  readonly lastUpdated: string;
  readonly intro: string;
  readonly sections: readonly MarketingLegalSection[];
}

export default function MarketingLegalPageLayout({
  title,
  lastUpdated,
  intro,
  sections,
}: MarketingLegalPageLayoutProps) {
  return (
    <MarketingShell>
      <article className="mx-auto max-w-2xl py-4">
        <h1
          className={mergeMarketingClasses(
            "text-3xl font-semibold tracking-tight",
            MARKETING_TEXT_PRIMARY_CLASSES,
          )}
        >
          {title}
        </h1>
        <p
          className={mergeMarketingClasses(
            "mt-2 text-sm",
            MARKETING_TEXT_MUTED_CLASSES,
          )}
        >
          Last updated: {lastUpdated}
        </p>
        <p
          className={mergeMarketingClasses(
            "mt-6 text-base leading-relaxed",
            MARKETING_TEXT_SECONDARY_CLASSES,
          )}
        >
          {intro}
        </p>
        <div className="mt-10 space-y-8">
          {sections.map((section) => (
            <section key={section.heading}>
              <h2
                className={mergeMarketingClasses(
                  "text-lg font-semibold",
                  MARKETING_TEXT_PRIMARY_CLASSES,
                )}
              >
                {section.heading}
              </h2>
              <p
                className={mergeMarketingClasses(
                  "mt-2 text-sm leading-relaxed",
                  MARKETING_TEXT_SECONDARY_CLASSES,
                )}
              >
                {section.body}
              </p>
            </section>
          ))}
        </div>
      </article>
    </MarketingShell>
  );
}
