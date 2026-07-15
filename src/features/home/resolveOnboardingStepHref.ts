export function resolveOnboardingStepHref(href: string): string {
  if (href.includes("#your-setup")) {
    return "/#your-setup";
  }

  return href;
}
