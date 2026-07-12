import type { Metadata } from "next";
import { notFound } from "next/navigation";

import ShowcaseArticleLayout from "@/features/showcases/ShowcaseArticleLayout";
import {
  SHOWCASE_ARTICLES,
  getShowcaseArticleBySlug,
} from "@/features/showcases/showcaseArticleRegistry";
import MarketingShell from "@/features/marketing/MarketingShell";
import { AGENT_WITCH_PRODUCT_NAME } from "@/lib/agentWitch/agentWitchProductName.constant";

interface ShowcaseArticlePageProps {
  readonly params: Promise<{ readonly slug: string }>;
}

export function generateStaticParams(): { readonly slug: string }[] {
  return SHOWCASE_ARTICLES.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: ShowcaseArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getShowcaseArticleBySlug(slug);

  if (!article) {
    return { title: "Example not found" };
  }

  return {
    title: `${article.title} | ${AGENT_WITCH_PRODUCT_NAME}`,
    description: article.subtitle,
    openGraph: {
      title: article.title,
      description: article.subtitle,
      type: "article",
    },
  };
}

export default async function ShowcaseArticlePage({
  params,
}: ShowcaseArticlePageProps) {
  const { slug } = await params;
  const article = getShowcaseArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  return (
    <MarketingShell>
      <ShowcaseArticleLayout article={article} />
    </MarketingShell>
  );
}
