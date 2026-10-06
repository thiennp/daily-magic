/**
 * HOME-066: while a Connect / Update modal is open, hold browser identity
 * updates from a freshly minted install token. Applying the hash (and wake
 * refresh) remounts the device row that owns the modal.
 */
export const shouldHoldInstallTokenIdentityCommit = (input: {
  readonly commitIdentityWhenDisabled: boolean;
  readonly enabled: boolean;
}): boolean => input.commitIdentityWhenDisabled && input.enabled;
