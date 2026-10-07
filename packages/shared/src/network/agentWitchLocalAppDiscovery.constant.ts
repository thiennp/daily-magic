/**
 * DF-033: since H6 AgentWitch Local (AWL) listens on a port unique to each
 * account on the computer (profiles/<email>/local-app-port.json), and since H7
 * the people-facing surface is the Mac app (`agentwitch-local://` deep links).
 * Copy and links must not hard-code the legacy 43347 port.
 */

/** File where AWL saves its discovered listen port (`{ "localAppPort": n }`). */
export const AGENT_WITCH_LOCAL_APP_PORT_FILE_NAME = "local-app-port.json";

/** Origin template for bots: replace `<localAppPort>` with the saved port. */
export const AGENT_WITCH_LOCAL_APP_DISCOVERED_ORIGIN =
  "http://127.0.0.1:<localAppPort>";

/** Where a bot on the same computer reads the port (production install dir). */
export const AGENT_WITCH_LOCAL_APP_PORT_FILE_HINT = `~/.agent-witch/profiles/<account email>/${AGENT_WITCH_LOCAL_APP_PORT_FILE_NAME}`;

/** One sentence for bot instructions (discovered-port mechanism). */
export const AGENT_WITCH_LOCAL_APP_PORT_DISCOVERY_SENTENCE = `AgentWitch Local listens on a port unique to your account on this computer: read localAppPort from ${AGENT_WITCH_LOCAL_APP_PORT_FILE_HINT} and use ${AGENT_WITCH_LOCAL_APP_DISCOVERED_ORIGIN}.`;

/** Mac app deep link scheme (H7: the Mac menu bar app is the surface). */
export const AGENT_WITCH_LOCAL_DEEP_LINK_SCHEME = "agentwitch-local";

/**
 * Terminal health check that reads the discovered port first (bash + zsh).
 * `installDirName` is `.agent-witch` (prod) or `.local-agent-witch` (localhost).
 */
export const buildAgentWitchLocalHealthCheckCommand = (
  installDirName: string = ".agent-witch",
): string =>
  `port="$(sed -n 's/.*"localAppPort"[^0-9]*\\([0-9][0-9]*\\).*/\\1/p' "$HOME/${installDirName}"/profiles/*/${AGENT_WITCH_LOCAL_APP_PORT_FILE_NAME} | head -n 1)"; curl -sS -m 5 "http://127.0.0.1:\${port}/health"`;
