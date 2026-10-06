/** Server view of the S0-2 owner setting (GET/PUT runs-without-approval). */
export type RunsWithoutApprovalResult =
  | { readonly ok: true; readonly allowRunsWithoutApproval: boolean }
  | { readonly ok: false };

/** What a click on the switch should do next. */
export type RunsWithoutApprovalToggleStep =
  | { readonly kind: "confirm" }
  | { readonly kind: "save"; readonly value: boolean }
  | { readonly kind: "none" };

export type RunsWithoutApprovalLoadState = "loading" | "ready" | "error";

/** Props for the presentational switch row. */
export type RunsWithoutApprovalSwitchView = {
  readonly loadState: RunsWithoutApprovalLoadState;
  readonly enabled: boolean;
  readonly saving: boolean;
  readonly saveFailed: boolean;
};
