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
              <figure className="overflow-hidden rounded-xl border border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-white/[0.03]">
                {/* eslint-disable-next-line @next/next/no-img-element -- public SVG sample UI assets */}
                <img
                  src={section.image.src}
                  alt={section.image.alt}
                  width={960}
                  height={560}
                  className="h-auto w-full"
                />
                <figcaption className="border-t border-gray-200 px-4 py-3 text-sm text-gray-600 dark:border-gray-800 dark:text-gray-400">
                  {section.image.caption}
                </figcaption>
              </figure>
            ) : null}
          </div>
        </section>
      ))}
    </div>
  );
}
