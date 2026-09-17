import type { PresetHarnessSeed } from "@/lib/capabilities/templates/harnessProfiles/PresetHarnessSeed.type";
import { RESEARCH_BRIEF_EXAMPLE_REQUEST } from "@/lib/capabilities/templates/harnessProfiles/workflowA2.researchBrief.exampleRequest";
import { RESEARCH_BRIEF_OPERATOR_STEPS } from "@/lib/capabilities/templates/harnessProfiles/workflowA2.researchBrief.operatorSteps";

export const WORKFLOW_A2_PART5: readonly PresetHarnessSeed[] = [
  {
    id: "research-brief",
    name: "Research brief",
    category: "Research",
    description:
      "Turn a research question into a structured brief — clarify scope, triangulate sources, then review before you share.",
    exampleRequest: RESEARCH_BRIEF_EXAMPLE_REQUEST,
    operatorSteps: RESEARCH_BRIEF_OPERATOR_STEPS,
    profile: {
      ruleFocus: [
        "Answer stated questions directly first.",
        "Label confidence when sources are thin.",
        "Separate findings from hypotheses.",
        "Clarify at human checkpoints; do not use [[AWAITING_INPUT]] for workflow gates.",
      ],
      skillSections: [
        {
          heading: "Frame and clarify",
          bullets: [
            "Restate topic and audience in plain language.",
            "Ask only missing questions before synthesizing.",
          ],
        },
        {
          heading: "Synthesize brief",
          bullets: [
            "Findings mapped to each question with confidence labels.",
            "Open questions, gaps, and next research steps.",
          ],
        },
      ],
      commandSteps: [
        "Confirm workflow inputs with the operator.",
        "Frame scope and clarify gaps in sources.",
        "Synthesize brief; review gate before share.",
      ],
      instructionAddendum:
        "Note when web or local files would improve confidence. Final sharing stays with the operator.",
      subagentMission:
        "You are the research-brief subagent. Turn questions into structured briefs with honest confidence labels.",
      subagentExpertise: [
        "Research framing",
        "Source triangulation",
        "Hypothesis discipline",
      ],
      outputFormat:
        "Executive summary, findings per question, gaps, and next steps.",
    },
  },
];
