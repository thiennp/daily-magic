import type { Metadata } from "next";

import type ShowcaseArticle from "@/features/showcases/types/ShowcaseArticle.type";
import { AGENT_WITCH_PRODUCT_NAME } from "@/lib/agentWitch/agentWitchProductName.constant";

export function buildShowcaseArticleMetadata(
  article: ShowcaseArticle,
): Metadata {
  const pageTitle = `${article.title} | ${AGENT_WITCH_PRODUCT_NAME}`;

  return {
    title: pageTitle,
    description: article.subtitle,
    openGraph: {
      title: article.title,
      description: article.subtitle,
      type: "article",
    },
    twitter: {
      card: "summary",
      title: article.title,
      description: article.subtitle,
    },
  };
}
