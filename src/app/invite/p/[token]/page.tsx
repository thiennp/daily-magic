import type { Metadata } from "next";

import { AGENT_WITCH_PRODUCT_NAME } from "@/lib/agentWitch/agentWitchProductName.constant";
import { PROJECT_INVITE_URL_PATH_PREFIX } from "@/lib/projects/acl/invites/projectInvite.constants";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: `Bot invite | ${AGENT_WITCH_PRODUCT_NAME}`,
  description:
    "Agent Witch project invites are redeemed via MCP redeem_project_invite — not a browser login.",
  robots: { index: false, follow: false },
};

type PageProps = {
  readonly params: Promise<{ readonly token: string }>;
};

/**
 * Public token-carrier page (no auth). Redeem is MCP-only.
 * A missing page here previously 404'd and phone bots called the invite "dead"
 * even when the DB row was still valid.
 */
export default async function ProjectInviteInstructionsPage({
  params,
}: PageProps) {
  const { token: raw } = await params;
  const token = decodeURIComponent(raw ?? "").trim();
  const hasToken = token.length >= 16;
  const mcpArgs = hasToken
    ? `{ "token": ${JSON.stringify(token)} }`
    : '{ "token": "<paste token from URL path after /invite/p/>" }';

  return (
    <main className="mx-auto max-w-xl px-4 py-12 text-gray-900 dark:text-white">
      <h1 className="text-xl font-semibold">Bot project invite</h1>
      <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">
        This URL carries an invite <strong>token</strong> for Agent Witch bots.
        It is <strong>not</strong> a browser login and does{" "}
        <strong>not</strong> redeem the invite in a human session. A missing
        login does <strong>not</strong> mean the invite is dead.
      </p>
      <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm text-gray-700 dark:text-gray-200">
        <li>
          Be a <strong>pre-registered</strong> agent (agent-access / pairing
          already set up).
        </li>
        <li>
          Extract the token from the path after{" "}
          <code className="rounded bg-gray-100 px-1 dark:bg-white/10">
            {PROJECT_INVITE_URL_PATH_PREFIX}
          </code>
          (or use the value below).
        </li>
        <li>
          Call MCP tool{" "}
          <code className="rounded bg-gray-100 px-1 dark:bg-white/10">
            redeem_project_invite
          </code>{" "}
          with:
          <pre className="mt-2 overflow-x-auto rounded-md border border-gray-200 bg-gray-50 p-3 text-xs dark:border-white/10 dark:bg-white/5">
            {mcpArgs}
          </pre>
        </li>
        <li>
          Wait for the project owner to <strong>Approve</strong> and set your
          project nickname. Membership stays <em>pending</em> until then (no
          scoped key yet).
        </li>
      </ol>
      <p className="mt-6 text-xs text-gray-500 dark:text-gray-400">
        If MCP redeem returns <code>invalid_or_expired_invite</code>, the invite
        may be revoked, expired, or out of uses — ask the owner for a fresh
        invite. Do not treat this page (or a prior 404) as proof the invite is
        dead.
      </p>
    </main>
  );
}
