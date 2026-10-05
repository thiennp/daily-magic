"use client";

import { useRouter } from "next/navigation";
import { useCallback, useMemo, useState } from "react";

import AwcHumanInviteAcceptView, {
  type HumanInviteAcceptViewState,
} from "@/features/projects/access/humanInvites/AwcHumanInviteAcceptView";
import { acceptHumanInviteApi } from "@/features/projects/access/humanInvites/humanInviteApi";
import type { HumanInviteRole } from "@/features/projects/access/humanInvites/types/humanInviteUiContract.type";

export type AwcHumanInviteAcceptPageProps = {
  readonly token: string;
  readonly initialView: HumanInviteAcceptViewState;
  readonly projectId: string | null;
  readonly projectName: string;
  readonly inviterDisplayName: string;
  readonly role: HumanInviteRole;
  readonly expiresAt: string | null;
  readonly signedInEmail: string | null;
};

const expiresInLabel = (expiresAt: string | null): string => {
  if (!expiresAt) return "expires soon";
  const ms = new Date(expiresAt).getTime() - Date.now();
  if (!Number.isFinite(ms) || ms <= 0) return "expired";
  const days = Math.max(1, Math.ceil(ms / (24 * 60 * 60 * 1000)));
  return days === 1 ? "expires in 1 day" : `expires in ${days} days`;
};

const mapAcceptError = (
  status: number,
  code?: string,
): HumanInviteAcceptViewState => {
  if (status === 401) return "signed_out";
  if (code === "expired") return "expired";
  if (code === "revoked") return "revoked";
  if (code === "already_redeemed") return "used";
  if (code === "already_member" || code === "already_owner") {
    return "already_member";
  }
  if (code === "invalid_token") return "invalid";
  return "invalid";
};

/** Client accept flow: POST /api/invite/h/{token}/accept + Product error copy. */
export default function AwcHumanInviteAcceptPage({
  token,
  initialView,
  projectId,
  projectName,
  inviterDisplayName,
  role,
  expiresAt,
  signedInEmail,
}: AwcHumanInviteAcceptPageProps) {
  const router = useRouter();
  const [viewState, setViewState] =
    useState<HumanInviteAcceptViewState>(initialView);
  const [busy, setBusy] = useState(false);

  const authReturn = useMemo(() => {
    const path = `/invite/h/${encodeURIComponent(token)}`;
    return `/login?callbackUrl=${encodeURIComponent(path)}`;
  }, [token]);

  const goAuth = useCallback(() => {
    router.push(authReturn);
  }, [authReturn, router]);

  const onAccept = useCallback(() => {
    setBusy(true);
    void acceptHumanInviteApi(token).then((result) => {
      setBusy(false);
      if (result.ok === true) {
        router.push(`/projects/${result.projectId}`);
        return;
      }
      setViewState(mapAcceptError(result.status, result.code));
    });
  }, [router, token]);

  const onOpenProject = useCallback(() => {
    if (projectId) {
      router.push(`/projects/${projectId}`);
      return;
    }
    router.push("/projects");
  }, [projectId, router]);

  return (
    <AwcHumanInviteAcceptView
      viewState={viewState}
      projectName={projectName}
      inviterDisplayName={inviterDisplayName}
      role={role}
      expiresInLabel={expiresInLabel(expiresAt)}
      signedInEmail={signedInEmail}
      busy={busy}
      onAccept={onAccept}
      onSignUp={goAuth}
      onLogIn={goAuth}
      onOpenProject={onOpenProject}
    />
  );
}
