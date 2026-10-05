import { describe, expect, it } from "vitest";

import {
  isProjectAclCoworkForbiddenWriteKind,
  PROJECT_ACL_COWORK_FORBIDDEN_WRITE_KINDS,
} from "@/lib/projects/acl/projectAclCoworkForbidden.constant";
import {
  ProjectAclCoworkContentWriteRejectedError,
  rejectCoworkContentWrite,
} from "@/lib/projects/acl/rejectCoworkContentWrite";

describe("rejectCoworkContentWrite", () => {
  it("rejects handoff and other forbidden cowork content kinds", () => {
    expect(() => rejectCoworkContentWrite("handoff")).toThrow(
      ProjectAclCoworkContentWriteRejectedError,
    );
    expect(() => rejectCoworkContentWrite("shared_memory")).toThrow(
      /local↔local/,
    );
  });

  it("carves out project skill bodies (Lead-approved publish_project_skill)", () => {
    expect(PROJECT_ACL_COWORK_FORBIDDEN_WRITE_KINDS).not.toContain(
      "shared_skill_body",
    );
    expect(isProjectAclCoworkForbiddenWriteKind("shared_skill_body")).toBe(
      false,
    );
    expect(isProjectAclCoworkForbiddenWriteKind("shared_memory")).toBe(true);
  });
});
