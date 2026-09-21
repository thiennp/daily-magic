"use client";

import AppPageHeader from "@/components/surfaces/AppPageHeader";
import { useGuestSessionState } from "@/features/empty-states/useGuestSessionState";
import useShellNavContext from "@/features/shell/hooks/useShellNavContext";
import { resolveLibraryPageSubtitle } from "@/lib/copy/resolveSoloTeamSurfaceCopy";

export default function LibraryPageHeader() {
  const { teamNavEnabled } = useShellNavContext();
  const { sessionState } = useGuestSessionState();
  const description =
    sessionState === "signed_in"
      ? resolveLibraryPageSubtitle({ teamNavEnabled })
      : "Draft playbooks on this browser; sign in to sync the newest copy to your account and Mac.";

  return <AppPageHeader title="Library" description={description} />;
}
