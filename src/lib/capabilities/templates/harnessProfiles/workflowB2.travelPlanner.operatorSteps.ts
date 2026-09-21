import type OperatorStepDefinition from "@/lib/workflows/types/OperatorStepDefinition.type";

export const TRAVEL_PLANNER_OPERATOR_STEPS: readonly OperatorStepDefinition[] =
  [
    {
      id: "travel-planner-operator-confirm",
      title: "Confirm destination, dates, and budget",
      content: [
        "1. Check destination and travelDates match your real trip.",
        "2. Set budget and preferences (pace, must-sees, accessibility).",
        "3. Reply ready when constraints are accurate.",
      ].join("\n"),
    },
    {
      id: "travel-planner-operator-clarify",
      title: "Answer itinerary questions",
      content: [
        "1. Answer the agent’s questions about trade-offs and priorities.",
        "2. Name hard constraints (flights booked, fixed meetings).",
        "3. Reply when you are done answering.",
      ].join("\n"),
    },
    {
      id: "travel-planner-operator-review",
      title: "Review itinerary before booking",
      content: [
        "1. Read the day-by-day plan and options.",
        "2. Request edits for pacing, cost, or missing activities.",
        "3. Reply approve when you are ready to book or share.",
      ].join("\n"),
    },
  ];
