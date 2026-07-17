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

/** Intrinsic pixel size of trimmed PNG captures (keeps article layout tight). */
export const TEAM_DISPATCH_SHOWCASE_SCREEN_DIMENSIONS: Readonly<
  Record<
    TeamDispatchShowcaseScreenId,
    { readonly width: number; readonly height: number }
  >
> = {
  [TEAM_DISPATCH_SHOWCASE_SCREEN.REQUEST_TASK]: { width: 1067, height: 547 },
  [TEAM_DISPATCH_SHOWCASE_SCREEN.APPROVAL]: { width: 1072, height: 389 },
  [TEAM_DISPATCH_SHOWCASE_SCREEN.MAC_RUNNING]: { width: 1072, height: 524 },
};

export const resolveTeamDispatchShowcaseScreenDimensions = (
  screenId: TeamDispatchShowcaseScreenId,
): { readonly width: number; readonly height: number } =>
  TEAM_DISPATCH_SHOWCASE_SCREEN_DIMENSIONS[screenId];
