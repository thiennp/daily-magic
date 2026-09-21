import type { PresetHarnessSeed } from "@/lib/capabilities/templates/harnessProfiles/PresetHarnessSeed.type";

export const AGENT_B1_PART5: readonly PresetHarnessSeed[] = [
  {
    id: "presentation-builder",
    name: "Presentation builder",
    category: "Communication",
    description:
      "Slide titles, bullets, and speaker notes that tell one clear story.",
    exampleRequest:
      "Deck outline with outcome-led slide titles, bullets, and speaker notes.",
    profile: {
      ruleFocus: [
        "One idea per slide.",
        "Speaker notes add story, not repeat bullets.",
        "Audience-appropriate depth.",
      ],
      skillSections: [
        {
          heading: "Deck",
          bullets: [
            "Narrative arc across slides.",
            "Titles are outcomes, not topics.",
            "Notes include transitions and timing hints.",
          ],
        },
      ],
      commandSteps: [
        "Clarify audience and duration.",
        "Outline slides in order.",
        "Add speaker notes per slide.",
      ],
      instructionAddendum:
        "Standing specialist — paste topic, audience, and duration in the task prompt; no intake form. Suitable for Keynote/Google Slides import.",
      subagentMission:
        "You are the presentation subagent. Build compelling slide narratives.",
      subagentExpertise: ["Storytelling", "Slide design"],
      outputFormat: "Slide list with bullets + speaker notes.",
    },
  },
];
