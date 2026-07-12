import Link from "next/link";

import MarketingSectionHeader from "@/features/marketing/MarketingSectionHeader";
import ShowcaseCard from "@/features/showcases/ShowcaseCard";
import {
  getHomeAllShowcaseSlugsForSeo,
  getHomeFeaturedShowcases,
  getHomeMoreShowcases,
  getHomeTeamsShowcases,
  SHOWCASE_ARTICLES,
} from "@/features/showcases/showcaseArticleRegistry";

export default function HomeMarketingShowcases() {
  const featured = getHomeFeaturedShowcases();
  const more = getHomeMoreShowcases();
  const teams = getHomeTeamsShowcases();
  const allForSchema = getHomeAllShowcaseSlugsForSeo();

  return (
    <section className="mt-20" aria-labelledby="showcases-heading">
      <MarketingSectionHeader
        eyebrow="New to AI agents?"
        title="Start here"
        description="You don't need another hype thread. Pick a short story, see what you need, try the demo."
      />
      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {featured.map((article) => (
          <ShowcaseCard
            key={article.slug}
            article={article}
            variant="featured"
          />
        ))}
      </div>
      <div className="mt-14">
        <MarketingSectionHeader
          title="More examples"
          description="Mobile, marketplace, and team workflows."
        />
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {more.map((article) => (
            <ShowcaseCard key={article.slug} article={article} />
          ))}
        </div>
      </div>
      <div className="mt-14">
        <MarketingSectionHeader
          eyebrow="For teams"
          title="Company & managers"
          description="One agent per employee, shared playbooks, approval before run."
        />
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {teams.map((article) => (
            <ShowcaseCard key={article.slug} article={article} />
          ))}
        </div>
      </div>
      <p className="mt-8 text-center">
        <Link
          href="/showcases"
          className="text-sm font-medium text-brand-600 hover:text-brand-700"
        >
          See all {SHOWCASE_ARTICLES.length} examples →
        </Link>
      </p>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "Agent Witch real examples",
            itemListElement: allForSchema.map((article, index) => ({
              "@type": "ListItem",
              position: index + 1,
              url: `https://agentwitch.com/showcases/${article.slug}`,
              name: article.title,
            })),
          }),
        }}
      />
    </section>
  );
}
