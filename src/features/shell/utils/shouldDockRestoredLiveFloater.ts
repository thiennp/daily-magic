/**
 * d863fc9e: a reload restore opens the live run with its URL first; it docks
 * to the floater once the big modal is up (the panel has read the URL).
 */
export const shouldDockRestoredLiveFloater = (input: {
  readonly isOpen: boolean;
  readonly dockPending: boolean;
}): boolean => input.isOpen && input.dockPending;
