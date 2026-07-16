import agentDelegatesInsideYourCompany from "@/features/showcases/articles/agentDelegatesInsideYourCompany.article";
import automateRecurringWorkWithoutHeadcount from "@/features/showcases/articles/automateRecurringWorkWithoutHeadcount.article";
import automateForYourselfOrYourTeam from "@/features/showcases/articles/automateForYourselfOrYourTeam.article";
import companyOnboardIn30Minutes from "@/features/showcases/articles/companyOnboardIn30Minutes.article";
import companyWorkflowsSetupOnce from "@/features/showcases/articles/companyWorkflowsSetupOnce.article";
import controlMacFromPhone from "@/features/showcases/articles/controlMacFromPhone.article";
import findBestPromptInCompany from "@/features/showcases/articles/findBestPromptInCompany.article";
import firstAgentTaskIn5Minutes from "@/features/showcases/articles/firstAgentTaskIn5Minutes.article";
import fromMyPromptToOurWorkflow from "@/features/showcases/articles/fromMyPromptToOurWorkflow.article";
import humanCheckpointsBeforeMacRuns from "@/features/showcases/articles/humanCheckpointsBeforeMacRuns.article";
import manageCompanyAgents from "@/features/showcases/articles/manageCompanyAgents.article";
import managerApprovesBeforeRun from "@/features/showcases/articles/managerApprovesBeforeRun.article";
import newHiresCompanyPlaybooks from "@/features/showcases/articles/newHiresCompanyPlaybooks.article";
import notASlackReplacement from "@/features/showcases/articles/notASlackReplacement.article";
import notJustAnotherChatgpt from "@/features/showcases/articles/notJustAnotherChatgpt.article";
import onboardIn15Minutes from "@/features/showcases/articles/onboardIn15Minutes.article";
import oneEmployeeOneAgent from "@/features/showcases/articles/oneEmployeeOneAgent.article";
import phoneAsksCoworkerMacRuns from "@/features/showcases/articles/phoneAsksCoworkerMacRuns.article";
import requestSensitiveWorkWithApproval from "@/features/showcases/articles/requestSensitiveWorkWithApproval.article";
import runAgainWithoutRetyping from "@/features/showcases/articles/runAgainWithoutRetyping.article";
import saveTeammateWorkflowOneTap from "@/features/showcases/articles/saveTeammateWorkflowOneTap.article";
import scheduleWorkflowOnYourMac from "@/features/showcases/articles/scheduleWorkflowOnYourMac.article";
import seeWhatTheAgentDid from "@/features/showcases/articles/seeWhatTheAgentDid.article";
import standardizeAiWorkAcrossTheTeam from "@/features/showcases/articles/standardizeAiWorkAcrossTheTeam.article";
import standupFromLocalBranch from "@/features/showcases/articles/standupFromLocalBranch.article";
import stopCopyPasteEveryMonday from "@/features/showcases/articles/stopCopyPasteEveryMonday.article";
import stopMemorizingPrompts from "@/features/showcases/articles/stopMemorizingPrompts.article";
import weeklyReportInFiveMinutes from "@/features/showcases/articles/weeklyReportInFiveMinutes.article";
import whatIsAnAiAgentSimple from "@/features/showcases/articles/whatIsAnAiAgentSimple.article";
import whatPhoneCanDoAlone from "@/features/showcases/articles/whatPhoneCanDoAlone.article";
import whenExecutorMacIsOffline from "@/features/showcases/articles/whenExecutorMacIsOffline.article";
import whereToStartWithAiAgents from "@/features/showcases/articles/whereToStartWithAiAgents.article";
import whyLocalMacNotCloud from "@/features/showcases/articles/whyLocalMacNotCloud.article";
import worksWithoutN8n from "@/features/showcases/articles/worksWithoutN8n.article";
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
