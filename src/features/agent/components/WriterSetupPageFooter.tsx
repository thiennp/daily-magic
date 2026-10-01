import { AGENT_WITCH_LOCAL_APP_ORIGIN } from "@/lib/agentWitch/agentWitchLocalAppPort.constant";

export default function WriterSetupPageFooter() {
  return (
    <div className="mt-6 space-y-3 text-sm text-gray-500 dark:text-gray-400">
      <p>
        Prefer API keys instead of installing CLIs? On the Mac, open{" "}
        <a
          href={`${AGENT_WITCH_LOCAL_APP_ORIGIN}/writer-api`}
          className="font-medium text-gray-800 underline underline-offset-2 hover:text-gray-950 dark:text-gray-100 dark:hover:text-white"
        >
          Writer API
        </a>{" "}
        in the local Agent Witch UI (
        <span className="break-all">{AGENT_WITCH_LOCAL_APP_ORIGIN}</span>
        ). Keys stay on that machine only.
      </p>
      <p>
        For traffic and knowledge, use the same local UI. Writer setup here uses
        the live WebSocket bridge to your Mac, not the local UI pages.
      </p>
    </div>
  );
}
