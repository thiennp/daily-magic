import { PROJECT_PAGE_LIBRARY_COPY as C } from "@/features/projects/library/projectPageLibraryCopy.constant";
import type { ProjectPageActorRole } from "@/lib/projects/acl/humanInvites/authorizeProjectPageActor";

export const resolveProjectLibraryListFooterNote = (
  pageActorRole: ProjectPageActorRole,
): string | null => {
  if (pageActorRole === "viewer") {
    return C["library.readOnlyNote"];
  }
  if (pageActorRole === "member") {
    return C["library.memberNote"];
  }
  return null;
};
