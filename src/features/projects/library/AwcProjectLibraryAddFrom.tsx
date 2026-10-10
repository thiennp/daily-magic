"use client";

import { useState } from "react";

import { forkCapabilityToLibrary } from "@/features/harness/public-api/presentation";
import { useLibraryCapabilities } from "@/features/library/public-api/presentation";
import AwcProjectLibraryAddFromForm from "@/features/projects/library/AwcProjectLibraryAddFromForm";
import { PROJECT_PAGE_LIBRARY_ACTIONS_COPY as A } from "@/features/projects/library/projectPageLibraryActionsCopy.constant";
import useAwcProjectLibraryAddFrom from "@/features/projects/library/useAwcProjectLibraryAddFrom";
import {
  PANEL_HEADING_CLASS,
  PANEL_INTRO_CLASS,
} from "@/features/projects/projectPagePanelChrome.constant";
import { fillProjectPageCopy } from "@/features/projects/utils/public-api/presentation";
import type UserProjectRecord from "@/lib/projects/types/UserProjectRecord.type";

interface Props {
  readonly project: UserProjectRecord;
  readonly onAdded: () => void;
  readonly onDone: (toast: string | null) => void;
}

/** Add from another project via /mine → fork into this project. */
export default function AwcProjectLibraryAddFrom({
  project,
  onAdded,
  onDone,
}: Props) {
  const mine = useLibraryCapabilities();
  const source = useAwcProjectLibraryAddFrom({
    projectId: project.id,
    capabilities: mine.capabilities,
  });
  const [sourceProjectId, setSourceProjectId] = useState("");
  const [itemId, setItemId] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const items = sourceProjectId === "" ? [] : source.itemsFor(sourceProjectId);

  const submit = async (): Promise<void> => {
    setBusy(true);
    const result = await forkCapabilityToLibrary(itemId, project.id);
    setBusy(false);
    if (!result.ok) {
      setError(result.errorMessage);
      return;
    }
    onAdded();
    onDone(
      fillProjectPageCopy(A["library.add_from.toast"], {
        project: project.name,
      }),
    );
  };

  return (
    <form
      className="flex min-w-0 flex-col gap-2 px-1"
      onSubmit={(event) => {
        event.preventDefault();
        void submit();
      }}
    >
      <h4 className={PANEL_HEADING_CLASS}>{A["library.add_from.heading"]}</h4>
      <p className={PANEL_INTRO_CLASS}>{A["library.add_from.intro"]}</p>
      <AwcProjectLibraryAddFromForm
        empty={
          !source.isLoading &&
          !mine.isLoading &&
          source.sourceProjects.length === 0
        }
        projects={source.sourceProjects}
        items={items}
        sourceProjectId={sourceProjectId}
        itemId={itemId}
        busy={busy}
        error={error}
        onProject={(id) => {
          setSourceProjectId(id);
          setItemId("");
        }}
        onItem={setItemId}
        onCancel={() => onDone(null)}
      />
    </form>
  );
}
