import Link from "next/link";

import ShowcaseCard from "@/features/showcases/ShowcaseCard";
import { SHOWCASE_ARTICLES } from "@/features/showcases/showcaseArticleRegistry";
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
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {SHOWCASE_ARTICLES.map((article) => (
          <ShowcaseCard key={article.slug} article={article} />
        ))}
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
