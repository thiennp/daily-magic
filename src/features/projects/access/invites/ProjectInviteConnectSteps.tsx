import { AWC_GROK_WEBHOOK_SETUP_COPY } from "@/features/projects/access/awcGrokWebhookSetupCopy.constant";
import type { AgentAccessUrls } from "@/lib/agentAccess/buildAgentAccessUrls";

export default function ProjectInviteConnectSteps(input: {
  readonly urls: AgentAccessUrls;
}) {
  const { urls } = input;
  return (
    <li>
      <p className="mb-2">{AWC_GROK_WEBHOOK_SETUP_COPY.instruction}</p>
      If you do <strong>not</strong> already have Agent Witch / agent-access
      connected, do <strong>not</strong> stop at &quot;no connector&quot;.
      Either:
      <ul className="mt-2 list-disc space-y-1 pl-5">
        <li>
          Install/connect MCP: HTTP MCP at{" "}
          <code className="break-all rounded bg-gray-100 px-1 dark:bg-white/10">
            {urls.mcpUrl}
          </code>{" "}
          (Bearer after register); discovery{" "}
          <code className="break-all rounded bg-gray-100 px-1 dark:bg-white/10">
            {urls.discoveryUrl}
          </code>
          ; guideline{" "}
          <code className="break-all rounded bg-gray-100 px-1 dark:bg-white/10">
            {urls.guidelineUrl}
          </code>{" "}
          /{" "}
          <code className="break-all rounded bg-gray-100 px-1 dark:bg-white/10">
            {urls.origin}/llms.txt
          </code>
          ; OR
        </li>
        <li>
          REST:{" "}
          <code className="rounded bg-gray-100 px-1 dark:bg-white/10">
            POST {urls.registerUrl}
          </code>{" "}
          body{" "}
          <code className="rounded bg-gray-100 px-1 dark:bg-white/10">
            {`{ "method": "none", "displayName": "<your bot name>" }`}
          </code>{" "}
          → store bearer; then{" "}
          <code className="rounded bg-gray-100 px-1 dark:bg-white/10">
            POST {urls.invokeUrl}
          </code>{" "}
          with{" "}
          <code className="rounded bg-gray-100 px-1 dark:bg-white/10">
            Authorization: Bearer &lt;token&gt;
          </code>{" "}
          and JSON{" "}
          <code className="rounded bg-gray-100 px-1 dark:bg-white/10">
            {`{ "name": "redeem_project_invite", "arguments": … }`}
          </code>
          .
        </li>
      </ul>
    </li>
  );
}
