export const TRAVEL_PLANNER_EXAMPLE_REQUEST = `Build a trip itinerary from the workflow form constraints.

Read destination, travelDates, budget, and preferences from the workflow form.

## Clarify before planning
Check for ambiguous dates, unrealistic budget, or missing constraints (pace, accessibility, fixed bookings).
List clarifying questions in [[PROGRESS]]; the operator answers at the next human checkpoint.
Do not draft the full itinerary in this step.

## Draft itinerary
Continue from prior operator answers (see checkpoint responses above).

Produce:
- Day-by-day outline within travelDates
- Transport and lodging options within budget
- Trade-offs when preferences conflict
- Short prep checklist before travel

Stop before operator approval.`;
