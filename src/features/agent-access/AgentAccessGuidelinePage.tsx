import type { ReactElement } from "react";

import { MARKETING_PAGE_BACKGROUND_CLASSES } from "@/features/marketing/marketingDesignSystem.constant";
import {
  MARKETING_LIGHT_SURFACE_CLASS,
  MARKETING_TEXT_PRIMARY_CLASSES,
  MARKETING_TEXT_SECONDARY_CLASSES,
} from "@/features/marketing/marketingSurfaceClasses.constant";
import { mergeMarketingClasses } from "@/features/marketing/mergeMarketingClasses";
import { buildAgentAccessGuideline } from "@/lib/agentAccess/buildAgentAccessGuideline";
import { buildAgentAccessLiveGuide } from "@/lib/agentAccess/buildAgentAccessLiveGuide";

export default function AgentAccessGuidelinePage(): ReactElement {
  const guideline = buildAgentAccessGuideline();
  const liveGuide = buildAgentAccessLiveGuide();

  return (
    <article
      className={`${MARKETING_LIGHT_SURFACE_CLASS} ${MARKETING_PAGE_BACKGROUND_CLASSES} min-h-screen px-6 py-10`}
    >
      <div className="mx-auto max-w-3xl">
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
        <section className="mt-12">
          <h2
            className={mergeMarketingClasses(
              "text-xl font-semibold tracking-tight",
              MARKETING_TEXT_PRIMARY_CLASSES,
            )}
          >
            Live tools
          </h2>
          <ul className="mt-4 space-y-3">
            {liveGuide.tools.map((tool) => (
              <li key={tool.name}>
                <p
                  className={mergeMarketingClasses(
                    "text-base leading-relaxed",
                    MARKETING_TEXT_SECONDARY_CLASSES,
                  )}
                >
                  {tool.name}. {tool.description}
                </p>
              </li>
            ))}
          </ul>
        </section>
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
      </div>
    </article>
  );
}
