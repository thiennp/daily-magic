import { headers } from "next/headers";
import Link from "next/link";

import CopyableBashCommand from "@/features/home/CopyableBashCommand";
import AgentWitchUnsupportedHostNotice from "@/features/home/AgentWitchUnsupportedHostNotice";
import AppPanel from "@/components/surfaces/AppPanel";
import { APP_SURFACE_BODY_TEXT_CLASS } from "@/components/surfaces/appSurfaceStyles.constant";
import { buildLocalAgentInstallCommandFromHeaders } from "@/lib/agentWitch/buildLocalAgentInstallCommand";
import { buildAgentWitchWakeTerminalCommand } from "@/lib/agentWitch/buildAgentWitchWakeTerminalCommand";
import isAgentWitchWebSocketSupportedHost from "@/lib/agentWitch/isAgentWitchWebSocketSupportedHost";

export default async function LocalAgentSetupInstructions() {
  const requestHeaders = await headers();
  const { installCommand, installScriptUrl, wsUrl } =
    buildLocalAgentInstallCommandFromHeaders(requestHeaders);
  const host =
    requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "";
  const isWebSocketSupported = isAgentWitchWebSocketSupportedHost(host);

  return (
    <AppPanel
      as="section"
      padding="compact"
      className="bg-gray-50 text-left dark:border-gray-700 dark:bg-gray-900/50"
    >
      <h2 className="text-sm font-semibold text-gray-800 dark:text-white/90">
        Connect a Mac
      </h2>
      {!isWebSocketSupported ? (
        <div className="mt-4">
          <AgentWitchUnsupportedHostNotice host={host} />
        </div>
      ) : null}
      <p className={`mt-2 ${APP_SURFACE_BODY_TEXT_CLASS}`}>
        Run this install command in Terminal on each Mac you want to use with
        this account. It sets up Agent Witch so this website can send tasks to
        that machine. On macOS it also starts automatically when you sign in.
        {!isWebSocketSupported
          ? " This website host cannot keep a live connection open — use a supported deployment before connecting."
          : null}
      </p>
      {isWebSocketSupported ? (
        <CopyableBashCommand command={installCommand} />
      ) : null}
      <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">
        Step 2: open{" "}
        <Link
          href="/"
          className="font-medium text-brand-600 hover:underline dark:text-brand-400"
        >
          Home
        </Link>{" "}
        on this Mac after install. The browser calls{" "}
        <code className="rounded bg-white px-1 py-0.5 dark:bg-gray-800">
          http://127.0.0.1:47892/link-account
        </code>{" "}
        to link whichever account you are signed in with — no email in the
        install command, and no reinstall when you switch users.
      </p>
      <details className="mt-3 text-xs text-gray-500 dark:text-gray-400">
        <summary className="cursor-pointer font-medium text-gray-600 dark:text-gray-300">
          Advanced details
        </summary>
        <p className="mt-2">
          Install folder:{" "}
          <code className="rounded bg-white px-1 py-0.5 dark:bg-gray-800">
            ~/.agent-witch
          </code>
          . Script:{" "}
          <a
            href={installScriptUrl}
            className="text-brand-600 hover:underline dark:text-brand-400"
          >
            {installScriptUrl}
          </a>
          . Connects to{" "}
          <code className="rounded bg-white px-1 py-0.5 dark:bg-gray-800">
            {wsUrl}
          </code>
          . Wake script (macOS):{" "}
          <code className="rounded bg-white px-1 py-0.5 dark:bg-gray-800">
            {buildAgentWitchWakeTerminalCommand()}
          </code>
          .
        </p>
      </details>
    </AppPanel>
  );
}
