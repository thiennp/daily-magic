export const resolveShouldShowTeamDispatchSection = (input: {
  readonly isLibraryPlaybook: boolean;
  readonly isOwnDeviceDispatch: boolean;
  readonly isSteppedComposer: boolean;
  readonly isLoading: boolean;
  readonly groupCount: number;
}): boolean => {
  if (
    input.isLibraryPlaybook ||
    input.isOwnDeviceDispatch ||
    input.isSteppedComposer
  ) {
    return false;
  }

  return input.isLoading || input.groupCount > 0;
};
