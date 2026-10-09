import {
  AGENT_WITCH_LOCAL_APP_LOOPBACK_ORIGIN,
  AGENT_WITCH_LOCAL_APP_ORIGIN,
} from "./agentWitchLocalApp.constants";

const WEB_ORIGINS: ReadonlySet<string> = new Set([
  "https://agentwitch.com",
  "https://www.agentwitch.com",
]);

export type LocalAppRequestGuard =
  | { readonly ok: true; readonly allowOrigin: string | null }
  | { readonly ok: false };

/**
 * The local app reads files, runs coding agents and returns chats, so only this computer's own
 * callers may reach it:
 * - Host must be the loopback address on the port we listen on (DNS rebinding sends another name);
 * - a browser request must come from the app's own page or from agentwitch.com (an Origin of
 *   another site, `null`, or a cross-site fetch is refused, GET and POST alike);
 * - callers without an Origin (curl, MCP clients, the Mac app) pass.
 * `AGENT_WITCH_LOCAL_APP_ALLOW_DEV_ORIGINS=1` additionally accepts the local dev web app.
 */
export const guardLocalAppRequest = (input: {
  readonly host: string | undefined;
  readonly origin: string | undefined;
  readonly secFetchSite: string | undefined;
  readonly localPort: number | undefined;
}): LocalAppRequestGuard => {
  const { host, origin, localPort } = input;
  if (host === undefined || localPort === undefined) return { ok: false };
  const loopbackHosts = [
    `127.0.0.1:${localPort}`,
    `localhost:${localPort}`,
    `[::1]:${localPort}`,
  ];
  if (!loopbackHosts.includes(host.toLowerCase())) return { ok: false };

  if (origin === undefined) {
    return input.secFetchSite === "cross-site"
      ? { ok: false }
      : { ok: true, allowOrigin: null };
  }
  const devOrigins =
    process.env.AGENT_WITCH_LOCAL_APP_ALLOW_DEV_ORIGINS === "1"
      ? ["http://localhost:3000", "http://127.0.0.1:3000"]
      : [];
  const allowed =
    WEB_ORIGINS.has(origin) ||
    devOrigins.includes(origin) ||
    origin === AGENT_WITCH_LOCAL_APP_ORIGIN ||
    origin === AGENT_WITCH_LOCAL_APP_LOOPBACK_ORIGIN ||
    loopbackHosts.some((loopback) => origin === `http://${loopback}`);
  return allowed ? { ok: true, allowOrigin: origin } : { ok: false };
};
