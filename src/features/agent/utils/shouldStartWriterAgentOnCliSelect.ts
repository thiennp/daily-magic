/**
 * AGENT-028: picking a CLI must never auto-start the Mac session.
 * Custom task previously started immediately when `selectedLibraryCapabilityId`
 * was empty; Start on the form is the only begin path.
 */
export const shouldStartWriterAgentOnCliSelect = (
  _selectedLibraryCapabilityId: string,
): boolean => false;
