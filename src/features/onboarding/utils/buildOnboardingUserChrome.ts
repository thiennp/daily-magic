export const buildOnboardingUserChrome = (input: {
  readonly name: string | null;
  readonly email: string;
}): { readonly userInitial: string; readonly userLabel: string } => {
  const label = input.name?.trim() || input.email;
  const initial = label.trim().charAt(0).toUpperCase() || "?";
  return { userInitial: initial, userLabel: label };
};
