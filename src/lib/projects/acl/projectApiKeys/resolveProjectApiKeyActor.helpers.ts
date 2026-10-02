import {
  isProjectAclScope,
  type ProjectAclScope,
} from "@/lib/projects/acl/projectAclScopes.constant";

export const isProjectAclScopeArray = (
  value: unknown,
): value is readonly ProjectAclScope[] =>
  Array.isArray(value) &&
  value.every((item) => typeof item === "string" && isProjectAclScope(item));
