import ShowcaseCard from "@/features/showcases/ShowcaseCard";
import type ShowcaseArticle from "@/features/showcases/types/ShowcaseArticle.type";
import {
  MARKETING_TEXT_PRIMARY_CLASSES,
  MARKETING_TEXT_SECONDARY_CLASSES,
} from "@/features/marketing/marketingSurfaceClasses.constant";
import { mergeMarketingClasses } from "@/features/marketing/mergeMarketingClasses";

interface ShowcasesIndexSectionProps {
  readonly title: string;
  readonly description?: string;
  readonly articles: readonly ShowcaseArticle[];
}

export default function ShowcasesIndexSection({
  title,
  description,
  articles,
}: ShowcasesIndexSectionProps) {
  return (
    <div className="mt-14 first:mt-12">
      <h2
        className={mergeMarketingClasses(
          "text-lg font-semibold",
          MARKETING_TEXT_PRIMARY_CLASSES,
        )}
      >
        {title}
      </h2>
      {description !== undefined ? (
        <p
          className={mergeMarketingClasses(
            "mt-2 max-w-2xl text-sm",
            MARKETING_TEXT_SECONDARY_CLASSES,
          )}
        >
          {description}
        </p>
      ) : null}
      <div className="mt-6 grid gap-6 md:grid-cols-2">
        {articles.map((article) => (
          <ShowcaseCard key={article.slug} article={article} />
        ))}
      </div>
    </div>
  );
}
