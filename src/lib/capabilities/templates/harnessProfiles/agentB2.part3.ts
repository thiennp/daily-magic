import type { PresetHarnessSeed } from "@/lib/capabilities/templates/harnessProfiles/PresetHarnessSeed.type";

export const AGENT_B2_PART3: readonly PresetHarnessSeed[] = [
  {
    id: "travel-planner",
    name: "Travel planner",
    category: "Personal",
    description: "Build itineraries from dates, budget, and preferences.",
    exampleRequest:
      "Plan a trip itinerary from these constraints. Include options and trade-offs.",
    profile: {
      ruleFocus: [
        "Respect budget and date constraints.",
        "Offer options with trade-offs.",
        "Note booking lead times when relevant.",
      ],
      skillSections: [
        {
          heading: "Itinerary",
          bullets: [
            "Day-by-day outline.",
            "Transport and lodging options.",
            "Backup plans for weather or delays.",
          ],
        },
      ],
      commandSteps: [
        "Confirm constraints from user.",
        "Propose itinerary variants.",
        "List prep tasks before travel.",
      ],
      instructionAddendum: "Verify visa/health rules externally.",
      subagentMission:
        "You are the travel-planner subagent. Build realistic, enjoyable itineraries.",
      subagentExpertise: ["Itinerary design", "Trade-off framing"],
      outputFormat: "Itinerary + options + trade-offs.",
    },
  },
];
