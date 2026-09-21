import { describe, expect, it, vi } from "vitest";

vi.mock("@/lib/harness/createHarnessInstallArtifact", () => ({
  createHarnessInstallArtifact: vi.fn(async () => ({
    artifactId: "artifact-1",
    contentSha256: "abc123",
  })),
}));

import { createHarnessInstallArtifact } from "@/lib/harness/createHarnessInstallArtifact";
import { buildHarnessInstallDispatchMessage } from "@/lib/harness/sendHarnessInstallToAgentClient";
import { HARNESS_INSTALL_INLINE_BUNDLE_MAX_BYTES } from "@/lib/harness/harnessInstallInlineBundleMaxBytes.constant";

describe("buildHarnessInstallDispatchMessage", () => {
  it("inlines small bundles on the WebSocket payload", async () => {
    const message = await buildHarnessInstallDispatchMessage({
      harness: {
        name: "Rules",
        slug: "rules",
        items: [
          {
            id: "r1",
            kind: "rule",
            title: "Prefer const",
            content: "Use const.",
            setSlugs: ["rules"],
          },
        ],
      },
      userId: "user-1",
      deviceId: "device-1",
    });

    const payload = message.payload as {
      installMethod?: string;
      bundle?: { slug?: string };
      bundleFetch?: unknown;
    };
    expect(payload.installMethod).toBe("deterministic-bundle");
    expect(payload.bundle?.slug).toBe("rules");
    expect(payload.bundleFetch).toBeUndefined();
    expect(createHarnessInstallArtifact).not.toHaveBeenCalled();
  });

  it("uses HTTPS artifact fetch for oversized bundles", async () => {
    const largeContent = "x".repeat(HARNESS_INSTALL_INLINE_BUNDLE_MAX_BYTES);
    const message = await buildHarnessInstallDispatchMessage({
      harness: {
        name: "Big",
        slug: "big",
        items: [
          {
            id: "big-1",
            kind: "rule",
            title: "Big rule",
            content: largeContent,
            setSlugs: ["big"],
          },
        ],
      },
      userId: "user-1",
      deviceId: "device-1",
    });

    const payload = message.payload as {
      bundle?: unknown;
      bundleFetch?: { artifactId: string; contentSha256: string };
    };
    expect(payload.bundle).toBeUndefined();
    expect(payload.bundleFetch).toEqual({
      artifactId: "artifact-1",
      contentSha256: "abc123",
    });
    expect(createHarnessInstallArtifact).toHaveBeenCalledOnce();
  });
});
