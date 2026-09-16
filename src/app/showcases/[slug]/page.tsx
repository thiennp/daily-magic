import type { Metadata } from "next";
import { notFound } from "next/navigation";

import ShowcaseArticleLayout from "@/features/showcases/ShowcaseArticleLayout";
import { buildShowcaseArticleMetadata } from "@/features/showcases/buildShowcaseArticleMetadata";
import { isE2eShowcaseSlug } from "@/features/showcases/e2eShowcaseArticleRegistry";
import {
  SHOWCASE_ARTICLES,
  getShowcaseArticleBySlug,
} from "@/features/showcases/showcaseArticleRegistry";
import MarketingShell from "@/features/marketing/MarketingShell";
import { getAuthActor } from "@/lib/auth/auth";
import { isGlobalAdmin } from "@/lib/auth/globalRolePermissions";
import { requireStaffPageAccess } from "@/lib/auth/requireStaffPageAccess";

interface ShowcaseArticlePageProps {
  readonly params: Promise<{ readonly slug: string }>;
}

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
    const actor = await getAuthActor();
    if (!actor || !isGlobalAdmin(actor)) {
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
