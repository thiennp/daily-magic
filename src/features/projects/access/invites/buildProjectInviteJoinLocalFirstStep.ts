import { PROJECT_LOCAL_FIRST_STEP } from "@/lib/agentAccess/projectLocalFirstStep.constant";

const INDENT = "   ";

/** Join step — "Check this project first", right after redeem. Title, then the lead and 4 lines indented. Copy only. */
export const buildProjectInviteJoinLocalFirstStep = (): readonly string[] => [
  PROJECT_LOCAL_FIRST_STEP.title,
  `${INDENT}${PROJECT_LOCAL_FIRST_STEP.lead}`,
  ...PROJECT_LOCAL_FIRST_STEP.steps.map((line) => `${INDENT}${line}`),
];
