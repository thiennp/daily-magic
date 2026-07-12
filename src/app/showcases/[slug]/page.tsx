import type { Metadata } from "next";
import { notFound } from "next/navigation";

import ShowcaseArticleLayout from "@/features/showcases/ShowcaseArticleLayout";
import { buildShowcaseArticleMetadata } from "@/features/showcases/buildShowcaseArticleMetadata";
import {
  SHOWCASE_ARTICLES,
  getShowcaseArticleBySlug,
} from "@/features/showcases/showcaseArticleRegistry";
import MarketingShell from "@/features/marketing/MarketingShell";

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

  return buildShowcaseArticleMetadata(article);
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
