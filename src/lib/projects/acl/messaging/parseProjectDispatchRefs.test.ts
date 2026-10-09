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

  it("accepts a local file path to an image as localPath (path only, no bytes)", () => {
    for (const localPath of [
      "/Users/me/shots/login.png",
      "~/Desktop/video/clip.mov",
      "./docs/design/flow.pdf",
      "C:\\Users\\me\\shot.jpg",
    ]) {
      const result = parseProjectDispatchPayload({
        kind: "x",
        summary: "ok",
        toProjectDisplayName: "Owner",
        refs: { localPath },
      });
      expect(result.ok).toBe(true);
    }
  });

  it("still rejects an image path in any other ref key and data URIs in localPath", () => {
    const otherKey = parseProjectDispatchPayload({
      kind: "x",
      summary: "ok",
      toProjectDisplayName: "Owner",
      refs: { prUrl: "/Users/me/shots/login.png" },
    });
    expect(otherKey.ok).toBe(false);
    const dataUri = parseProjectDispatchPayload({
      kind: "x",
      summary: "ok",
      toProjectDisplayName: "Owner",
      refs: { localPath: "/data:image/png;base64,aaaa" },
    });
    expect(dataUri.ok).toBe(false);
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
