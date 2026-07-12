import type ShowcaseArticle from "@/features/showcases/types/ShowcaseArticle.type";
import ShowcaseCard from "@/features/showcases/ShowcaseCard";

interface HomeMarketingFeaturedShowcasesProps {
  readonly articles: readonly ShowcaseArticle[];
}

export default function HomeMarketingFeaturedShowcases({
  articles,
}: HomeMarketingFeaturedShowcasesProps) {
  const [leadArticle, ...supportingArticles] = articles;

  if (leadArticle === undefined) {
    return null;
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2 lg:grid-rows-2">
      <ShowcaseCard
        article={leadArticle}
        variant="featured"
        className="lg:row-span-2"
      />
      {supportingArticles.map((article) => (
        <ShowcaseCard key={article.slug} article={article} variant="featured" />
      ))}
    </div>
  );
}
