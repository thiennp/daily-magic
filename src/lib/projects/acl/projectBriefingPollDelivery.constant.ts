import {
  PROJECT_BRIEFING_DISPATCH_ADDRESSING,
  PROJECT_BRIEFING_DISPATCH_TAIL,
  PROJECT_UPDATED_WAKE_REPLY_CLAUSE,
} from "@/lib/projects/acl/projectBriefingHowToDispatch.constant";
import {
  PROJECT_BOT_PLAYBOOK_LIBRARY_FIRST_LINE,
  PROJECT_BOT_PLAYBOOK_TASK_PAIR_LINE,
} from "@/lib/agentAccess/projectBotPlaybookReport.constant";
import { PROJECT_TASKS_FIRST_CLAUSE } from "@/lib/projects/acl/projectTasksFirstClause.constant";
import { PROJECT_MEMBERSHIP_POLL_INBOX_GUIDANCE } from "@/lib/projects/acl/projectMembershipDeliveryModeGuidance.constant";

/**
 * Briefing paragraph for delivery_mode=poll (Checks on demand). Same
 * addressing + ack rules as the wake briefing, without the wake-link MUST,
 * the wake-first receipt steps, or the 5/10-minute silence warning.
 */
export const PROJECT_BRIEFING_HOW_TO_DISPATCH_POLL =
  PROJECT_TASKS_FIRST_CLAUSE +
  " " +
  PROJECT_BOT_PLAYBOOK_LIBRARY_FIRST_LINE +
  " " +
  PROJECT_BOT_PLAYBOOK_TASK_PAIR_LINE +
  " " +
  PROJECT_BRIEFING_DISPATCH_ADDRESSING +
  PROJECT_MEMBERSHIP_POLL_INBOX_GUIDANCE +
  " " +
  PROJECT_UPDATED_WAKE_REPLY_CLAUSE +
  PROJECT_BRIEFING_DISPATCH_TAIL;
