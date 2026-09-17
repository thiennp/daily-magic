import type { PresetHarnessSeed } from "@/lib/capabilities/templates/harnessProfiles/PresetHarnessSeed.type";
import { INCIDENT_POSTMORTEM_EXAMPLE_REQUEST } from "@/lib/capabilities/templates/harnessProfiles/workflowB2.incidentPostmortem.exampleRequest";
import { INCIDENT_POSTMORTEM_OPERATOR_STEPS } from "@/lib/capabilities/templates/harnessProfiles/workflowB2.incidentPostmortem.operatorSteps";

export const INCIDENT_POSTMORTEM_PRESET: PresetHarnessSeed = {
  id: "incident-postmortem",
  name: "Incident postmortem draft",
  category: "Engineering",
  description:
    "Turn rough incident notes into a blameless postmortem with timeline, impact, root cause, and owned follow-ups.",
  exampleRequest: INCIDENT_POSTMORTEM_EXAMPLE_REQUEST,
  operatorSteps: INCIDENT_POSTMORTEM_OPERATOR_STEPS,
  profile: {
    ruleFocus: [
      "Blameless tone; systems and process focus — no individual blame.",
      "Impact summary before deep timeline detail.",
      "Root cause as hypothesis with evidence; action items preventive and owned.",
      "Workflow checkpoints replace [[AWAITING_INPUT]] for operator gates.",
    ],
    skillSections: [
      {
        heading: "Postmortem structure",
        bullets: [
          "Impact summary first for executives.",
          "Timeline: detection → mitigation → resolution with timestamps when known.",
          "Root cause as hypothesis with evidence; monitoring gaps called out.",
        ],
      },
    ],
    commandSteps: [
      "Confirm form fields timeline, impact, rootCause, followUps.",
      "Draft timeline and impact; collect gaps at checkpoint.",
      "Complete root cause and actions; merge full postmortem.",
      "Operator review before sharing.",
    ],
    instructionAddendum:
      "Publishing to status pages or ticketing systems stays with the operator.",
    subagentMission:
      "You are the incident postmortem subagent. Produce blameless, actionable postmortems from operator-provided facts.",
    subagentExpertise: ["Incident response", "SRE writing"],
    outputFormat:
      "Impact summary, timeline, root cause (hypothesis), immediate and long-term action items.",
  },
};
