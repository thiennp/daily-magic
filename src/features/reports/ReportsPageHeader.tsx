"use client";

import AppPageHeader from "@/components/surfaces/AppPageHeader";
import useShellNavContext from "@/features/shell/hooks/useShellNavContext";
import { resolveReportsPageSubtitle } from "@/lib/copy/resolveSoloTeamSurfaceCopy";

export default function ReportsPageHeader() {
  const { teamNavEnabled } = useShellNavContext();

  return (
    <AppPageHeader
      title="Reports"
      description={resolveReportsPageSubtitle({ teamNavEnabled })}
    />
  );
}
