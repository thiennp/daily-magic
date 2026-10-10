"use client";

import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useCallback, useMemo, useState } from "react";

import type { HumanInviteAcceptViewState } from "@/features/projects/access/humanInvites/AwcHumanInviteAcceptView";
import { acceptHumanInviteApi } from "@/features/projects/access/humanInvites/humanInviteApi";
import { mapAcceptError } from "@/features/projects/access/humanInvites/utils/public-api/presentation";
import {
  checkHumanAcceptNickname,
  initialHumanAcceptNickname,
  isHumanAcceptNamingError,
} from "@/features/projects/access/humanInvites/utils/public-api/presentation";
import { mapProjectAccessError } from "@/lib/projects/acl/mapProjectAccessError";

export const useHumanInviteAcceptFlow = (input: {
  readonly token: string;
  readonly initialView: HumanInviteAcceptViewState;
  readonly projectId: string | null;
  readonly expiresAt: string | null;
  readonly accountName: string | null;
  readonly invitedEmailMasked: string | null;
}) => {
  const router = useRouter();
  const [viewState, setViewState] = useState(input.initialView);
  const [busy, setBusy] = useState(false);
  const [joinError, setJoinError] = useState(false);
  const [nickname, setNickname] = useState(() =>
    initialHumanAcceptNickname(input.accountName),
  );
  const [nicknameError, setNicknameError] = useState<string | null>(null);
  const [maskedEmail, setMaskedEmail] = useState(input.invitedEmailMasked);

  const authReturn = useMemo(() => {
    const invitePath = `/invite/h/${encodeURIComponent(input.token)}`;
    return `/login?callbackUrl=${encodeURIComponent(invitePath)}`;
  }, [input.token]);

  const goAuth = useCallback(() => {
    router.push(authReturn);
  }, [authReturn, router]);

  const onSwitchAccount = useCallback(() => {
    void signOut({ callbackUrl: authReturn });
  }, [authReturn]);

  const onAccept = useCallback(() => {
    const checked = checkHumanAcceptNickname(nickname);
    if (!checked.ok) {
      setNicknameError(checked.errorMessage);
      return;
    }
    setNicknameError(null);
    setJoinError(false);
    setBusy(true);
    void acceptHumanInviteApi(input.token, {
      suggestedProjectDisplayName: checked.name,
    })
      .catch(() => null)
      .then((result) => {
        setBusy(false);
        if (result === null) {
          setJoinError(true);
          return;
        }
        if (result.ok === true && result.awaitingApproval === true) {
          setViewState("awaiting_approval");
          return;
        }
        if (result.ok === true) {
          router.push(`/projects/${result.projectId}`);
          return;
        }
        if (isHumanAcceptNamingError(result.code)) {
          setNicknameError(
            result.errorMessage ?? mapProjectAccessError(result.code),
          );
          if (result.suggestedProjectDisplayName) {
            setNickname(result.suggestedProjectDisplayName);
          }
          return;
        }
        if (result.invitedEmailMasked) {
          setMaskedEmail(result.invitedEmailMasked);
        }
        if (result.status >= 500) {
          setJoinError(true);
          return;
        }
        setViewState(mapAcceptError(result.status, result.code));
      });
  }, [input.token, nickname, router]);

  const onNicknameChange = useCallback((value: string) => {
    setNickname(value);
    setNicknameError(null);
  }, []);

  const onOpenProject = useCallback(() => {
    if (input.projectId) {
      router.push(`/projects/${input.projectId}`);
      return;
    }
    router.push("/projects");
  }, [input.projectId, router]);

  return {
    viewState,
    busy,
    joinError,
    nickname,
    nicknameError,
    maskedEmail,
    goAuth,
    onSwitchAccount,
    onAccept,
    onNicknameChange,
    onOpenProject,
  };
};
