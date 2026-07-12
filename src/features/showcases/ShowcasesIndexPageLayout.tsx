import Link from "next/link";

import ShowcaseCard from "@/features/showcases/ShowcaseCard";
import {
  SHOWCASE_ARTICLES_PHASE_1,
  SHOWCASE_ARTICLES_PHASE_2,
  SHOWCASE_ARTICLES_PHASE_3,
} from "@/features/showcases/showcaseArticleRegistry";
import MarketingShell from "@/features/marketing/MarketingShell";
import MarketingSectionHeader from "@/features/marketing/MarketingSectionHeader";

export default function ShowcasesIndexPageLayout() {
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
          {SHOWCASE_ARTICLES_PHASE_1.map((article) => (
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
          {SHOWCASE_ARTICLES_PHASE_2.map((article) => (
            <ShowcaseCard key={article.slug} article={article} />
          ))}
        </div>
      </div>
      <div className="mt-14">
        <h2 className="text-lg font-semibold text-gray-900">For teams</h2>
        <p className="mt-2 max-w-2xl text-sm text-gray-600">
          Company workflows, approval, onboarding — with honest limits on admin
          and publishing tools today.
        </p>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {SHOWCASE_ARTICLES_PHASE_3.map((article) => (
            <ShowcaseCard key={article.slug} article={article} />
          ))}
        </div>
      </div>
      <p className="mt-10 text-center text-sm text-gray-600">
        Ready to try it?{" "}
        <Link href="/#get-started" className="font-medium text-brand-600">
          Get started free
        </Link>
      </p>
    </MarketingShell>
  );
}
