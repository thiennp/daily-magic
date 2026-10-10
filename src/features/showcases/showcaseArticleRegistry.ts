import { agentDelegatesInsideYourCompany } from "@/features/showcases/articles/public-api/types";
import { automateRecurringWorkWithoutHeadcount } from "@/features/showcases/articles/public-api/types";
import { botToBot } from "@/features/showcases/articles/public-api/types";
import { automateForYourselfOrYourTeam } from "@/features/showcases/articles/public-api/types";
import { companyOnboardIn30Minutes } from "@/features/showcases/articles/public-api/types";
import { companyWorkflowsSetupOnce } from "@/features/showcases/articles/public-api/types";
import { controlMacFromPhone } from "@/features/showcases/articles/public-api/types";
import { findBestPromptInCompany } from "@/features/showcases/articles/public-api/types";
import { firstAgentTaskIn5Minutes } from "@/features/showcases/articles/public-api/types";
import { fromMyPromptToOurWorkflow } from "@/features/showcases/articles/public-api/types";
import { humanCheckpointsBeforeMacRuns } from "@/features/showcases/articles/public-api/types";
import { manageCompanyAgents } from "@/features/showcases/articles/public-api/types";
import { managerApprovesBeforeRun } from "@/features/showcases/articles/public-api/types";
import { newHiresCompanyPlaybooks } from "@/features/showcases/articles/public-api/types";
import { notASlackReplacement } from "@/features/showcases/articles/public-api/types";
import { notJustAnotherChatgpt } from "@/features/showcases/articles/public-api/types";
import { promptOptimizerInTheProject } from "@/features/showcases/articles/public-api/types";
import { onboardIn15Minutes } from "@/features/showcases/articles/public-api/types";
import { oneEmployeeOneAgent } from "@/features/showcases/articles/public-api/types";
import { phoneAsksCoworkerMacRuns } from "@/features/showcases/articles/public-api/types";
import { requestSensitiveWorkWithApproval } from "@/features/showcases/articles/public-api/types";
import { runAgainWithoutRetyping } from "@/features/showcases/articles/public-api/types";
import { saveTeammateWorkflowOneTap } from "@/features/showcases/articles/public-api/types";
import { scheduleWorkflowOnYourMac } from "@/features/showcases/articles/public-api/types";
import { seeWhatTheAgentDid } from "@/features/showcases/articles/public-api/types";
import { standardizeAiWorkAcrossTheTeam } from "@/features/showcases/articles/public-api/types";
import { standupFromLocalBranch } from "@/features/showcases/articles/public-api/types";
import { stopCopyPasteEveryMonday } from "@/features/showcases/articles/public-api/types";
import { stopMemorizingPrompts } from "@/features/showcases/articles/public-api/types";
import { weeklyReportInFiveMinutes } from "@/features/showcases/articles/public-api/types";
import { whatIsAnAiAgentSimple } from "@/features/showcases/articles/public-api/types";
import { whatPhoneCanDoAlone } from "@/features/showcases/articles/public-api/types";
import { whenExecutorMacIsOffline } from "@/features/showcases/articles/public-api/types";
import { whereToStartWithAiAgents } from "@/features/showcases/articles/public-api/types";
import { whyLocalMacNotCloud } from "@/features/showcases/articles/public-api/types";
import { worksWithoutN8n } from "@/features/showcases/articles/public-api/types";
import { E2E_SHOWCASE_ARTICLES } from "@/features/showcases/e2eShowcaseArticleRegistry";
import { enrichShowcaseArticleWithImages } from "@/features/showcases/enrichShowcaseArticleWithImages";
import type ShowcaseArticle from "@/features/showcases/types/ShowcaseArticle.type";

export const SHOWCASE_ARTICLES_PHASE_1: readonly ShowcaseArticle[] = [
  automateForYourselfOrYourTeam,
  onboardIn15Minutes,
  whereToStartWithAiAgents,
  firstAgentTaskIn5Minutes,
  stopMemorizingPrompts,
  whatIsAnAiAgentSimple,
  runAgainWithoutRetyping,
  seeWhatTheAgentDid,
] as const;

export const SHOWCASE_ARTICLES_PHASE_2: readonly ShowcaseArticle[] = [
  standupFromLocalBranch,
  controlMacFromPhone,
  findBestPromptInCompany,
  saveTeammateWorkflowOneTap,
  stopCopyPasteEveryMonday,
  weeklyReportInFiveMinutes,
  scheduleWorkflowOnYourMac,
  phoneAsksCoworkerMacRuns,
  agentDelegatesInsideYourCompany,
  botToBot,
] as const;

export const SHOWCASE_ARTICLES_PHASE_LEADERSHIP: readonly ShowcaseArticle[] = [
  automateRecurringWorkWithoutHeadcount,
  standardizeAiWorkAcrossTheTeam,
] as const;

export const SHOWCASE_ARTICLES_PHASE_3: readonly ShowcaseArticle[] = [
  companyOnboardIn30Minutes,
  requestSensitiveWorkWithApproval,
  oneEmployeeOneAgent,
  companyWorkflowsSetupOnce,
  humanCheckpointsBeforeMacRuns,
  manageCompanyAgents,
  managerApprovesBeforeRun,
  fromMyPromptToOurWorkflow,
  newHiresCompanyPlaybooks,
] as const;

export const SHOWCASE_ARTICLES_PHASE_4: readonly ShowcaseArticle[] = [
  notASlackReplacement,
  worksWithoutN8n,
  notJustAnotherChatgpt,
  promptOptimizerInTheProject,
  whatPhoneCanDoAlone,
  whenExecutorMacIsOffline,
  whyLocalMacNotCloud,
] as const;

export const SHOWCASE_ARTICLES: readonly ShowcaseArticle[] = [
  ...SHOWCASE_ARTICLES_PHASE_1,
  ...SHOWCASE_ARTICLES_PHASE_2,
  ...SHOWCASE_ARTICLES_PHASE_LEADERSHIP,
  ...SHOWCASE_ARTICLES_PHASE_3,
  ...SHOWCASE_ARTICLES_PHASE_4,
  ...E2E_SHOWCASE_ARTICLES,
] as const;

export function getShowcaseArticleBySlug(
  slug: string,
): ShowcaseArticle | undefined {
  const article = SHOWCASE_ARTICLES.find((entry) => entry.slug === slug);

  if (!article) {
    return undefined;
  }

  return enrichShowcaseArticleWithImages(article);
}
