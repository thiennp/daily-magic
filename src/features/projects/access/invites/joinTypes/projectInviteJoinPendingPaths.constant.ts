/**
 * S1 slot — device code (short code the user confirms). Fill with the connect
 * lines and switch the affected types' connectPath to "device-code" when S1
 * lands. Empty today, so nothing renders for a path that does not exist yet.
 */
export const PROJECT_INVITE_JOIN_DEVICE_CODE_STEPS: readonly string[] = [];

/**
 * S2 slot — sign-in connector (remote MCP OAuth). Ownership only: project access
 * still needs the owner's Approve. Empty today, so nothing renders yet.
 */
export const PROJECT_INVITE_JOIN_SIGNIN_CONNECTOR_STEPS: readonly string[] = [];
