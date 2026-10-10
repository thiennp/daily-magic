import Link from "next/link";

import {
  SHOWCASE_ARTICLES_PHASE_1,
  SHOWCASE_ARTICLES_PHASE_2,
  SHOWCASE_ARTICLES_PHASE_3,
  SHOWCASE_ARTICLES_PHASE_4,
  SHOWCASE_ARTICLES_PHASE_LEADERSHIP,
} from "@/features/showcases/showcaseArticleRegistry";
import { enrichShowcaseArticleWithImages } from "@/features/showcases/enrichShowcaseArticleWithImages";
import type { ShowcaseGroup } from "@/features/showcases/filterShowcaseGroups";
import ShowcasesBrowser from "@/features/showcases/ShowcasesBrowser";
import ShowcasesHero from "@/features/showcases/ShowcasesHero";
import type ShowcaseArticle from "@/features/showcases/types/ShowcaseArticle.type";
import {
  MARKETING_TEXT_LINK_CLASSES,
  MARKETING_TEXT_MUTED_CLASSES,
  mergeMarketingClasses,
} from "@/features/marketing/public-api/types";
import { MarketingShell } from "@/features/marketing/public-api/presentation";

const phaseWithCovers = (
  articles: readonly ShowcaseArticle[],
): readonly ShowcaseArticle[] =>
  articles.map((article) => enrichShowcaseArticleWithImages(article));

export default function ShowcasesIndexPageLayout() {
  const groups: readonly ShowcaseGroup[] = [
    {
      id: "start",
      title: "Start here",
      articles: phaseWithCovers(SHOWCASE_ARTICLES_PHASE_1),
    },
    {
      id: "more",
      title: "More examples",
      description: "Mobile, marketplace, workflows, and team dispatch.",
      articles: phaseWithCovers(SHOWCASE_ARTICLES_PHASE_2),
    },
    {
      id: "leadership",
      title: "For leadership",
      description:
        "Cost, automation, and governance—in language for CMOs and CEOs, not install docs.",
      articles: phaseWithCovers(SHOWCASE_ARTICLES_PHASE_LEADERSHIP),
    },
    {
      id: "teams",
      title: "For teams",
      description:
        "Company workflows, approval, and onboarding—seed the catalog, then invite the team.",
      articles: phaseWithCovers(SHOWCASE_ARTICLES_PHASE_3),
    },
    {
      id: "questions",
      title: "Common questions",
      description:
        "Slack, n8n, ChatGPT, mobile, and offline Macs — straight answers.",
      articles: phaseWithCovers(SHOWCASE_ARTICLES_PHASE_4),
    },
  ];
  return (
    <MarketingShell>
      <ShowcasesHero />
      <ShowcasesBrowser groups={groups} />
      <p
        className={mergeMarketingClasses(
          "mt-10 text-center text-sm",
          MARKETING_TEXT_MUTED_CLASSES,
        )}
      >
        Ready to try it?{" "}
        <Link href="/#get-started" className={MARKETING_TEXT_LINK_CLASSES}>
          Create free account
        </Link>
      </p>
    </MarketingShell>
  );
}
