"use client";

import { useRouter } from "next/navigation";
import { useCallback, useMemo, useState } from "react";

import AwcHumanInviteAcceptView, {
  type HumanInviteAcceptViewState,
} from "@/features/projects/access/humanInvites/AwcHumanInviteAcceptView";
import { acceptHumanInviteApi } from "@/features/projects/access/humanInvites/humanInviteApi";
import type { HumanInviteRole } from "@/features/projects/access/humanInvites/types/humanInviteUiContract.type";
import {
  checkHumanAcceptNickname,
  initialHumanAcceptNickname,
  isHumanAcceptNamingError,
} from "@/features/projects/access/humanInvites/utils/resolveHumanAcceptNickname";
import { mapProjectAccessError } from "@/lib/projects/acl/mapProjectAccessError";

export type AwcHumanInviteAcceptPageProps = {
  readonly token: string;
  readonly initialView: HumanInviteAcceptViewState;
  readonly projectId: string | null;
  readonly projectName: string;
  readonly inviterDisplayName: string;
  readonly role: HumanInviteRole;
  readonly expiresAt: string | null;
  readonly signedInEmail: string | null;
  /** Account name (users.name) — prefills the project nickname. */
  readonly accountName?: string | null;
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
  accountName = null,
}: AwcHumanInviteAcceptPageProps) {
  const router = useRouter();
  const [viewState, setViewState] =
    useState<HumanInviteAcceptViewState>(initialView);
  const [busy, setBusy] = useState(false);
  const [nickname, setNickname] = useState(() =>
    initialHumanAcceptNickname(accountName),
  );
  const [nicknameError, setNicknameError] = useState<string | null>(null);

  const authReturn = useMemo(() => {
    const path = `/invite/h/${encodeURIComponent(token)}`;
    return `/login?callbackUrl=${encodeURIComponent(path)}`;
  }, [token]);

  const goAuth = useCallback(() => {
    router.push(authReturn);
  }, [authReturn, router]);

  const onAccept = useCallback(() => {
    const checked = checkHumanAcceptNickname(nickname);
    if (!checked.ok) {
      setNicknameError(checked.errorMessage);
      return;
    }
    setNicknameError(null);
    setBusy(true);
    void acceptHumanInviteApi(token, {
      suggestedProjectDisplayName: checked.name,
    }).then((result) => {
      setBusy(false);
      if (result.ok === true) {
        router.push(`/projects/${result.projectId}`);
        return;
      }
      if (isHumanAcceptNamingError(result.code)) {
        // Invite not consumed: show error, prefill, let the user retry.
        setNicknameError(
          result.errorMessage ?? mapProjectAccessError(result.code),
        );
        if (result.suggestedProjectDisplayName) {
          setNickname(result.suggestedProjectDisplayName);
        }
        return;
      }
      setViewState(mapAcceptError(result.status, result.code));
    });
  }, [nickname, router, token]);

  const onNicknameChange = useCallback((value: string) => {
    setNickname(value);
    setNicknameError(null);
  }, []);

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
      nickname={nickname}
      nicknameError={nicknameError}
      onNicknameChange={onNicknameChange}
      onAccept={onAccept}
      onSignUp={goAuth}
      onLogIn={goAuth}
      onOpenProject={onOpenProject}
    />
  );
}
