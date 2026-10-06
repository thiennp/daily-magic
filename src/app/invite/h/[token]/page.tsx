import type { Metadata } from "next";

import AwcHumanInviteAcceptPage from "@/features/projects/access/humanInvites/AwcHumanInviteAcceptPage";
import type { HumanInviteAcceptViewState } from "@/features/projects/access/humanInvites/AwcHumanInviteAcceptView";
import { loadHumanInviteAcceptPage } from "@/features/projects/access/humanInvites/loadHumanInviteAcceptPage";
import { AGENT_WITCH_PRODUCT_NAME } from "@/lib/agentWitch/agentWitchProductName.constant";
import { getAuthActor } from "@/lib/auth/auth";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: `Project invite | ${AGENT_WITCH_PRODUCT_NAME}`,
  description: "Accept a human invite to join an AgentWitch project.",
  robots: { index: false, follow: false },
};

type PageProps = {
  readonly params: Promise<{ readonly token: string }>;
};

const missToView = (
  miss: "invalid_token" | "expired" | "revoked" | "already_redeemed",
): HumanInviteAcceptViewState => {
  if (miss === "expired") return "expired";
  if (miss === "revoked") return "revoked";
  if (miss === "already_redeemed") return "used";
  return "invalid";
};

/**
 * Human invite accept: open link or email-locked.
 * Signed-out → Sign up / Log in with return to this URL.
 * Email mismatch → switch account (invite stays usable).
 */
export default async function HumanInviteAcceptRoutePage({
  params,
}: PageProps) {
  const { token: raw } = await params;
  const actor = await getAuthActor();
  const loaded = await loadHumanInviteAcceptPage(raw);

  if (!loaded.ok) {
    return (
      <AwcHumanInviteAcceptPage
        token={loaded.token}
        initialView={missToView(loaded.miss)}
        projectId={null}
        projectName={loaded.projectName ?? "this project"}
        inviterDisplayName={loaded.inviterDisplayName}
        role="member"
        expiresAt={null}
        signedInEmail={actor?.email ?? null}
      />
    );
  }

  const initialView: HumanInviteAcceptViewState = actor
    ? "signed_in"
    : "signed_out";

  return (
    <AwcHumanInviteAcceptPage
      token={loaded.token}
      initialView={initialView}
      projectId={loaded.projectId}
      projectName={loaded.projectName}
      inviterDisplayName={loaded.inviterDisplayName}
      role={loaded.role}
      expiresAt={loaded.expiresAt}
      signedInEmail={actor?.email ?? null}
      accountName={actor?.name ?? null}
      requireEmailMatch={loaded.requireEmailMatch}
      invitedEmailMasked={loaded.invitedEmailMasked}
    />
  );
}
