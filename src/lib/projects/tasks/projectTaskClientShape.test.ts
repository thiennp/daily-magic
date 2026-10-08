import { describe, expect, it } from "vitest";

import { parseProjectTaskId } from "@/lib/projects/tasks/parseProjectTaskId";
import { projectTaskRecordFixture } from "@/lib/projects/tasks/projectTask.fixtures";
import { readProjectTaskClientDbError } from "@/lib/projects/tasks/readProjectTaskClientDbError";
import { toBotFacingProjectTask } from "@/lib/projects/tasks/toBotFacingProjectTask";

describe("DF-024 r2 client-facing helpers", () => {
  it("S7: client SQLSTATEs map to tool codes; anything else is a server fault", () => {
    const read = (code: unknown) => readProjectTaskClientDbError({ code });
    expect(read("23503")).toBe("invalid_reference");
    expect(read("23505")).toBe("update_conflict");
    expect(read("23514")).toBe("invalid_arguments");
    expect(read("22001")).toBe("invalid_arguments");
    expect(read("22P02")).toBe("invalid_arguments");
    expect(read("57P01")).toBeNull();
    expect(read(23503)).toBeNull();
    expect(readProjectTaskClientDbError(new Error("boom"))).toBeNull();
    expect(readProjectTaskClientDbError(null)).toBeNull();
  });

  it("S6: bot-facing task drops createdByUserId, keeps the rest", () => {
    const task = projectTaskRecordFixture();
    const out = toBotFacingProjectTask(task);
    expect(out).not.toHaveProperty("createdByUserId");
    expect(out).toMatchObject({
      id: "task-1",
      createdByMembershipId: "seat-bot",
    });
  });

  it("S3: ids are trimmed strings of 1–64 chars", () => {
    expect(parseProjectTaskId(" t1 ")).toBe("t1");
    expect(parseProjectTaskId("x".repeat(64))).toBe("x".repeat(64));
    expect(parseProjectTaskId("x".repeat(65))).toBeNull();
    expect(parseProjectTaskId("  ")).toBeNull();
    expect(parseProjectTaskId(7)).toBeNull();
  });
});
