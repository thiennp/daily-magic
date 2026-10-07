import { AGENT_WITCH_LOCAL_STATUS_DEEP_LINK } from "@/features/agent-witch/macDevices/openAgentWitchLocalStatus";

export default function WriterSetupPageFooter() {
  return (
    <div className="mt-6 space-y-3 text-sm text-awc-fg-muted dark:text-gray-400">
      <p>
        Prefer API keys instead of installing CLIs? On the computer,{" "}
        {/* DF-033: deep link (H7) — the 43347 Writer API page is retired. */}
        <a
          href={AGENT_WITCH_LOCAL_STATUS_DEEP_LINK}
          className="font-medium text-awc-fg underline underline-offset-2 hover:text-gray-950 dark:text-gray-100 dark:hover:text-white"
        >
          open AgentWitch Local
        </a>{" "}
        from the menu bar. Keys stay on that machine only.
      </p>
      <p>Writer setup here uses the live WebSocket bridge to your computer.</p>
    </div>
  );
}
