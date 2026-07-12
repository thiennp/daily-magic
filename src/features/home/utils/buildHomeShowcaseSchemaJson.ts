import type ShowcaseArticle from "@/features/showcases/types/ShowcaseArticle.type";

export function buildHomeShowcaseSchemaJson(
  articles: readonly ShowcaseArticle[],
): string {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Agent Witch real examples",
    itemListElement: articles.map((article, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `https://agentwitch.com/showcases/${article.slug}`,
      name: article.title,
    })),
  });
}
