"use client";

import { useId } from "react";

import { PROJECT_PAGE_LIBRARY_ACTIONS_COPY as A } from "@/features/projects/library/projectPageLibraryActionsCopy.constant";
import { PROJECT_PAGE_LIBRARY_COPY as C } from "@/features/projects/library/projectPageLibraryCopy.constant";
import type { AwcProjectLibraryState } from "@/features/projects/library/useAwcProjectLibrary";
import type { ProjectLibraryItem } from "@/features/projects/library/utils/buildProjectLibraryItems";
import { resolveProjectLibrarySkillDelete } from "@/features/projects/library/utils/resolveProjectLibrarySkillDelete";
import {
  PANEL_BUTTON_PRIMARY_CLASS,
  PANEL_BUTTON_SECONDARY_CLASS,
} from "@/features/projects/projectPagePanelChrome.constant";

const PANEL_BUTTON_DANGER_CLASS = `${PANEL_BUTTON_SECONDARY_CLASS} border-red-300 text-red-700 hover:border-red-400 dark:border-red-800 dark:text-red-300`;

interface AwcProjectLibraryDetailActionsProps {
  readonly item: ProjectLibraryItem;
  readonly library: AwcProjectLibraryState;
  readonly onToast: (message: string) => void;
  readonly onBack: () => void;
}

/** Publish draft + delete skill (owner or member draft) on library detail. */
export default function AwcProjectLibraryDetailActions({
  item,
  library,
  onToast,
  onBack,
}: AwcProjectLibraryDetailActionsProps) {
  const reasonId = useId();
  const skillId = item.skillId;
  const skillView =
    skillId === null
      ? undefined
      : library.skills.skills.find((row) => row.skillId === skillId);
  const showPublish = item.state === "draft" && skillId !== null;
  const canPublish =
    showPublish && !library.skills.forbidden && skillView?.canPublish === true;
  const deleteUi = resolveProjectLibrarySkillDelete(skillView, skillId);

  if (!showPublish && !deleteUi.show) {
    return null;
  }

  return (
    <div className="flex flex-wrap items-start gap-3">
      {showPublish ? (
        <span className="flex flex-col items-start gap-0.5">
          <button
            type="button"
            disabled={!canPublish || library.skills.busy}
            aria-describedby={!canPublish ? reasonId : undefined}
            className={`${PANEL_BUTTON_PRIMARY_CLASS} ${!canPublish ? "cursor-not-allowed" : ""}`}
            onClick={() => {
              if (!canPublish || skillId === null) return;
              void library.skills.publish({ skillId }).then((ok) => {
                if (ok) onToast(A["library.publish.toast"]);
              });
            }}
          >
            {A["library.publish"]}
          </button>
          {!canPublish ? (
            <span
              id={reasonId}
              className="text-xs text-awc-fg-muted dark:text-gray-400"
            >
              {C["disabled.publish"]}
            </span>
          ) : null}
        </span>
      ) : null}
      {deleteUi.show ? (
        <span className="flex flex-col items-start gap-0.5">
          <button
            type="button"
            disabled={!deleteUi.canDelete || library.skills.busy}
            aria-describedby={
              !deleteUi.canDelete ? `${reasonId}-delete` : undefined
            }
            className={`${PANEL_BUTTON_DANGER_CLASS} ${!deleteUi.canDelete ? "cursor-not-allowed" : ""}`}
            onClick={() => {
              if (!deleteUi.canDelete || skillId === null) return;
              void library.skills.revoke(skillId).then((ok) => {
                if (ok) {
                  onToast(A["library.delete.toast"]);
                  onBack();
                }
              });
            }}
          >
            {deleteUi.isDraft ? A["library.delete.draft"] : A["library.delete"]}
          </button>
          {!deleteUi.canDelete ? (
            <span
              id={`${reasonId}-delete`}
              className="text-xs text-awc-fg-muted dark:text-gray-400"
            >
              {C["disabled.delete"]}
            </span>
          ) : null}
        </span>
      ) : null}
    </div>
  );
}
