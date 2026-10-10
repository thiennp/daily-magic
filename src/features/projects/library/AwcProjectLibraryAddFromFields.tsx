"use client";

import { useId } from "react";

import { PROJECT_PAGE_LIBRARY_ACTIONS_COPY as A } from "@/features/projects/library/projectPageLibraryActionsCopy.constant";
import {
  PANEL_INPUT_CLASS,
  PANEL_STATUS_CLASS,
} from "@/features/projects/public-api/types";
import type PublishedCapabilityRecord from "@/lib/capabilities/types/PublishedCapabilityRecord.type";
import type UserProjectRecord from "@/lib/projects/types/UserProjectRecord.type";

interface AwcProjectLibraryAddFromFieldsProps {
  readonly projects: readonly UserProjectRecord[];
  readonly items: readonly PublishedCapabilityRecord[];
  readonly sourceProjectId: string;
  readonly itemId: string;
  readonly onProject: (projectId: string) => void;
  readonly onItem: (itemId: string) => void;
}

/** Project picker → published item picker (sr-only labels). */
export default function AwcProjectLibraryAddFromFields({
  projects,
  items,
  sourceProjectId,
  itemId,
  onProject,
  onItem,
}: AwcProjectLibraryAddFromFieldsProps) {
  const id = useId();

  return (
    <>
      <label htmlFor={`${id}-project`} className="sr-only">
        {A["library.add_from.project.sr"]}
      </label>
      <select
        id={`${id}-project`}
        value={sourceProjectId}
        className={PANEL_INPUT_CLASS}
        onChange={(event) => onProject(event.target.value)}
      >
        <option value="">{A["library.add_from.project.placeholder"]}</option>
        {projects.map((project) => (
          <option key={project.id} value={project.id}>
            {project.name}
          </option>
        ))}
      </select>
      {sourceProjectId !== "" && items.length === 0 ? (
        <p className={PANEL_STATUS_CLASS}>
          {A["library.add_from.empty_items"]}
        </p>
      ) : null}
      {sourceProjectId !== "" && items.length > 0 ? (
        <>
          <label htmlFor={`${id}-item`} className="sr-only">
            {A["library.add_from.item.sr"]}
          </label>
          <select
            id={`${id}-item`}
            value={itemId}
            className={PANEL_INPUT_CLASS}
            onChange={(event) => onItem(event.target.value)}
          >
            <option value="">{A["library.add_from.item.placeholder"]}</option>
            {items.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </>
      ) : null}
    </>
  );
}
