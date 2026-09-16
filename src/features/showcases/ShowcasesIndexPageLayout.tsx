import Link from "next/link";

import {
  SHOWCASE_ARTICLES_PHASE_1,
  SHOWCASE_ARTICLES_PHASE_2,
  SHOWCASE_ARTICLES_PHASE_3,
  SHOWCASE_ARTICLES_PHASE_4,
  SHOWCASE_ARTICLES_PHASE_LEADERSHIP,
} from "@/features/showcases/showcaseArticleRegistry";
import { enrichShowcaseArticleWithImages } from "@/features/showcases/enrichShowcaseArticleWithImages";
import ShowcasesIndexSection from "@/features/showcases/ShowcasesIndexSection";
import type ShowcaseArticle from "@/features/showcases/types/ShowcaseArticle.type";
import { MARKETING_TEXT_LINK_CLASSES } from "@/features/marketing/marketingInteractiveClasses.constant";
import MarketingShell from "@/features/marketing/MarketingShell";
import MarketingSectionHeader from "@/features/marketing/MarketingSectionHeader";
import { MARKETING_TEXT_MUTED_CLASSES } from "@/features/marketing/marketingSurfaceClasses.constant";
import { mergeMarketingClasses } from "@/features/marketing/mergeMarketingClasses";

const phaseWithCovers = (
  articles: readonly ShowcaseArticle[],
): readonly ShowcaseArticle[] =>
  articles.map((article) => enrichShowcaseArticleWithImages(article));

export default function ShowcasesIndexPageLayout() {
  const startHere = phaseWithCovers(SHOWCASE_ARTICLES_PHASE_1);
  const moreExamples = phaseWithCovers(SHOWCASE_ARTICLES_PHASE_2);
  const leadership = phaseWithCovers(SHOWCASE_ARTICLES_PHASE_LEADERSHIP);
  const forTeams = phaseWithCovers(SHOWCASE_ARTICLES_PHASE_3);
  const questions = phaseWithCovers(SHOWCASE_ARTICLES_PHASE_4);
  return (
    <MarketingShell>
      <MarketingSectionHeader
        eyebrow="Real examples"
        title="See how teams use Agent Witch"
        description="Short stories — no jargon. Each article explains one problem, what you need, and what to try next."
      />
      <ShowcasesIndexSection title="Start here" articles={startHere} />
      <ShowcasesIndexSection
        title="More examples"
        description="Mobile, marketplace, workflows, and team dispatch."
        articles={moreExamples}
      />
      <ShowcasesIndexSection
        title="For leadership"
        description="Cost, automation, and governance—in language for CMOs and CEOs, not install docs."
        articles={leadership}
      />
      <ShowcasesIndexSection
        title="For teams"
        description="Company workflows, approval, and onboarding—seed the catalog, then invite the team."
        articles={forTeams}
      />
      <ShowcasesIndexSection
        title="Common questions"
        description="Slack, n8n, ChatGPT, mobile, and offline Macs — straight answers."
        articles={questions}
      />
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
