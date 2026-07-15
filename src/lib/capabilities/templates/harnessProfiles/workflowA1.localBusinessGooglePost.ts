import type { PresetHarnessSeed } from "@/lib/capabilities/templates/harnessProfiles/PresetHarnessSeed.type";
import { LOCAL_BUSINESS_GOOGLE_POST_OPERATOR_STEPS } from "@/lib/capabilities/templates/harnessProfiles/workflowA1.localBusinessGooglePost.operatorSteps";

export const LOCAL_BUSINESS_GOOGLE_POST_PRESET: PresetHarnessSeed = {
  id: "local-business-google-post",
  name: "Local business Google post",
  category: "Local",
  description:
    "Draft a Google Business Profile post for hours, offers, or events — without repeating recent posts from your history file.",
  exampleRequest:
    "Prepare a Google Business post for businessName. Read postHistoryPath, avoid duplicate angles, honor hoursOrOffer, and wait for my approval before I publish.",
  operatorSteps: LOCAL_BUSINESS_GOOGLE_POST_OPERATOR_STEPS,
  profile: {
    ruleFocus: [
      "Read postHistoryPath; do not reuse recent hooks or offers.",
      "Keep hoursOrOffer and dates accurate for businessType.",
      "Write scannable mobile copy with one clear CTA.",
      "Pause with [[AWAITING_INPUT]] before publish-ready.",
    ],
    skillSections: [
      {
        heading: "Post draft",
        bullets: [
          "Headline + short body tuned for local search intent.",
          "CTA: call, book, directions, or redeem offer.",
        ],
      },
      {
        heading: "Compliance",
        bullets: [
          "Avoid expired promos and unverifiable superlatives.",
          "Note photo suggestions if the operator will attach images.",
        ],
      },
      {
        heading: "History",
        bullets: [
          "Append post summary to postHistoryPath after operator publishes.",
        ],
      },
    ],
    commandSteps: [
      "Load post history and dedupe angles.",
      "Draft post for postTopic and hoursOrOffer.",
      "Present copy and wait for approval.",
      "Update postHistoryPath after publish.",
    ],
    instructionAddendum:
      "Google Business login and publish stay with the operator.",
    subagentMission:
      "You are the local Google post subagent. Help small businesses post timely, accurate updates.",
    subagentExpertise: [
      "Local SEO posts",
      "Promotional copy",
      "Google Business Profile format",
    ],
    outputFormat:
      "Headline, body, CTA, photo brief, dedupe notes, history append draft.",
  },
};
