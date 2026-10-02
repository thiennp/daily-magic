import { describe, expect, it } from "vitest";

import { assertSafeProjectWebhookUrl } from "@/lib/projects/acl/webhooks/assertSafeProjectWebhookUrl";

describe("assertSafeProjectWebhookUrl (A3.1)", () => {
  it("rejects http and private literals", async () => {
    expect((await assertSafeProjectWebhookUrl("http://example.com/hook")).ok).toBe(
      false,
    );
    expect((await assertSafeProjectWebhookUrl("https://127.0.0.1/hook")).ok).toBe(
      false,
    );
    expect((await assertSafeProjectWebhookUrl("https://10.0.0.1/hook")).ok).toBe(
      false,
    );
    expect(
      (await assertSafeProjectWebhookUrl("https://169.254.169.254/latest")).ok,
    ).toBe(false);
  });

  it("accepts public https hostname shape (DNS may still block in CI)", async () => {
    const result = await assertSafeProjectWebhookUrl(
      "https://example.com/awc-hook",
    );
    // example.com resolves public — should pass
    expect(result.ok).toBe(true);
  });
});
