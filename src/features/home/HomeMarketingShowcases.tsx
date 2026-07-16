import Link from "next/link";

import HomeMarketingFeaturedShowcases from "@/features/home/components/HomeMarketingFeaturedShowcases";
import HomeMarketingShowcaseSection from "@/features/home/components/HomeMarketingShowcaseSection";
import HomeMarketingTeamsShowcases from "@/features/home/components/HomeMarketingTeamsShowcases";
import { buildHomeShowcaseSchemaJson } from "@/features/home/utils/buildHomeShowcaseSchemaJson";
import { MARKETING_TEXT_LINK_CLASSES } from "@/features/marketing/marketingInteractiveClasses.constant";
import ShowcaseCard from "@/features/showcases/ShowcaseCard";
import {
  getHomeAllShowcaseSlugsForSeo,
  getHomeFeaturedShowcases,
  getHomeMoreShowcases,
  getHomeObjectionsShowcases,
  getHomeTeamsShowcases,
} from "@/features/showcases/showcaseArticleRegistry";

export default function HomeMarketingShowcases() {
  const featured = getHomeFeaturedShowcases();
  const more = getHomeMoreShowcases();
  const teams = getHomeTeamsShowcases();
  const objections = getHomeObjectionsShowcases();
  const allForSchema = getHomeAllShowcaseSlugsForSeo();

  return (
    <section className="mt-24" aria-labelledby="showcases-heading">
      <HomeMarketingShowcaseSection
        className="mt-0"
        eyebrow="New to AI agents?"
        title="Start here"
        description="Pick a short story with sample screenshots—presets, automations, Mac setup, and team workflows."
        headingId="showcases-heading"
      >
        <HomeMarketingFeaturedShowcases articles={featured} />
      </HomeMarketingShowcaseSection>

      <HomeMarketingShowcaseSection
        title="More examples"
        description="Schedules, human checkpoints, standup from your Mac, and team workflows."
      >
        <div className="grid gap-6 md:grid-cols-3">
          {more.map((article) => (
            <ShowcaseCard key={article.slug} article={article} />
          ))}
        </div>
      </HomeMarketingShowcaseSection>

      <HomeMarketingShowcaseSection
        eyebrow="For teams"
        title="Company & managers"
        description="One agent per employee, shared playbooks, approval before run."
      >
        <HomeMarketingTeamsShowcases articles={teams} />
      </HomeMarketingShowcaseSection>

      <HomeMarketingShowcaseSection
        eyebrow="Straight answers"
        title="Common questions"
        description="Not Slack, not n8n, not just chat — what Agent Witch actually is."
      >
        <div className="grid gap-6 md:grid-cols-3">
          {objections.map((article) => (
            <ShowcaseCard key={article.slug} article={article} />
          ))}
        </div>
      </HomeMarketingShowcaseSection>

      <p className="mt-10 text-center">
        <Link href="/showcases" className={MARKETING_TEXT_LINK_CLASSES}>
          See all
        </Link>
      </p>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: buildHomeShowcaseSchemaJson(allForSchema),
        }}
      />
    </section>
  );
}
