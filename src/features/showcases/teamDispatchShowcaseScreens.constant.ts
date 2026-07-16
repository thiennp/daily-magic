export const TEAM_DISPATCH_SHOWCASE_SCREEN = {
  REQUEST_TASK: "01-request-task",
  APPROVAL: "02-approval",
  MAC_RUNNING: "03-mac-running",
} as const;

export type TeamDispatchShowcaseScreenId =
  (typeof TEAM_DISPATCH_SHOWCASE_SCREEN)[keyof typeof TEAM_DISPATCH_SHOWCASE_SCREEN];

const TEAM_DISPATCH_SHOWCASE_SCREEN_BASE_PATH = "/showcases/team-dispatch";

export const buildTeamDispatchShowcasePngPath = (
  screenId: TeamDispatchShowcaseScreenId,
): string => `${TEAM_DISPATCH_SHOWCASE_SCREEN_BASE_PATH}/${screenId}.png`;

export const buildTeamDispatchShowcaseSvgPath = (
  screenId: TeamDispatchShowcaseScreenId,
): string => `${TEAM_DISPATCH_SHOWCASE_SCREEN_BASE_PATH}/${screenId}.svg`;
