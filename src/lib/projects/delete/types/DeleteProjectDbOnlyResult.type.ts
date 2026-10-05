/** Outcome of the owner-only, DB-only project delete. */
type DeleteProjectDbOnlyResult =
  | { readonly ok: true; readonly projectId: string }
  | {
      readonly ok: false;
      readonly code: "not_found" | "not_owner" | "default_project";
    };

export default DeleteProjectDbOnlyResult;
