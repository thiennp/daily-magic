import type { PresetHarnessSeed } from "@/lib/capabilities/templates/harnessProfiles/PresetHarnessSeed.type";
import { TRAVEL_PLANNER_EXAMPLE_REQUEST } from "@/lib/capabilities/templates/harnessProfiles/workflowB2.travelPlanner.exampleRequest";
import { TRAVEL_PLANNER_OPERATOR_STEPS } from "@/lib/capabilities/templates/harnessProfiles/workflowB2.travelPlanner.operatorSteps";

export const TRAVEL_PLANNER_PRESET: PresetHarnessSeed = {
  id: "travel-planner",
  name: "Travel planner",
  category: "Personal",
  description:
    "Turn dates, budget, and preferences into a day-by-day itinerary you approve before booking.",
  exampleRequest: TRAVEL_PLANNER_EXAMPLE_REQUEST,
  operatorSteps: TRAVEL_PLANNER_OPERATOR_STEPS,
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
      "Confirm constraints from the form.",
      "Propose itinerary variants.",
      "List prep tasks before travel.",
    ],
    instructionAddendum: "Verify visa and health rules externally.",
    subagentMission:
      "You are the travel-planner subagent. Build realistic, enjoyable itineraries.",
    subagentExpertise: ["Itinerary design", "Trade-off framing"],
    outputFormat: "Itinerary + options + trade-offs.",
  },
};
