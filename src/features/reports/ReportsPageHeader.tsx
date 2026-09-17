"use client";

import AppPageHeader from "@/components/surfaces/AppPageHeader";
import { useGuestSessionState } from "@/features/empty-states/useGuestSessionState";
import useShellNavContext from "@/features/shell/hooks/useShellNavContext";
import { resolveReportsPageSubtitle } from "@/lib/copy/resolveSoloTeamSurfaceCopy";

export default function ReportsPageHeader() {
  const { teamNavEnabled } = useShellNavContext();
  const { sessionState } = useGuestSessionState();
  const description =
    sessionState === "signed_in"
      ? resolveReportsPageSubtitle({ teamNavEnabled })
      : undefined;

  return <AppPageHeader title="Reports" description={description} />;
}
