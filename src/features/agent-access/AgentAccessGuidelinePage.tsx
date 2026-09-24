import type { ReactElement } from "react";

import MarketingShell from "@/features/marketing/MarketingShell";
import {
  MARKETING_TEXT_PRIMARY_CLASSES,
  MARKETING_TEXT_SECONDARY_CLASSES,
} from "@/features/marketing/marketingSurfaceClasses.constant";
import { mergeMarketingClasses } from "@/features/marketing/mergeMarketingClasses";
import { buildAgentAccessGuideline } from "@/lib/agentAccess/buildAgentAccessGuideline";
import { resolveAppBaseUrl } from "@/lib/app/resolveAppBaseUrl";

export default function AgentAccessGuidelinePage(): ReactElement {
  const guideline = buildAgentAccessGuideline(resolveAppBaseUrl());

  return (
    <MarketingShell>
      <article className="mx-auto max-w-3xl py-2 sm:py-4">
        <h1
          className={mergeMarketingClasses(
            "text-3xl font-semibold tracking-tight sm:text-4xl",
            MARKETING_TEXT_PRIMARY_CLASSES,
          )}
        >
          {guideline.title}
        </h1>
        <p
          className={mergeMarketingClasses(
            "mt-6 text-base leading-relaxed",
            MARKETING_TEXT_SECONDARY_CLASSES,
          )}
        >
          {guideline.description}
        </p>
        <div className="mt-12 space-y-10">
          {guideline.sections.map((section) => (
            <section key={section.heading}>
              <h2
                className={mergeMarketingClasses(
                  "text-xl font-semibold tracking-tight",
                  MARKETING_TEXT_PRIMARY_CLASSES,
                )}
              >
                {section.heading}
              </h2>
              {section.body.map((paragraph) => (
                <p
                  key={paragraph}
                  className={mergeMarketingClasses(
                    "mt-3 text-base leading-relaxed",
                    MARKETING_TEXT_SECONDARY_CLASSES,
                  )}
                >
                  {paragraph}
                </p>
              ))}
            </section>
          ))}
        </div>
      </article>
    </MarketingShell>
  );
}
