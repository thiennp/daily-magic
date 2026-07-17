import { SHOWCASE_TOPIC_SCREEN } from "@/features/showcases/showcaseTopicScreens.constant";
import type { ShowcaseTopicScreenId } from "@/features/showcases/showcaseTopicScreens.constant";

export const SHOWCASE_TOPIC_SCREEN_CAPTION: Readonly<
  Record<ShowcaseTopicScreenId, string>
> = {
  [SHOWCASE_TOPIC_SCREEN.SEND_TASK]:
    "Describe the task and send it to your Mac.",
  [SHOWCASE_TOPIC_SCREEN.JOB_HISTORY]:
    "Completed weekly status run in Job history.",
  [SHOWCASE_TOPIC_SCREEN.MARKETPLACE]:
    "Popular workflow presets on the home page.",
  [SHOWCASE_TOPIC_SCREEN.AUTOMATIONS]:
    "Friday team status scheduled on weekdays.",
  [SHOWCASE_TOPIC_SCREEN.MOBILE]:
    "Send a task from your phone while away from your desk.",
  [SHOWCASE_TOPIC_SCREEN.LIBRARY]: "Company playbooks saved in Library.",
  [SHOWCASE_TOPIC_SCREEN.REPORTS]: "Weekly report output in Job history.",
  [SHOWCASE_TOPIC_SCREEN.APPROVALS]:
    "Sensitive task waiting for manager approval.",
  [SHOWCASE_TOPIC_SCREEN.COMPANY_ADMIN]:
    "Acme Product group with approval policy and seeded playbooks.",
  [SHOWCASE_TOPIC_SCREEN.LEADERSHIP]: "Shared automations across the team.",
  [SHOWCASE_TOPIC_SCREEN.CONCEPT]: "Your Mac runs the agent on local files.",
  [SHOWCASE_TOPIC_SCREEN.MAC_STATUS]:
    "Mac offline — the job waits until it comes back.",
};

export const resolveShowcaseTopicScreenCaption = (
  screenId: ShowcaseTopicScreenId,
): string => SHOWCASE_TOPIC_SCREEN_CAPTION[screenId];
