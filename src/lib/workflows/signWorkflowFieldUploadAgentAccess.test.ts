import { describe, expect, it } from "vitest";

import { buildWorkflowFieldUploadAgentUrl } from "@/lib/workflows/buildWorkflowFieldUploadAgentUrl";
import {
  signWorkflowFieldUploadAgentAccess,
  verifyWorkflowFieldUploadAgentAccess,
} from "@/lib/workflows/signWorkflowFieldUploadAgentAccess";

describe("signWorkflowFieldUploadAgentAccess", () => {
  it("round-trips a valid signature", () => {
    process.env.AUTH_SECRET = "test-secret-for-upload-links";
    const expiresUnix = Math.floor(Date.now() / 1000) + 3600;
    const sig = signWorkflowFieldUploadAgentAccess({
      uploadId: "up-1",
      ownerUserId: "user-1",
      expiresUnix,
    });

    expect(sig).toBeTruthy();
    expect(
      verifyWorkflowFieldUploadAgentAccess({
        uploadId: "up-1",
        ownerUserId: "user-1",
        expiresUnix,
        signature: sig ?? "",
      }),
    ).toBe(true);
  });

  it("builds an agent download URL", () => {
    process.env.AUTH_SECRET = "test-secret-for-upload-links";
    const url = buildWorkflowFieldUploadAgentUrl({
      uploadId: "up-2",
      ownerUserId: "user-2",
    });

    expect(url).toContain("/api/workflows/field-uploads/agent?");
    expect(url).toContain("uploadId=up-2");
    expect(url).toContain("sig=");
  });
});
