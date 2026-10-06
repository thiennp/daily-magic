"use client";

import { useState } from "react";

import forkCapabilityToLibrary from "@/features/harness/hooks/forkCapabilityToLibrary";
import AwcProjectLibraryAddFromFields from "@/features/projects/library/AwcProjectLibraryAddFromFields";
import { PROJECT_PAGE_LIBRARY_ACTIONS_COPY as A } from "@/features/projects/library/projectPageLibraryActionsCopy.constant";
import type { AwcProjectLibraryState } from "@/features/projects/library/useAwcProjectLibrary";
import useAwcProjectLibraryAddFrom from "@/features/projects/library/useAwcProjectLibraryAddFrom";
import {
  PANEL_BUTTON_PRIMARY_CLASS,
  PANEL_BUTTON_SECONDARY_CLASS,
  PANEL_HEADING_CLASS,
  PANEL_INTRO_CLASS,
  PANEL_STATUS_CLASS,
} from "@/features/projects/projectPagePanelChrome.constant";
import { fillProjectPageCopy } from "@/features/projects/utils/fillProjectPageCopy";
import type UserProjectRecord from "@/lib/projects/types/UserProjectRecord.type";

interface AwcProjectLibraryAddFromProps {
  readonly project: UserProjectRecord;
  readonly library: AwcProjectLibraryState;
  readonly onDone: (toast: string | null) => void;
}

/** Add from another project: pick a published item; a copy (fork) lands here. */
export default function AwcProjectLibraryAddFrom({
  project,
  library,
  onDone,
}: AwcProjectLibraryAddFromProps) {
  const source = useAwcProjectLibraryAddFrom({
    projectId: project.id,
    capabilities: library.capabilities,
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
    library.reload();
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
      {!source.isLoading && source.sourceProjects.length === 0 ? (
        <p className={PANEL_STATUS_CLASS}>
          {A["library.add_from.empty_projects"]}
        </p>
      ) : (
        <AwcProjectLibraryAddFromFields
          projects={source.sourceProjects}
          items={items}
          sourceProjectId={sourceProjectId}
          itemId={itemId}
          onProject={(id) => {
            setSourceProjectId(id);
            setItemId("");
          }}
          onItem={setItemId}
        />
      )}
      {error !== null ? (
        <p role="alert" className={PANEL_STATUS_CLASS}>
          {error}
        </p>
      ) : null}
      <span className="flex flex-wrap gap-2">
        <button
          type="submit"
          disabled={busy || itemId === ""}
          className={PANEL_BUTTON_PRIMARY_CLASS}
        >
          {A["library.add_from.submit"]}
        </button>
        <button
          type="button"
          className={PANEL_BUTTON_SECONDARY_CLASS}
          onClick={() => onDone(null)}
        >
          {A["library.add_from.cancel"]}
        </button>
      </span>
    </form>
  );
}
