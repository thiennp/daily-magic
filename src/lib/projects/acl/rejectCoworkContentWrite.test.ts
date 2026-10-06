import { describe, expect, it } from "vitest";

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
});
