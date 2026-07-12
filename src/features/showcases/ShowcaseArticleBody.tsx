import type { ShowcaseArticleSection } from "@/features/showcases/types/ShowcaseArticle.type";

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
            section.heading ?? section.paragraphs?.[0] ?? section.bullets?.[0]
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
          </div>
        </section>
      ))}
    </div>
  );
}
