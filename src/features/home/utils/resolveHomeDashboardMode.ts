export type HomeDashboardMode = "loading" | "connect" | "dashboard";

export const resolveHomeDashboardMode = (input: {
  readonly isLoading: boolean;
  readonly deviceCount: number;
}): HomeDashboardMode => {
  if (input.isLoading) {
    return "loading";
  }

  if (input.deviceCount === 0) {
    return "connect";
  }

  return "dashboard";
};
