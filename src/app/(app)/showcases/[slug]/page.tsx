import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { buildShowcaseArticleMetadata } from "@/features/showcases/public-api/infrastructure";
import { ShowcaseArticleLayout } from "@/features/showcases/public-api/presentation";
import {
  SHOWCASE_ARTICLES,
  getShowcaseArticleBySlug,
  isE2eShowcaseSlug,
} from "@/features/showcases/public-api/types";
import { MarketingShell } from "@/features/marketing/public-api/presentation";
import {
  isStaffPageViewer,
  requireStaffPageAccess,
} from "@/lib/auth/requireStaffPageAccess";

interface ShowcaseArticlePageProps {
  readonly params: Promise<{ readonly slug: string }>;
}

/** Auth gates for E2E slugs need request-time rendering (see SHOWCASES-015). */
export const dynamic = "force-dynamic";

export function generateStaticParams(): { readonly slug: string }[] {
  return SHOWCASE_ARTICLES.filter(
    (article) => !isE2eShowcaseSlug(article.slug),
  ).map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: ShowcaseArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getShowcaseArticleBySlug(slug);

  if (!article) {
    return { title: "Example not found" };
  }

  if (isE2eShowcaseSlug(slug)) {
    if (!(await isStaffPageViewer())) {
      return { title: "Example not found" };
    }
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

  if (isE2eShowcaseSlug(slug)) {
    await requireStaffPageAccess();
  }

  return (
    <MarketingShell>
      <ShowcaseArticleLayout article={article} />
    </MarketingShell>
  );
}
