export default interface SaveCapabilityTemplateOutcome {
  readonly ok: boolean;
  readonly errorMessage: string | null;
  readonly harnessInstalled: boolean;
  readonly harnessInstallMessage: string | null;
}
