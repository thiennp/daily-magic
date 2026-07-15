import type { PresetHarnessSeed } from "@/lib/capabilities/templates/harnessProfiles/PresetHarnessSeed.type";
import { EMAIL_INBOX_REPLY_PRESET } from "@/lib/capabilities/templates/harnessProfiles/workflowA1.emailInboxReply";
import { FACEBOOK_PAGE_POST_PRESET } from "@/lib/capabilities/templates/harnessProfiles/workflowA1.facebookPagePost";
import { FINANCE_SHEET_QA_PRESET } from "@/lib/capabilities/templates/harnessProfiles/workflowA1.financeSheetQa";
import { DROPSHIP_PRODUCT_LISTING_PRESET } from "@/lib/capabilities/templates/harnessProfiles/workflowA1.dropshipProductListing";
import { TIKTOK_SERIES_EPISODE_PRESET } from "@/lib/capabilities/templates/harnessProfiles/workflowA1.tiktokSeriesEpisode";

export const WORKFLOW_A1_PART1: readonly PresetHarnessSeed[] = [
  DROPSHIP_PRODUCT_LISTING_PRESET,
  TIKTOK_SERIES_EPISODE_PRESET,
  FINANCE_SHEET_QA_PRESET,
  EMAIL_INBOX_REPLY_PRESET,
  FACEBOOK_PAGE_POST_PRESET,
  {
    id: "weekly-team-status",
    name: "Weekly team status",
    category: "Reporting",
    description: "Turn highlights and blockers into a polished team update.",
    exampleRequest:
      "Write a concise team status update with bullets. Lead with outcomes and call out blockers clearly.",
    profile: {
      ruleFocus: [
        "Lead with shipped outcomes and measurable progress.",
        "Separate highlights, risks, and asks.",
        "Name owners on blockers; propose a next step or decision needed.",
      ],
      skillSections: [
        {
          heading: "Gather",
          bullets: [
            "Map weekOf to the reporting period.",
            "Extract wins from highlights; quantify when possible.",
            "Turn blockers into owner + impact + ask.",
          ],
        },
        {
          heading: "Draft",
          bullets: [
            "Open with one-line summary of the week.",
            "Use bullets for highlights and blockers sections.",
            "End with priorities for next week.",
          ],
        },
      ],
      commandSteps: [
        "Confirm weekOf and highlights are present.",
        "Draft status using the playbook sections.",
        "Verify every blocker has an owner or explicit TBD.",
      ],
      instructionAddendum:
        "Optimize for managers scanning in under 60 seconds.",
      subagentMission:
        "You are the weekly status subagent. Produce leadership-ready team updates from raw highlights and blockers.",
      subagentExpertise: [
        "Executive summaries",
        "Blocker escalation framing",
        "Outcome-first writing",
      ],
      outputFormat:
        "Bullets grouped by theme; blockers with owner and ask; under 250 words unless user asks for more.",
    },
  },
];
