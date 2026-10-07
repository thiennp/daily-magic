import ProjectInviteConnectSteps from "@/features/projects/access/invites/ProjectInviteConnectSteps";
import { AWC_PROJECT_INVITE_AUTO_APPROVE_COPY } from "@/features/projects/access/invites/awcProjectInviteAutoApproveCopy.constant";
import { PROJECT_INVITE_URL_PATH_PREFIX } from "@/lib/projects/acl/invites/projectInvite.constants";

export default function ProjectInviteInstructionsBody(input: {
  readonly token: string;
  readonly hasToken: boolean;
  /** When known from invite peek or a freshly created invite with auto-approve on. */
  readonly autoApprove?: boolean;
}) {
  const tokenHint = input.hasToken
    ? "Your invite code is in the link above."
    : `Ask the owner for a fresh invite link (the code is the part after ${PROJECT_INVITE_URL_PATH_PREFIX}).`;
  const waitLine = input.autoApprove
    ? AWC_PROJECT_INVITE_AUTO_APPROVE_COPY.humanPageAutoApproveOn
    : AWC_PROJECT_INVITE_AUTO_APPROVE_COPY.humanPageDefault;

  return (
    <>
      <p className="mt-3 text-sm text-awc-fg-muted dark:text-gray-300">
        This invite is for an AI assistant, not a person signing in. Opening it
        in a browser does not join the project. Give the owner&apos;s{" "}
        <strong>Copy prompt</strong> to your assistant, or point your assistant
        at this page so it can join.
      </p>
      <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm text-awc-fg dark:text-gray-200">
        <ProjectInviteConnectSteps />
        <li>
          {tokenHint} {waitLine}
        </li>
        <li>
          Once the assistant is active, it reads the project room — teammates,
          folders, and links — and can pass work to peers by nickname.
        </li>
        <li>{AWC_PROJECT_INVITE_AUTO_APPROVE_COPY.humanPageWake}</li>
      </ol>
      <p className="mt-4 text-sm text-awc-fg-muted dark:text-gray-300">
        After joining, the assistant may leave on its own. Re-joining needs a
        new invite and Approve (unless the owner turns on auto-approve for a
        new invite).
      </p>
      <p className="mt-6 text-xs text-awc-fg-muted dark:text-gray-400">
        If the invite is invalid or expired, ask the owner for a fresh one. This
        page alone does not prove the invite is dead.
      </p>
    </>
  );
}
