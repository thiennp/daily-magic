export const shouldRetryUnreachableWakeIdentityProbe = (input: {
  readonly wakeReachable: boolean;
  readonly hasIdentity: boolean;
  readonly isDocumentVisible: boolean;
}): boolean => {
  if (!input.isDocumentVisible) {
    return false;
  }

  if (input.wakeReachable && input.hasIdentity) {
    return false;
  }

  return true;
};
