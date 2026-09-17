import type { PresetHarnessSeed } from "@/lib/capabilities/templates/harnessProfiles/PresetHarnessSeed.type";
import { ONE_ON_ONE_PREP_EXAMPLE_REQUEST } from "@/lib/capabilities/templates/harnessProfiles/workflowA1.oneOnOnePrep.exampleRequest";
import { ONE_ON_ONE_PREP_OPERATOR_STEPS } from "@/lib/capabilities/templates/harnessProfiles/workflowA1.oneOnOnePrep.operatorSteps";

export const ONE_ON_ONE_PREP_PRESET: PresetHarnessSeed = {
  id: "one-on-one-prep",
  name: "1:1 talking points",
  category: "Communication",
  description:
    "Turn form inputs into a caring, candid 1:1 agenda — clarify first, then draft prompts, feedback, and follow-ups you approve before the meeting.",
  exampleRequest: ONE_ON_ONE_PREP_EXAMPLE_REQUEST,
  operatorSteps: ONE_ON_ONE_PREP_OPERATOR_STEPS,
  profile: {
    ruleFocus: [
      "Balance care, candor, and career growth.",
      "Feedback is specific and behavioral (observation + impact + request).",
      "Include questions that invite dialogue, not monologue.",
      "Clarify tone and sensitive topics before drafting the full agenda.",
    ],
    skillSections: [
      {
        heading: "Agenda",
        bullets: [
          "Check-in since last 1:1 when sinceLast is provided.",
          "Topics the operator listed, prioritized with time hints.",
          "Feedback framed as observation + impact + request.",
        ],
      },
      {
        heading: "Dialogue",
        bullets: [
          "Separate open prompts from feedback items.",
          "End with follow-ups to verify next time.",
        ],
      },
    ],
    commandSteps: [
      "Read person, topics, sinceLast, and feedback from the workflow form.",
      "Clarify missing context with the operator.",
      "Draft agenda, prompts, and follow-ups.",
      "Pause for operator review before the meeting.",
    ],
    instructionAddendum:
      "Keep tone supportive and direct; the operator runs the live 1:1.",
    subagentMission:
      "You are the 1:1 prep subagent. Build empathetic, high-signal manager agendas.",
    subagentExpertise: [
      "Manager coaching",
      "Feedback framing",
      "Career conversations",
    ],
    outputFormat:
      "Agenda sections with prompts, feedback bullets, and follow-ups.",
  },
};
