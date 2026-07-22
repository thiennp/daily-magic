import { describe, expect, it } from "vitest";

import {
  parseCreateUserProjectBody,
  parseUpdateUserProjectBody,
} from "@/lib/projects/parseUserProjectBody";

describe("parseUserProjectBody", () => {
  it("accepts create payloads with optional folder path", () => {
    expect(
      parseCreateUserProjectBody({
        name: "Daily Magic",
        folderPath: "~/Projects/daily-magic",
      }),
    ).toEqual({
      name: "Daily Magic",
      folderPath: "~/Projects/daily-magic",
      deviceId: undefined,
    });
  });

  it("rejects folder path updates after project creation", () => {
    expect(
      parseUpdateUserProjectBody({
        folderPath: "~/Projects/other",
      }),
    ).toEqual({ kind: "folder_immutable" });
  });

  it("accepts name-only updates", () => {
    expect(
      parseUpdateUserProjectBody({
        name: "Renamed project",
      }),
    ).toEqual({
      kind: "ok",
      input: { name: "Renamed project" },
    });
  });
});
