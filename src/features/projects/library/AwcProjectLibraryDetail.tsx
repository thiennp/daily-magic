"use client";

import AwcProjectLibraryDetailFields from "@/features/projects/library/AwcProjectLibraryDetailFields";
import { PROJECT_PAGE_LIBRARY_ACTIONS_COPY as A } from "@/features/projects/library/projectPageLibraryActionsCopy.constant";
import { PROJECT_PAGE_LIBRARY_COPY as C } from "@/features/projects/library/projectPageLibraryCopy.constant";
import type { AwcProjectLibraryState } from "@/features/projects/library/useAwcProjectLibrary";
import {
  PANEL_BUTTON_PRIMARY_CLASS,
  PANEL_LINK_CLASS,
  PANEL_STATUS_CLASS,
} from "@/features/projects/projectPagePanelChrome.constant";

interface AwcProjectLibraryDetailProps {
  readonly itemId: string;
  readonly library: AwcProjectLibraryState;
  readonly canEdit: boolean;
  readonly onToast: (message: string) => void;
  readonly onBack: () => void;
}

/**
 * Item detail. A draft skill can be published (existing skills API); no
 * remove / unpublish (Product open Qs 5 + 6).
 */
export default function AwcProjectLibraryDetail({
  itemId,
  library,
  canEdit,
  onToast,
  onBack,
}: AwcProjectLibraryDetailProps) {
  const item =
    library.items.find((candidate) => candidate.id === itemId) ?? null;
  const skillId = item?.state === "draft" ? item.skillId : null;
  const canPublish = canEdit && skillId !== null && !library.skills.forbidden;

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
          {canPublish ? (
            <button
              type="button"
              disabled={library.skills.busy}
              className={`self-start ${PANEL_BUTTON_PRIMARY_CLASS}`}
              onClick={() => {
                void library.skills.publish({ skillId }).then((ok) => {
                  if (ok) onToast(A["library.publish.toast"]);
                });
              }}
            >
              {A["library.publish"]}
            </button>
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
