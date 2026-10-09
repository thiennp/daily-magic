import { describe, expect, it } from "vitest";

import { buildApprovalNotificationArgs } from "./buildApprovalNotificationArgs";

describe("buildApprovalNotificationArgs", () => {
  it("keeps the other person's text out of the AppleScript source", () => {
    const evil = '\\" & (do shell script "id") -- ';
    const args = buildApprovalNotificationArgs({
      promptPreview: evil,
      requesterEmail: evil,
    });
    const script = args.filter((_, i) => i < 6).join("\n");
    expect(script).not.toContain("do shell script");
    expect(args).toContain(evil.slice(0, 120));
  });

  it("flattens control characters and caps the length", () => {
    const [, , , , , , preview, email] = buildApprovalNotificationArgs({
      promptPreview: "a\nb".padEnd(500, "x"),
      requesterEmail: "e".repeat(1000),
    });
    expect(preview).not.toContain("\n");
    expect(preview.length).toBe(120);
    expect(email.length).toBe(200);
  });
});
