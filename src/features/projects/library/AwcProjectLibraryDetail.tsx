"use client";

import { useId } from "react";

import AwcProjectLibraryDetailFields from "@/features/projects/library/AwcProjectLibraryDetailFields";
import AwcProjectLibrarySkillContent from "@/features/projects/library/AwcProjectLibrarySkillContent";
import { PROJECT_PAGE_LIBRARY_ACTIONS_COPY as A } from "@/features/projects/library/projectPageLibraryActionsCopy.constant";
import { PROJECT_PAGE_LIBRARY_COPY as C } from "@/features/projects/library/projectPageLibraryCopy.constant";
import type { AwcProjectLibraryState } from "@/features/projects/library/useAwcProjectLibrary";
import {
  PANEL_BUTTON_PRIMARY_CLASS,
  PANEL_LINK_CLASS,
  PANEL_STATUS_CLASS,
} from "@/features/projects/projectPagePanelChrome.constant";

interface AwcProjectLibraryDetailProps {
  readonly projectId: string;
  readonly itemId: string;
  readonly library: AwcProjectLibraryState;
  readonly canEdit: boolean;
  readonly onToast: (message: string) => void;
  readonly onBack: () => void;
}

/** Item detail. Draft publish: owner only; non-owners see disabled Publish. */
export default function AwcProjectLibraryDetail({
  projectId,
  itemId,
  library,
  canEdit,
  onToast,
  onBack,
}: AwcProjectLibraryDetailProps) {
  const reasonId = useId();
  const item =
    library.items.find((candidate) => candidate.id === itemId) ?? null;
  const skillId = item?.state === "draft" ? item.skillId : null;
  const showPublish = skillId !== null;
  const canPublish = canEdit && showPublish && !library.skills.forbidden;

  return (
    <div className="flex min-w-0 flex-col gap-3">
      <button
        type="button"
        className={`self-start px-1 ${PANEL_LINK_CLASS}`}
        onClick={onBack}
      >
        ← {C["library.detail.back"]}
      </button>
      {item !== null ? (
        <>
          <AwcProjectLibraryDetailFields item={item} />
          {item.skillId !== null ? (
            <AwcProjectLibrarySkillContent
              projectId={projectId}
              skillId={item.skillId}
              updatedAt={item.updatedAt}
            />
          ) : null}
          {showPublish ? (
            <span className="flex flex-col items-start gap-0.5">
              <button
                type="button"
                disabled={!canPublish || library.skills.busy}
                aria-describedby={!canEdit ? reasonId : undefined}
                className={`${PANEL_BUTTON_PRIMARY_CLASS} ${!canEdit ? "cursor-not-allowed" : ""}`}
                onClick={() => {
                  if (!canPublish || skillId === null) return;
                  void library.skills.publish({ skillId }).then((ok) => {
                    if (ok) onToast(A["library.publish.toast"]);
                  });
                }}
              >
                {A["library.publish"]}
              </button>
              {!canEdit ? (
                <span
                  id={reasonId}
                  className="text-xs text-awc-fg-muted dark:text-gray-400"
                >
                  {C["disabled.publish"]}
                </span>
              ) : null}
            </span>
          ) : null}
        </>
      ) : library.isLoading ? (
        <p className={PANEL_STATUS_CLASS}>{C["library.detail.loading"]}</p>
      ) : library.loadFailed ? (
        <p className={PANEL_STATUS_CLASS}>{C["library.detail.error"]}</p>
      ) : (
        <p className={PANEL_STATUS_CLASS}>{C["library.detail.missing"]}</p>
      )}
    </div>
  );
}
