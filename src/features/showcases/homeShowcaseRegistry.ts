import { getShowcaseArticleBySlug } from "@/features/showcases/showcaseArticleRegistry";
import type ShowcaseArticle from "@/features/showcases/types/ShowcaseArticle.type";

export const HOME_FEATURED_SHOWCASE_SLUGS: readonly string[] = [
  "automate-for-yourself-or-your-team",
  "onboard-in-15-minutes",
  "first-agent-task-in-5-minutes",
] as const;

export const HOME_LEADERSHIP_SHOWCASE_SLUGS: readonly string[] = [
  "automate-recurring-work-without-headcount",
  "standardize-ai-work-across-the-team",
  "manager-approves-before-run",
] as const;

export const HOME_MORE_SHOWCASE_SLUGS: readonly string[] = [
  "manager-approves-before-run",
  "schedule-workflow-on-your-mac",
  "human-checkpoints-before-mac-runs",
  "standup-from-local-branch",
] as const;

export const HOME_TEAMS_SHOWCASE_SLUGS: readonly string[] = [
  "automate-for-yourself-or-your-team",
  "company-onboard-in-30-minutes",
  "stop-copy-paste-every-monday",
] as const;

export const HOME_OBJECTIONS_SHOWCASE_SLUGS: readonly string[] = [
  "not-a-slack-replacement",
  "works-without-n8n",
  "why-local-mac-not-cloud",
] as const;

function resolveShowcasesBySlugs(
  slugs: readonly string[],
): readonly ShowcaseArticle[] {
  return slugs.flatMap((slug) => {
    const article = getShowcaseArticleBySlug(slug);
    return article ? [article] : [];
  });
}

export function getHomeFeaturedShowcases(): readonly ShowcaseArticle[] {
  return resolveShowcasesBySlugs(HOME_FEATURED_SHOWCASE_SLUGS);
}

export function getHomeMoreShowcases(): readonly ShowcaseArticle[] {
  return resolveShowcasesBySlugs(HOME_MORE_SHOWCASE_SLUGS);
}

export function getHomeLeadershipShowcases(): readonly ShowcaseArticle[] {
  return resolveShowcasesBySlugs(HOME_LEADERSHIP_SHOWCASE_SLUGS);
}

export function getHomeTeamsShowcases(): readonly ShowcaseArticle[] {
  return resolveShowcasesBySlugs(HOME_TEAMS_SHOWCASE_SLUGS);
}

export function getHomeObjectionsShowcases(): readonly ShowcaseArticle[] {
  return resolveShowcasesBySlugs(HOME_OBJECTIONS_SHOWCASE_SLUGS);
}

export function getHomeAllShowcaseSlugsForSeo(): readonly ShowcaseArticle[] {
  return [
    ...getHomeFeaturedShowcases(),
    ...getHomeMoreShowcases(),
    ...getHomeLeadershipShowcases(),
    ...getHomeTeamsShowcases(),
    ...getHomeObjectionsShowcases(),
  ];
}
