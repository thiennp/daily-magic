import firstAgentTaskIn5Minutes from "@/features/showcases/articles/firstAgentTaskIn5Minutes.article";
import runAgainWithoutRetyping from "@/features/showcases/articles/runAgainWithoutRetyping.article";
import seeWhatTheAgentDid from "@/features/showcases/articles/seeWhatTheAgentDid.article";
import stopMemorizingPrompts from "@/features/showcases/articles/stopMemorizingPrompts.article";
import whatIsAnAiAgentSimple from "@/features/showcases/articles/whatIsAnAiAgentSimple.article";
import whereToStartWithAiAgents from "@/features/showcases/articles/whereToStartWithAiAgents.article";
import type ShowcaseArticle from "@/features/showcases/types/ShowcaseArticle.type";

export const SHOWCASE_ARTICLES: readonly ShowcaseArticle[] = [
  whereToStartWithAiAgents,
  firstAgentTaskIn5Minutes,
  stopMemorizingPrompts,
  whatIsAnAiAgentSimple,
  runAgainWithoutRetyping,
  seeWhatTheAgentDid,
] as const;

export const HOME_FEATURED_SHOWCASE_SLUGS: readonly string[] = [
  whereToStartWithAiAgents.slug,
  firstAgentTaskIn5Minutes.slug,
  stopMemorizingPrompts.slug,
] as const;

export function getShowcaseArticleBySlug(
  slug: string,
): ShowcaseArticle | undefined {
  return SHOWCASE_ARTICLES.find((article) => article.slug === slug);
}

export function getHomeFeaturedShowcases(): readonly ShowcaseArticle[] {
  return HOME_FEATURED_SHOWCASE_SLUGS.flatMap((slug) => {
    const article = getShowcaseArticleBySlug(slug);
    return article ? [article] : [];
  });
}
