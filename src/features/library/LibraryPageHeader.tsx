"use client";

import AppPageHeader from "@/components/surfaces/AppPageHeader";
import useShellNavContext from "@/features/shell/hooks/useShellNavContext";
import { resolveLibraryPageSubtitle } from "@/lib/copy/resolveSoloTeamSurfaceCopy";

export default function LibraryPageHeader() {
  const { teamNavEnabled } = useShellNavContext();

  return (
    <AppPageHeader
      title="Library"
      description={resolveLibraryPageSubtitle({ teamNavEnabled })}
    />
  );
}
