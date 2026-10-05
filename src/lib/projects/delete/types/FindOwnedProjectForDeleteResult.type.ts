import type UserProjectRecord from "@/lib/projects/types/UserProjectRecord.type";

/** Ownership gate result before any delete runs. */
type FindOwnedProjectForDeleteResult =
  | { readonly kind: "owned"; readonly project: UserProjectRecord }
  | { readonly kind: "not_found" }
  | { readonly kind: "default_project" };

export default FindOwnedProjectForDeleteResult;
