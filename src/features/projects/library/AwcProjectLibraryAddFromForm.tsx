"use client";

import AwcProjectLibraryAddFromFields from "@/features/projects/library/AwcProjectLibraryAddFromFields";
import { PROJECT_PAGE_LIBRARY_ACTIONS_COPY as A } from "@/features/projects/library/projectPageLibraryActionsCopy.constant";
import {
  PANEL_BUTTON_PRIMARY_CLASS,
  PANEL_BUTTON_SECONDARY_CLASS,
  PANEL_STATUS_CLASS,
} from "@/features/projects/projectPagePanelChrome.constant";
import type PublishedCapabilityRecord from "@/lib/capabilities/types/PublishedCapabilityRecord.type";
import type UserProjectRecord from "@/lib/projects/types/UserProjectRecord.type";

interface Props {
  readonly empty: boolean;
  readonly projects: readonly UserProjectRecord[];
  readonly items: readonly PublishedCapabilityRecord[];
  readonly sourceProjectId: string;
  readonly itemId: string;
  readonly busy: boolean;
  readonly error: string | null;
  readonly onProject: (id: string) => void;
  readonly onItem: (id: string) => void;
  readonly onCancel: () => void;
}

/** Fields + submit/cancel for Add from another project. */
export default function AwcProjectLibraryAddFromForm({
  empty,
  projects,
  items,
  sourceProjectId,
  itemId,
  busy,
  error,
  onProject,
  onItem,
  onCancel,
}: Props) {
  if (empty) {
    return (
      <p className={PANEL_STATUS_CLASS}>
        {A["library.add_from.empty_projects"]}
      </p>
    );
  }
  return (
    <>
      <AwcProjectLibraryAddFromFields
        projects={projects}
        items={items}
        sourceProjectId={sourceProjectId}
        itemId={itemId}
        onProject={onProject}
        onItem={onItem}
      />
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
          onClick={onCancel}
        >
          {A["library.add_from.cancel"]}
        </button>
      </span>
    </>
  );
}
