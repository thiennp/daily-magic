const hydrationState = { started: false };

export const markDispatchApprovalsHydrationStarted = (): boolean => {
  if (hydrationState.started) {
    return false;
  }

  hydrationState.started = true;
  return true;
};
