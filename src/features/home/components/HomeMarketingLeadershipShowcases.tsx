import type ShowcaseArticle from "@/features/showcases/types/ShowcaseArticle.type";
import ShowcaseCard from "@/features/showcases/ShowcaseCard";

interface HomeMarketingLeadershipShowcasesProps {
  readonly articles: readonly ShowcaseArticle[];
}

export default function HomeMarketingLeadershipShowcases({
  articles,
}: HomeMarketingLeadershipShowcasesProps) {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {articles.map((article) => (
        <ShowcaseCard key={article.slug} article={article} variant="featured" />
      ))}
    </div>
  );
}
