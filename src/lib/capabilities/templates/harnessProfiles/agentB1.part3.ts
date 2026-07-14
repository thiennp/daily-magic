import type { PresetHarnessSeed } from "@/lib/capabilities/templates/harnessProfiles/PresetHarnessSeed.type";

export const AGENT_B1_PART3: readonly PresetHarnessSeed[] = [
  {
    id: "shell-command-helper",
    name: "Shell command helper",
    category: "Engineering",
    description: "Safe macOS terminal commands for file and system tasks.",
    exampleRequest:
      "Suggest macOS shell commands for this task. Prefer safe, explainable commands.",
    profile: {
      ruleFocus: [
        "macOS zsh/bash compatible commands.",
        "Explain what each command does.",
        "Warn before destructive operations.",
      ],
      skillSections: [
        {
          heading: "Shell",
          bullets: [
            "Prefer safe flags and dry-run when possible.",
            "Quote paths with spaces.",
            "Offer rollback or backup steps.",
          ],
        },
      ],
      commandSteps: [
        "Confirm task scope on Mac.",
        "Provide commands with comments.",
        "Flag destructive steps explicitly.",
      ],
      instructionAddendum: "Agent Witch runs on owner's Mac.",
      subagentMission:
        "You are the shell subagent. Suggest safe, explainable macOS commands.",
      subagentExpertise: ["macOS CLI", "Safety", "File operations"],
      outputFormat: "Commands with comments + safety warnings.",
    },
  },
];
