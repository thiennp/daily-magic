import { describe, expect, it } from "vitest";

import { parseUpdateProjectKnowledgeWakeBody } from "./parseUpdateProjectKnowledgeWakeBody";

describe("parseUpdateProjectKnowledgeWakeBody", () => {
  it("accepts projectId and lesson", () => {
    expect(
      parseUpdateProjectKnowledgeWakeBody({
        projectId: "proj-1",
        lesson: "Always run tests before push.",
      }),
    ).toEqual({
      projectId: "proj-1",
      lesson: "Always run tests before push.",
    });
  });

  it("rejects invalid bodies", () => {
    expect(parseUpdateProjectKnowledgeWakeBody(null)).toBeNull();
    expect(parseUpdateProjectKnowledgeWakeBody({ projectId: "" })).toBeNull();
  });
});
