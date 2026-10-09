"use client";

import AwcProjectLibraryDetailActions from "@/features/projects/library/AwcProjectLibraryDetailActions";
import AwcProjectLibraryDetailFields from "@/features/projects/library/AwcProjectLibraryDetailFields";
import AwcProjectLibrarySkillContent from "@/features/projects/library/AwcProjectLibrarySkillContent";
import { PROJECT_PAGE_LIBRARY_COPY as C } from "@/features/projects/library/projectPageLibraryCopy.constant";
import type { AwcProjectLibraryState } from "@/features/projects/library/useAwcProjectLibrary";
import {
  PANEL_LINK_CLASS,
  PANEL_STATUS_CLASS,
} from "@/features/projects/projectPagePanelChrome.constant";

interface AwcProjectLibraryDetailProps {
  readonly projectId: string;
  readonly itemId: string;
  readonly library: AwcProjectLibraryState;
  readonly onToast: (message: string) => void;
  readonly onBack: () => void;
}

/** Item detail — publish and delete use skill ACL from the API (`canPublish` / `canRevoke`). */
export default function AwcProjectLibraryDetail({
  projectId,
  itemId,
  library,
  onToast,
  onBack,
}: AwcProjectLibraryDetailProps) {
  const item =
    library.items.find((candidate) => candidate.id === itemId) ?? null;

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
          <AwcProjectLibraryDetailActions
            item={item}
            library={library}
            onToast={onToast}
            onBack={onBack}
          />
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
