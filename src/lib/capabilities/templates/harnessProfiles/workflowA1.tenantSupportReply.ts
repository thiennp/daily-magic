import type { PresetHarnessSeed } from "@/lib/capabilities/templates/harnessProfiles/PresetHarnessSeed.type";
import { TENANT_SUPPORT_REPLY_OPERATOR_STEPS } from "@/lib/capabilities/templates/harnessProfiles/workflowA1.tenantSupportReply.operatorSteps";

export const TENANT_SUPPORT_REPLY_PRESET: PresetHarnessSeed = {
  id: "tenant-support-reply",
  name: "Tenant support reply",
  category: "Property",
  description:
    "Draft calm, policy-grounded replies to tenant maintenance and lease questions using your lease notes — send only after you approve.",
  exampleRequest:
    "Reply to the tenant situation in tenantMessage. Read leaseNotesPath, follow issueType handling, match replyTone, and wait for my approval before I send.",
  operatorSteps: TENANT_SUPPORT_REPLY_OPERATOR_STEPS,
  profile: {
    ruleFocus: [
      "Ground rights and timelines in leaseNotesPath only.",
      "Stay professional; do not admit liability or illegal promises.",
      "Give clear next steps: timeline, vendor dispatch, or documents needed.",
      "Pause with [[AWAITING_INPUT]] before send-ready.",
    ],
    skillSections: [
      {
        heading: "Issue triage",
        bullets: [
          "Classify urgency for issueType (emergency vs routine).",
          "List facts needed from the tenant if information is missing.",
        ],
      },
      {
        heading: "Reply",
        bullets: [
          "Acknowledge concern, cite policy, state next action and ETA window.",
          "Avoid legal advice; suggest formal notice when required.",
        ],
      },
      {
        heading: "Logging",
        bullets: ["Summarize thread in tenantLogPath after operator sends."],
      },
    ],
    commandSteps: [
      "Read tenant message and lease notes.",
      "Draft policy-grounded reply with next steps.",
      "Present draft and wait for approval.",
      "Log resolution in tenantLogPath after send.",
    ],
    instructionAddendum:
      "Vendor dispatch and portal sending stay with the property operator.",
    subagentMission:
      "You are the tenant support subagent. De-escalate and respond with lease-grounded next steps.",
    subagentExpertise: [
      "Landlord-tenant communication",
      "Maintenance triage",
      "Policy-safe tone",
    ],
    outputFormat:
      "Triage summary, draft reply, policy cites, vendor checklist, log line.",
  },
};
