import { PROJECT_PAGE_LIBRARY_COPY as C } from "@/features/projects/library/projectPageLibraryCopy.constant";
import type {
  ProjectLibraryItem,
  ProjectLibraryKind,
} from "@/features/projects/library/utils/buildProjectLibraryItems";

/** Singular kind + state labels for rows and detail. */
export const PROJECT_LIBRARY_KIND_LABEL: Readonly<
  Record<ProjectLibraryKind, string>
> = {
  playbook: C["library.kind.playbook"],
  workflow: C["library.kind.workflow"],
  skill: C["library.kind.skill"],
};

export const PROJECT_LIBRARY_STATE_LABEL: Readonly<
  Record<ProjectLibraryItem["state"], string>
> = {
  draft: C["library.state.draft"],
  published: C["library.state.published"],
};
