import {
  isProjectAclCoworkForbiddenWriteKind,
  type ProjectAclCoworkForbiddenWriteKind,
} from "@/lib/projects/acl/projectAclCoworkForbidden.constant";

export class ProjectAclCoworkContentWriteRejectedError extends Error {
  readonly kind: ProjectAclCoworkForbiddenWriteKind;

  constructor(kind: ProjectAclCoworkForbiddenWriteKind) {
    super(
      `AWC cowork must not store ${kind}. Use local↔local sync after membership grant.`,
    );
    this.name = "ProjectAclCoworkContentWriteRejectedError";
    this.kind = kind;
  }
}

/** Hard reject any accidental cowork content write path. */
export const rejectCoworkContentWrite = (kind: string): never => {
  if (!isProjectAclCoworkForbiddenWriteKind(kind)) {
    throw new ProjectAclCoworkContentWriteRejectedError("handoff");
  }
  throw new ProjectAclCoworkContentWriteRejectedError(kind);
};
