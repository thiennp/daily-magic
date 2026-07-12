export function resolveOnboardingStepHref(
  href: string,
  appPath: (path: string) => string,
): string {
  if (href.includes("#your-setup")) {
    return `${appPath("/")}#your-setup`;
  }

  return appPath(href);
}
