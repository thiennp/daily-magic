import type ShowcaseArticle from "@/features/showcases/types/ShowcaseArticle.type";
import ShowcaseCard from "@/features/showcases/ShowcaseCard";

const MANAGER_APPROVAL_SPOTLIGHT_SLUG = "manager-approves-before-run";

interface HomeMarketingTeamsShowcasesProps {
  readonly articles: readonly ShowcaseArticle[];
}

export default function HomeMarketingTeamsShowcases({
  articles,
}: HomeMarketingTeamsShowcasesProps) {
  const spotlightArticle = articles.find(
    (article) => article.slug === MANAGER_APPROVAL_SPOTLIGHT_SLUG,
  );
  const gridArticles = articles.filter(
    (article) => article.slug !== MANAGER_APPROVAL_SPOTLIGHT_SLUG,
  );

  return (
    <div className="space-y-6">
      {spotlightArticle !== undefined ? (
        <ShowcaseCard article={spotlightArticle} variant="spotlight" />
      ) : null}
      <div className="grid gap-6 md:grid-cols-2">
        {gridArticles.map((article) => (
          <ShowcaseCard key={article.slug} article={article} />
        ))}
      </div>
    </div>
  );
}
