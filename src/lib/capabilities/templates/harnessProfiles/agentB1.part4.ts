import type { PresetHarnessSeed } from "@/lib/capabilities/templates/harnessProfiles/PresetHarnessSeed.type";

export const AGENT_B1_PART4: readonly PresetHarnessSeed[] = [
  {
    id: "file-organizer",
    name: "File organizer",
    category: "Personal",
    description:
      "A folder taxonomy and migration plan for your Mac with rollback notes.",
    exampleRequest:
      "Folder taxonomy and migration plan for this folder situation with rollback steps.",
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
      instructionAddendum:
        "Standing specialist — paste folder context in the task prompt; no intake form. No mass deletes without explicit approval.",
      subagentMission:
        "You are the file-organizer subagent. Design safe Mac folder cleanup plans.",
      subagentExpertise: ["File taxonomy", "macOS paths"],
      outputFormat: "Target structure + migration plan + safety notes.",
    },
  },
];
