import { describe, expect, it } from "vitest";

import {
  displayNameErrorHttpStatus,
  mapDisplayNameApiError,
  mapProjectAccessError,
  projectAccessErrorJson,
  toPublicAccessErrorCode,
} from "@/lib/projects/acl/mapProjectAccessError";

describe("mapProjectAccessError", () => {
  it("maps display-name ACL codes to friendly copy", () => {
    expect(mapProjectAccessError("display_name_invalid")).toMatch(/single spaces OK/i);
    expect(mapProjectAccessError("display_name_invalid")).not.toMatch(/not allowed/i);
    expect(mapProjectAccessError("display_name_reserved")).toBe("That name is reserved.");
    expect(mapProjectAccessError("display_name_taken")).toBe(
      "That project nickname is already taken.",
    );
    expect(mapProjectAccessError("display_name_missing")).toBe(
      "Enter a project nickname.",
    );
    expect(mapProjectAccessError("missing")).toBe("Enter a project nickname.");
    expect(mapProjectAccessError("display_name_required")).toBe(
      "Enter a project nickname.",
    );
  });

  it("maps common access codes and never returns snake_case", () => {
    expect(mapProjectAccessError("forbidden")).toMatch(/owner/i);
    expect(mapProjectAccessError("not_found")).toMatch(/not found/i);
    expect(mapProjectAccessError("not_pending")).toMatch(/pending/i);
    expect(mapProjectAccessError("weird_unknown_code")).not.toMatch(/_/);
    expect(mapProjectAccessError("invite.redeem")).toBe("Invite redeem.");
  });

  it("passes through already-friendly messages", () => {
    expect(mapProjectAccessError("Folder ref added.")).toBe("Folder ref added.");
  });

  it("mapDisplayNameApiError aliases the same helper", () => {
    expect(mapDisplayNameApiError("display_name_taken")).toBe(
      mapProjectAccessError("display_name_taken"),
    );
  });

  it("exposes clear public codes Product can show/switch on", () => {
    expect(toPublicAccessErrorCode("display_name_invalid")).toBe(
      "INVALID_DISPLAY_NAME",
    );
    expect(toPublicAccessErrorCode("display_name_taken")).toBe(
      "DISPLAY_NAME_TAKEN",
    );
    expect(toPublicAccessErrorCode("display_name_reserved")).toBe(
      "DISPLAY_NAME_RESERVED",
    );
    expect(toPublicAccessErrorCode("display_name_required")).toBe(
      "DISPLAY_NAME_REQUIRED",
    );
  });

  it("collision still maps to HTTP 409", () => {
    expect(displayNameErrorHttpStatus("display_name_taken")).toBe(409);
    expect(displayNameErrorHttpStatus("DISPLAY_NAME_TAKEN")).toBe(409);
  });

  it("projectAccessErrorJson returns friendly message + public code + 409 on taken", async () => {
    const response = projectAccessErrorJson("display_name_taken", 409);
    expect(response.status).toBe(409);
    const body = (await response.json()) as {
      ok: boolean;
      code: string;
      errorMessage: string;
    };
    expect(body.ok).toBe(false);
    expect(body.code).toBe("DISPLAY_NAME_TAKEN");
    expect(body.errorMessage).toBe("That project nickname is already taken.");
    expect(body.errorMessage).not.toMatch(/display_name_/);
  });
});
