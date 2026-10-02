import { describe, expect, it } from "vitest";

import {
  parseCreateUserProjectBody,
  parseUpdateUserProjectBody,
} from "@/lib/projects/parseUserProjectBody";

describe("parseUserProjectBody", () => {
  it("accepts create payloads with optional folder path", () => {
    expect(
      parseCreateUserProjectBody(
        {
          name: "Daily Magic",
          folderPath: "~/Projects/daily-magic",
        },
        "owner@example.com",
      ),
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

  it("accepts optional repoUrls and defaultBranch on create", () => {
    expect(
      parseCreateUserProjectBody(
        {
          name: "Daily Magic",
          folderPath: "~/Projects/daily-magic",
          repoUrls: ["https://github.com/org/daily-magic.git"],
          defaultBranch: "main",
        },
        "owner@example.com",
      ),
    ).toEqual({
      name: "Daily Magic",
      folderPath: "~/Projects/daily-magic",
      deviceId: undefined,
      repoUrls: ["https://github.com/org/daily-magic.git"],
      defaultBranch: "main",
    });
  });

  it("rejects create payloads with credentialed repo URLs", () => {
    expect(
      parseCreateUserProjectBody(
        {
          name: "Daily Magic",
          folderPath: "~/Projects/daily-magic",
          repoUrls: ["https://user:pass@github.com/org/repo.git"],
        },
        "owner@example.com",
      ),
    ).toBeNull();
  });

  it("returns validation_error for invalid repoUrls on update", () => {
    expect(
      parseUpdateUserProjectBody({
        repoUrls: ["not-a-valid-remote"],
      }),
    ).toEqual({
      kind: "validation_error",
      errorMessage:
        "Each repo URL must be https://… or SSH (git@host:path / ssh://…).",
    });
  });

  it("accepts repoUrls-only updates", () => {
    expect(
      parseUpdateUserProjectBody({
        repoUrls: ["git@github.com:org/repo.git"],
        defaultBranch: null,
      }),
    ).toEqual({
      kind: "ok",
      input: {
        repoUrls: ["git@github.com:org/repo.git"],
        defaultBranch: null,
      },
    });
  });
});
