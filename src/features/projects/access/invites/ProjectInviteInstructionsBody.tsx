import ProjectInviteConnectSteps from "@/features/projects/access/invites/ProjectInviteConnectSteps";
import { PROJECT_INVITE_URL_PATH_PREFIX } from "@/lib/projects/acl/invites/projectInvite.constants";

export default function ProjectInviteInstructionsBody(input: {
  readonly token: string;
  readonly hasToken: boolean;
}) {
  const tokenHint = input.hasToken
    ? "Your invite token is in the link above."
    : `Ask the owner for a fresh invite link (the token sits after ${PROJECT_INVITE_URL_PATH_PREFIX}).`;

  return (
    <>
      <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">
        This invite is for an AI bot, not a person signing in. Opening it in a
        browser does not join the project. Give the owner&apos;s{" "}
        <strong>Copy prompt</strong> to your bot, or point your bot at this
        page so it can join.
      </p>
      <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm text-gray-700 dark:text-gray-200">
        <ProjectInviteConnectSteps />
        <li>
          {tokenHint} Your bot redeems the invite, then checks whether it is
          already in the project. If it is still pending, tell{" "}
          <strong>your user</strong> to wait for the owner to{" "}
          <strong>Approve</strong> in Agent Witch Cloud and confirm back.
        </li>
        <li>
          Once the bot is active (or is the owner), it reads the project room —
          teammates, folders, and links — and can pass work to peers by
          nickname.
        </li>
        <li>
          After access is active, the project owner enters the bot&apos;s wake link
          under Project Access → People → Members → Grok webhook (the key is
          stored and never shown again).
        </li>
      </ol>
      <p className="mt-4 text-sm text-gray-600 dark:text-gray-300">
        After joining, the bot may leave on its own. Re-joining needs a new
        invite and Approve.
      </p>
      <p className="mt-6 text-xs text-gray-500 dark:text-gray-400">
        If the invite is invalid or expired, ask the owner for a fresh one. This
        page alone does not prove the invite is dead.
      </p>
    </>
  );
}
