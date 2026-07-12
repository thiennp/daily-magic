import companyWorkflowsSetupOnce from "@/features/showcases/articles/companyWorkflowsSetupOnce.article";
import controlMacFromPhone from "@/features/showcases/articles/controlMacFromPhone.article";
import findBestPromptInCompany from "@/features/showcases/articles/findBestPromptInCompany.article";
import firstAgentTaskIn5Minutes from "@/features/showcases/articles/firstAgentTaskIn5Minutes.article";
import fromMyPromptToOurWorkflow from "@/features/showcases/articles/fromMyPromptToOurWorkflow.article";
import manageCompanyAgents from "@/features/showcases/articles/manageCompanyAgents.article";
import managerApprovesBeforeRun from "@/features/showcases/articles/managerApprovesBeforeRun.article";
import newHiresCompanyPlaybooks from "@/features/showcases/articles/newHiresCompanyPlaybooks.article";
import oneEmployeeOneAgent from "@/features/showcases/articles/oneEmployeeOneAgent.article";
import phoneAsksCoworkerMacRuns from "@/features/showcases/articles/phoneAsksCoworkerMacRuns.article";
import runAgainWithoutRetyping from "@/features/showcases/articles/runAgainWithoutRetyping.article";
import saveTeammateWorkflowOneTap from "@/features/showcases/articles/saveTeammateWorkflowOneTap.article";
import seeWhatTheAgentDid from "@/features/showcases/articles/seeWhatTheAgentDid.article";
import stopCopyPasteEveryMonday from "@/features/showcases/articles/stopCopyPasteEveryMonday.article";
import stopMemorizingPrompts from "@/features/showcases/articles/stopMemorizingPrompts.article";
import weeklyReportInFiveMinutes from "@/features/showcases/articles/weeklyReportInFiveMinutes.article";
import whatIsAnAiAgentSimple from "@/features/showcases/articles/whatIsAnAiAgentSimple.article";
import whereToStartWithAiAgents from "@/features/showcases/articles/whereToStartWithAiAgents.article";
import type ShowcaseArticle from "@/features/showcases/types/ShowcaseArticle.type";

export const SHOWCASE_ARTICLES_PHASE_1: readonly ShowcaseArticle[] = [
  whereToStartWithAiAgents,
  firstAgentTaskIn5Minutes,
  stopMemorizingPrompts,
  whatIsAnAiAgentSimple,
  runAgainWithoutRetyping,
  seeWhatTheAgentDid,
] as const;

export const SHOWCASE_ARTICLES_PHASE_2: readonly ShowcaseArticle[] = [
  controlMacFromPhone,
  findBestPromptInCompany,
  saveTeammateWorkflowOneTap,
  stopCopyPasteEveryMonday,
  weeklyReportInFiveMinutes,
  phoneAsksCoworkerMacRuns,
] as const;

export const SHOWCASE_ARTICLES_PHASE_3: readonly ShowcaseArticle[] = [
  oneEmployeeOneAgent,
  companyWorkflowsSetupOnce,
  manageCompanyAgents,
  managerApprovesBeforeRun,
  fromMyPromptToOurWorkflow,
  newHiresCompanyPlaybooks,
] as const;

export const SHOWCASE_ARTICLES: readonly ShowcaseArticle[] = [
  ...SHOWCASE_ARTICLES_PHASE_1,
  ...SHOWCASE_ARTICLES_PHASE_2,
  ...SHOWCASE_ARTICLES_PHASE_3,
] as const;

export const HOME_FEATURED_SHOWCASE_SLUGS: readonly string[] = [
  whereToStartWithAiAgents.slug,
  firstAgentTaskIn5Minutes.slug,
  stopMemorizingPrompts.slug,
] as const;

export const HOME_MORE_SHOWCASE_SLUGS: readonly string[] = [
  saveTeammateWorkflowOneTap.slug,
  controlMacFromPhone.slug,
  weeklyReportInFiveMinutes.slug,
] as const;

export const HOME_TEAMS_SHOWCASE_SLUGS: readonly string[] = [
  oneEmployeeOneAgent.slug,
  managerApprovesBeforeRun.slug,
  newHiresCompanyPlaybooks.slug,
] as const;

export function getShowcaseArticleBySlug(
  slug: string,
): ShowcaseArticle | undefined {
  return SHOWCASE_ARTICLES.find((article) => article.slug === slug);
}

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

export function getHomeTeamsShowcases(): readonly ShowcaseArticle[] {
  return resolveShowcasesBySlugs(HOME_TEAMS_SHOWCASE_SLUGS);
}

export function getHomeAllShowcaseSlugsForSeo(): readonly ShowcaseArticle[] {
  return [
    ...getHomeFeaturedShowcases(),
    ...getHomeMoreShowcases(),
    ...getHomeTeamsShowcases(),
  ];
}
