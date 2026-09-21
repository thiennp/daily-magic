import type OperatorStepDefinition from "@/lib/workflows/types/OperatorStepDefinition.type";

export const TRAVEL_PLANNER_OPERATOR_STEPS: readonly OperatorStepDefinition[] =
  [
    {
      id: "travel-planner-operator-confirm",
      title: "Confirm destination, dates, and budget",
      content: [
        "1. Check destination and travelDates match your trip.",
        "2. Set budget and preferences honestly.",
        "3. Reply ready when constraints are set.",
      ].join("\n"),
    },
    {
      id: "travel-planner-operator-clarify",
      title: "Answer itinerary questions",
      content: [
        "1. Answer the agent’s questions about priorities and fixed bookings.",
        "2. Name must-see items or hard limits.",
        "3. Reply when done.",
      ].join("\n"),
    },
    {
      id: "travel-planner-operator-review",
      title: "Review itinerary before booking",
      content: [
        "1. Read the plan and options.",
        "2. Request edits for pacing or cost.",
        "3. Reply approve when ready to book or share.",
      ].join("\n"),
    },
  ];
