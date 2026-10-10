import { HOME_MARKETING_FAQ_COPY } from "@/features/home/constants/homeMarketingBotsFaqCopy.constant";
import {
  MARKETING_TEXT_SECONDARY_CLASSES,
  mergeMarketingClasses,
} from "@/features/marketing/public-api/types";
import { MarketingSectionHeader } from "@/features/marketing/public-api/presentation";

export default function HomeMarketingFaq() {
  const copy = HOME_MARKETING_FAQ_COPY;

  return (
    <section className="mt-16" id="faq" aria-labelledby="faq-heading">
      <MarketingSectionHeader title={copy.title} headingId="faq-heading" />
      <div className="mt-6 divide-y divide-awc-border rounded-xl border border-awc-border">
        {copy.items.map(([question, answer]) => (
          <details key={question} className="group p-4">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-sm font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-awc-blue-600/30">
              <span>{question}</span>
              <span
                aria-hidden="true"
                className="transition group-open:rotate-90"
              >
                ›
              </span>
            </summary>
            <p
              className={mergeMarketingClasses(
                "mt-3 text-sm leading-relaxed",
                MARKETING_TEXT_SECONDARY_CLASSES,
              )}
            >
              {answer}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}
