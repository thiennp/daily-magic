import { describe, expect, it } from "vitest";

import { parseProjectDispatchPayload } from "@/lib/projects/acl/messaging/parseProjectDispatchPayload";
import { PROJECT_MESSAGE_REF_VALUE_MAX_CHARS } from "@/lib/projects/acl/messaging/projectMessage.constants";

describe("parseProjectDispatchPayload refs media guards", () => {
  it("rejects media / data-URI / base64-looking refs", () => {
    const dataUri = parseProjectDispatchPayload({
      kind: "x",
      summary: "ok",
      toProjectDisplayName: "Owner",
      refs: { localPath: "data:image/png;base64,aaaa" },
    });
    expect(dataUri.ok).toBe(false);
    if (!dataUri.ok) {
      expect(dataUri.code).toBe("media_not_allowed");
    }

    const blob = parseProjectDispatchPayload({
      kind: "x",
      summary: "ok",
      toProjectDisplayName: "Owner",
      refs: { localPath: "A".repeat(90) },
    });
    expect(blob.ok).toBe(false);
    if (!blob.ok) {
      expect(blob.code).toBe("media_not_allowed");
    }

    const imagePath = parseProjectDispatchPayload({
      kind: "x",
      summary: "ok",
      toProjectDisplayName: "Owner",
      refs: { localPath: "https://cdn.example.com/shot.png" },
    });
    expect(imagePath.ok).toBe(false);
    if (!imagePath.ok) {
      expect(imagePath.code).toBe("media_not_allowed");
    }
  });

  it("rejects oversized individual ref values", () => {
    const result = parseProjectDispatchPayload({
      kind: "x",
      summary: "ok",
      toProjectDisplayName: "Owner",
      refs: { localPath: "p".repeat(PROJECT_MESSAGE_REF_VALUE_MAX_CHARS + 1) },
    });
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.code).toBe("refs_too_large");
    }
  });
});
