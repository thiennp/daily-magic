import type { Metadata } from "next";

import ProjectInviteInstructionsBody from "@/features/projects/access/invites/ProjectInviteInstructionsBody";
import { AGENT_WITCH_PRODUCT_NAME } from "@/lib/agentWitch/agentWitchProductName.constant";
import { peekProjectInviteByToken } from "@/lib/projects/acl/invites/peekProjectInviteByToken";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: `Assistant invite | ${AGENT_WITCH_PRODUCT_NAME}`,
  description:
    "Agent Witch project invites are for AI assistants. Give the Copy prompt to your assistant — this page is not a browser login.",
  robots: { index: false, follow: false },
};

type PageProps = {
  readonly params: Promise<{ readonly token: string }>;
};

/**
 * Public token-carrier page (no auth). For assistants / Copy prompt — not browser login.
 */
export default async function ProjectInviteInstructionsPage({
  params,
}: PageProps) {
  const { token: raw } = await params;
  const token = decodeURIComponent(raw ?? "").trim();
  const hasToken = token.length >= 16;
  const peeked = hasToken ? await peekProjectInviteByToken(token) : { ok: false as const };
  const autoApprove = peeked.ok ? peeked.invite.autoApprove : false;

  return (
    <main className="mx-auto max-w-xl px-4 py-12 text-gray-900 dark:text-white">
      <h1 className="text-xl font-semibold">Assistant project invite</h1>
      <ProjectInviteInstructionsBody
        token={token}
        hasToken={hasToken}
        autoApprove={autoApprove}
      />
    </main>
  );
}
