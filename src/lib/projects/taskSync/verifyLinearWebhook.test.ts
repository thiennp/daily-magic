import { createHmac } from "node:crypto";

import { describe, expect, it } from "vitest";

import { verifyLinearWebhook } from "@/lib/projects/taskSync/verifyLinearWebhook";

const secret = "s3cret";
const now = 1_700_000_000_000;
const sign = (body: string): string =>
  createHmac("sha256", secret).update(body).digest("hex");

describe("verifyLinearWebhook", () => {
  const body = JSON.stringify({ webhookTimestamp: now - 1000 });

  it("accepts a valid signature with a fresh timestamp", () => {
    expect(
      verifyLinearWebhook({
        rawBody: body,
        signature: sign(body),
        secret,
        now,
      }),
    ).toEqual({ ok: true });
  });

  it("rejects a wrong or missing signature", () => {
    expect(
      verifyLinearWebhook({ rawBody: body, signature: sign("x"), secret, now }),
    ).toEqual({ ok: false, code: "bad_signature" });
    expect(
      verifyLinearWebhook({ rawBody: body, signature: null, secret, now }),
    ).toEqual({ ok: false, code: "bad_signature" });
  });

  it("rejects a stale or missing timestamp", () => {
    const old = JSON.stringify({ webhookTimestamp: now - 61_000 });
    expect(
      verifyLinearWebhook({ rawBody: old, signature: sign(old), secret, now }),
    ).toEqual({ ok: false, code: "stale" });
    const none = "{}";
    expect(
      verifyLinearWebhook({
        rawBody: none,
        signature: sign(none),
        secret,
        now,
      }),
    ).toEqual({ ok: false, code: "stale" });
  });
});
