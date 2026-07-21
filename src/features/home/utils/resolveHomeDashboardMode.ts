export type HomeDashboardMode = "loading" | "connect" | "dashboard";

export const resolveHomeDashboardMode = (input: {
  readonly isLoading: boolean;
  readonly deviceCount: number;
  readonly hasCursorCloudConnection?: boolean;
}): HomeDashboardMode => {
  if (input.isLoading) {
    return "loading";
  }

  if (input.deviceCount === 0 && input.hasCursorCloudConnection !== true) {
    return "connect";
  }

  return "dashboard";
};
