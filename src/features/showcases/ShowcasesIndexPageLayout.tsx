import Link from "next/link";

import ShowcaseCard from "@/features/showcases/ShowcaseCard";
import {
  SHOWCASE_ARTICLES_PHASE_1,
  SHOWCASE_ARTICLES_PHASE_2,
  SHOWCASE_ARTICLES_PHASE_3,
  SHOWCASE_ARTICLES_PHASE_4,
  SHOWCASE_ARTICLES_PHASE_LEADERSHIP,
} from "@/features/showcases/showcaseArticleRegistry";
import { enrichShowcaseArticleWithImages } from "@/features/showcases/enrichShowcaseArticleWithImages";
import { E2E_SHOWCASE_ARTICLES } from "@/features/showcases/e2eShowcaseArticleRegistry";
import type ShowcaseArticle from "@/features/showcases/types/ShowcaseArticle.type";
import { MARKETING_TEXT_LINK_CLASSES } from "@/features/marketing/marketingInteractiveClasses.constant";
import MarketingShell from "@/features/marketing/MarketingShell";
import MarketingSectionHeader from "@/features/marketing/MarketingSectionHeader";

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
  const e2eVerified = phaseWithCovers(E2E_SHOWCASE_ARTICLES);

  return (
    <MarketingShell>
      <MarketingSectionHeader
        eyebrow="Real examples"
        title="See how teams use Agent Witch"
        description="Short stories — no jargon. Each article explains one problem, what you need, and what to try next."
      />
      <div className="mt-12">
        <h2 className="text-lg font-semibold text-gray-900">Start here</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {startHere.map((article) => (
            <ShowcaseCard key={article.slug} article={article} />
          ))}
        </div>
      </div>
      <div className="mt-14">
        <h2 className="text-lg font-semibold text-gray-900">More examples</h2>
        <p className="mt-2 max-w-2xl text-sm text-gray-600">
          Mobile, marketplace, workflows, and team dispatch.
        </p>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {moreExamples.map((article) => (
            <ShowcaseCard key={article.slug} article={article} />
          ))}
        </div>
      </div>
      <div className="mt-14">
        <h2 className="text-lg font-semibold text-gray-900">For leadership</h2>
        <p className="mt-2 max-w-2xl text-sm text-gray-600">
          Cost, automation, and governance—in language for CMOs and CEOs, not
          install docs.
        </p>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {leadership.map((article) => (
            <ShowcaseCard key={article.slug} article={article} />
          ))}
        </div>
      </div>
      <div className="mt-14">
        <h2 className="text-lg font-semibold text-gray-900">For teams</h2>
        <p className="mt-2 max-w-2xl text-sm text-gray-600">
          Company workflows, approval, and onboarding—seed the catalog, then
          invite the team.
        </p>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {forTeams.map((article) => (
            <ShowcaseCard key={article.slug} article={article} />
          ))}
        </div>
      </div>
      <div className="mt-14">
        <h2 className="text-lg font-semibold text-gray-900">
          Common questions
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-gray-600">
          Slack, n8n, ChatGPT, mobile, and offline Macs — straight answers.
        </p>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {questions.map((article) => (
            <ShowcaseCard key={article.slug} article={article} />
          ))}
        </div>
      </div>
      <div className="mt-14">
        <h2 className="text-lg font-semibold text-gray-900">E2E verified</h2>
        <p className="mt-2 max-w-2xl text-sm text-gray-600">
          Screenshots from real product walks—so you can see the screens before
          you sign in.
        </p>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {e2eVerified.map((article) => (
            <ShowcaseCard key={article.slug} article={article} />
          ))}
        </div>
      </div>
      <p className="mt-10 text-center text-sm text-gray-600">
        Ready to try it?{" "}
        <Link href="/#get-started" className={MARKETING_TEXT_LINK_CLASSES}>
          Get started free
        </Link>
      </p>
    </MarketingShell>
  );
}
