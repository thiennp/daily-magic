import type { ShowcaseArticleSection } from "@/features/showcases/types/ShowcaseArticle.type";
import ShowcaseAutomationFigure from "@/features/showcases/ShowcaseAutomationFigure";
import ShowcaseOnboardingFigure from "@/features/showcases/ShowcaseOnboardingFigure";
import ShowcaseArticleFigure from "@/features/showcases/ShowcaseArticleFigure";
import ShowcaseTopicFigure from "@/features/showcases/ShowcaseTopicFigure";
import ShowcaseTeamDispatchFigure from "@/features/showcases/ShowcaseTeamDispatchFigure";

interface ShowcaseArticleBodyProps {
  readonly sections: readonly ShowcaseArticleSection[];
}

export default function ShowcaseArticleBody({
  sections,
}: ShowcaseArticleBodyProps) {
  return (
    <div className="space-y-8">
      {sections.map((section) => (
        <section
          key={
            section.heading ??
            section.paragraphs?.[0] ??
            section.bullets?.[0] ??
            section.image?.src
          }
        >
          {section.heading ? (
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white/90">
              {section.heading}
            </h2>
          ) : null}
          <div className={section.heading ? "mt-3 space-y-4" : "space-y-4"}>
            {section.paragraphs?.map((paragraph) => (
              <p
                key={paragraph}
                className="text-lg leading-relaxed text-gray-700 dark:text-gray-300"
              >
                {paragraph}
              </p>
            ))}
            {section.bullets ? (
              <ul className="list-disc space-y-2 pl-5 text-lg text-gray-700 dark:text-gray-300">
                {section.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            ) : null}
            {section.image ? (
              section.image.automationScreenId ? (
                <ShowcaseAutomationFigure
                  screenId={section.image.automationScreenId}
                  alt={section.image.alt}
                  caption={section.image.caption}
                />
              ) : section.image.screenId ? (
                <ShowcaseOnboardingFigure
                  screenId={section.image.screenId}
                  alt={section.image.alt}
                  caption={section.image.caption}
                />
              ) : section.image.topicScreenId ? (
                <ShowcaseTopicFigure
                  screenId={section.image.topicScreenId}
                  alt={section.image.alt}
                  caption={section.image.caption}
                />
              ) : section.image.teamDispatchScreenId ? (
                <ShowcaseTeamDispatchFigure
                  screenId={section.image.teamDispatchScreenId}
                  alt={section.image.alt}
                  caption={section.image.caption}
                />
              ) : (
                <ShowcaseArticleFigure
                  src={section.image.src}
                  alt={section.image.alt}
                  caption={section.image.caption}
                />
              )
            ) : null}
          </div>
        </section>
      ))}
    </div>
  );
}
