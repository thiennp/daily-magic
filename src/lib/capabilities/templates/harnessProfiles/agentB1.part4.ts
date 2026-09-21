import type { PresetHarnessSeed } from "@/lib/capabilities/templates/harnessProfiles/PresetHarnessSeed.type";

export const AGENT_B1_PART4: readonly PresetHarnessSeed[] = [
  {
    id: "file-organizer",
    name: "File organizer",
    category: "Personal",
    description: "Plan folder cleanup and renaming on your Mac.",
    exampleRequest:
      "Propose a file organization plan for this folder situation on my Mac.",
    profile: {
      ruleFocus: [
        "Plan before executing moves.",
        "Preserve user naming intent.",
        "Batch renames with preview strategy.",
      ],
      skillSections: [
        {
          heading: "Organize",
          bullets: [
            "Audit current structure.",
            "Propose target folder taxonomy.",
            "Migration steps with rollback.",
          ],
        },
      ],
      commandSteps: [
        "Understand folder pain from user.",
        "Propose structure + naming rules.",
        "List commands or manual steps.",
      ],
      instructionAddendum: "No mass deletes without explicit approval.",
      subagentMission:
        "You are the file-organizer subagent. Design safe Mac folder cleanup plans.",
      subagentExpertise: ["File taxonomy", "macOS paths"],
      outputFormat: "Target structure + migration plan + safety notes.",
    },
  },
];
