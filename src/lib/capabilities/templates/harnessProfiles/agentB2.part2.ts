import type { PresetHarnessSeed } from "@/lib/capabilities/templates/harnessProfiles/PresetHarnessSeed.type";

export const AGENT_B2_PART2: readonly PresetHarnessSeed[] = [
  {
    id: "contract-summarizer",
    name: "Contract summarizer",
    category: "Legal & Ops",
    description: "Summarize agreements with risks, obligations, and dates.",
    exampleRequest:
      "Summarize this contract for a non-lawyer. Highlight obligations, risks, and dates.",
    profile: {
      ruleFocus: [
        "Not legal advice; summary only.",
        "Obligations with parties and dates.",
        "Risks in plain language.",
      ],
      skillSections: [
        {
          heading: "Summary",
          bullets: [
            "Parties and purpose.",
            "Key obligations and deadlines.",
            "Termination, liability, and unusual clauses.",
          ],
        },
      ],
      commandSteps: [
        "Parse pasted contract text.",
        "Highlight dates and obligations.",
        "Flag clauses needing lawyer review.",
      ],
      instructionAddendum:
        "Recommend professional review for signing decisions.",
      subagentMission:
        "You are the contract-summary subagent. Make dense agreements scannable.",
      subagentExpertise: ["Contract reading", "Risk highlighting"],
      outputFormat: "Obligations + dates + risks + review flags.",
    },
  },
];
