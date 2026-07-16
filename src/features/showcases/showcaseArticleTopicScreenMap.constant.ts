import { SHOWCASE_TOPIC_SCREEN } from "@/features/showcases/showcaseTopicScreens.constant";
import type { ShowcaseTopicScreenId } from "@/features/showcases/showcaseTopicScreens.constant";

export const SHOWCASE_ARTICLE_TOPIC_SCREEN_BY_SLUG: Readonly<
  Record<string, ShowcaseTopicScreenId>
> = {
  "where-to-start-with-ai-agents": SHOWCASE_TOPIC_SCREEN.MARKETPLACE,
  "first-agent-task-in-5-minutes": SHOWCASE_TOPIC_SCREEN.SEND_TASK,
  "stop-memorizing-prompts": SHOWCASE_TOPIC_SCREEN.MARKETPLACE,
  "what-is-an-ai-agent-simple": SHOWCASE_TOPIC_SCREEN.CONCEPT,
  "run-again-without-retyping": SHOWCASE_TOPIC_SCREEN.JOB_HISTORY,
  "see-what-the-agent-did": SHOWCASE_TOPIC_SCREEN.JOB_HISTORY,
  "standup-from-local-branch": SHOWCASE_TOPIC_SCREEN.REPORTS,
  "control-mac-from-phone": SHOWCASE_TOPIC_SCREEN.MOBILE,
  "find-best-prompt-in-company": SHOWCASE_TOPIC_SCREEN.LIBRARY,
  "save-teammate-workflow-one-tap": SHOWCASE_TOPIC_SCREEN.LIBRARY,
  "stop-copy-paste-every-monday": SHOWCASE_TOPIC_SCREEN.AUTOMATIONS,
  "weekly-report-in-five-minutes": SHOWCASE_TOPIC_SCREEN.REPORTS,
  "schedule-workflow-on-your-mac": SHOWCASE_TOPIC_SCREEN.AUTOMATIONS,
  "phone-asks-coworker-mac-runs": SHOWCASE_TOPIC_SCREEN.MOBILE,
  "automate-recurring-work-without-headcount": SHOWCASE_TOPIC_SCREEN.LEADERSHIP,
  "standardize-ai-work-across-the-team": SHOWCASE_TOPIC_SCREEN.LEADERSHIP,
  "request-sensitive-work-with-approval": SHOWCASE_TOPIC_SCREEN.APPROVALS,
  "one-employee-one-agent": SHOWCASE_TOPIC_SCREEN.COMPANY_ADMIN,
  "company-workflows-setup-once": SHOWCASE_TOPIC_SCREEN.COMPANY_ADMIN,
  "human-checkpoints-before-mac-runs": SHOWCASE_TOPIC_SCREEN.APPROVALS,
  "manage-company-agents": SHOWCASE_TOPIC_SCREEN.COMPANY_ADMIN,
  "manager-approves-before-run": SHOWCASE_TOPIC_SCREEN.APPROVALS,
  "from-my-prompt-to-our-workflow": SHOWCASE_TOPIC_SCREEN.LIBRARY,
  "new-hires-company-playbooks": SHOWCASE_TOPIC_SCREEN.LIBRARY,
  "not-a-slack-replacement": SHOWCASE_TOPIC_SCREEN.CONCEPT,
  "works-without-n8n": SHOWCASE_TOPIC_SCREEN.CONCEPT,
  "not-just-another-chatgpt": SHOWCASE_TOPIC_SCREEN.CONCEPT,
  "what-phone-can-do-alone": SHOWCASE_TOPIC_SCREEN.MOBILE,
  "when-executor-mac-is-offline": SHOWCASE_TOPIC_SCREEN.MAC_STATUS,
  "why-local-mac-not-cloud": SHOWCASE_TOPIC_SCREEN.MAC_STATUS,
};
