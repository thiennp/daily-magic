import ProjectInviteConnectSteps from "@/features/projects/access/invites/ProjectInviteConnectSteps";
import { buildAgentAccessUrls } from "@/lib/agentAccess/buildAgentAccessUrls";
import { PROJECT_INVITE_URL_PATH_PREFIX } from "@/lib/projects/acl/invites/projectInvite.constants";

export default function ProjectInviteInstructionsBody(input: {
  readonly token: string;
  readonly hasToken: boolean;
}) {
  const urls = buildAgentAccessUrls();
  const mcpArgs = input.hasToken
    ? `{ "token": ${JSON.stringify(input.token)} }`
    : '{ "token": "<paste token from URL path after /invite/p/>" }';

  return (
    <>
      <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">
        This URL carries an invite <strong>token</strong> for Agent Witch bots.
        It is <strong>not</strong> a browser login and does <strong>not</strong>{" "}
        redeem the invite in a human session. A missing login or missing
        connector does <strong>not</strong> mean the invite is dead.
      </p>
      <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm text-gray-700 dark:text-gray-200">
        <ProjectInviteConnectSteps urls={urls} />
        <li>
          Extract the token after{" "}
          <code className="rounded bg-gray-100 px-1 dark:bg-white/10">
            {PROJECT_INVITE_URL_PATH_PREFIX}
          </code>
          . Call{" "}
          <code className="rounded bg-gray-100 px-1 dark:bg-white/10">
            redeem_project_invite
          </code>
          :
          <pre className="mt-2 overflow-x-auto rounded-md border border-gray-200 bg-gray-50 p-3 text-xs dark:border-white/10 dark:bg-white/5">
            {mcpArgs}
          </pre>
          Then tell <strong>your user</strong> to wait for the owner to{" "}
          <strong>Approve</strong> in Agent Witch Cloud and confirm back — do
          not busy-poll forever.
        </li>
        <li>
          On user confirm:{" "}
          <code className="rounded bg-gray-100 px-1 dark:bg-white/10">
            get_my_project_access
          </code>{" "}
          until active,{" "}
          <code className="rounded bg-gray-100 px-1 dark:bg-white/10">
            rotate_project_api_key
          </code>{" "}
          (store <code>awc_proj_…</code> for REST only — keep MCP Bearer; do not
          swap),{" "}
          <code className="rounded bg-gray-100 px-1 dark:bg-white/10">
            get_project_acl
          </code>
          , then <strong>required</strong>{" "}
          <code className="rounded bg-gray-100 px-1 dark:bg-white/10">
            list_project_peers
          </code>{" "}
          (
          <code className="rounded bg-gray-100 px-1 dark:bg-white/10">
            projectDisplayName
          </code>
          ,{" "}
          <code className="rounded bg-gray-100 px-1 dark:bg-white/10">
            teamLabel
          </code>
          ,{" "}
          <code className="rounded bg-gray-100 px-1 dark:bg-white/10">
            isAgent
          </code>
          ). Print a human summary before further work; use{" "}
          <code className="rounded bg-gray-100 px-1 dark:bg-white/10">
            project_dispatch
          </code>{" "}
          to send/receive work with peers.
        </li>
      </ol>
      <p className="mt-4 text-sm text-gray-600 dark:text-gray-300">
        After joining, the bot may{" "}
        <strong>leave / disconnect itself</strong> without owner Approve via{" "}
        <code className="rounded bg-gray-100 px-1 dark:bg-white/10">
          leave_project
        </code>{" "}
        with{" "}
        <code className="rounded bg-gray-100 px-1 dark:bg-white/10">
          {'{ "projectId": "<id>", "confirm": true }'}
        </code>{" "}
        (agent-access Bearer only — not <code>awc_proj_</code>). Re-join needs a
        new request + Approve.
      </p>
      <p className="mt-6 text-xs text-gray-500 dark:text-gray-400">
        If redeem returns <code>invalid_or_expired_invite</code>, ask the owner
        for a fresh invite. Do not treat this page as proof the invite is dead.
      </p>
    </>
  );
}
