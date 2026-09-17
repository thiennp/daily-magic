import { describe, expect, it } from "vitest";

import { parseSelectProjectFolderWakeBody } from "./selectAgentWitchProjectFolderFromWakeServer";

describe("parseSelectProjectFolderWakeBody", () => {
  it("accepts a trimmed projectId", () => {
    expect(parseSelectProjectFolderWakeBody({ projectId: " abc " })).toEqual({
      projectId: "abc",
    });
  });

  it("rejects missing projectId", () => {
    expect(parseSelectProjectFolderWakeBody({})).toBeNull();
    expect(parseSelectProjectFolderWakeBody({ projectId: "" })).toBeNull();
    expect(parseSelectProjectFolderWakeBody(null)).toBeNull();
  });
});
