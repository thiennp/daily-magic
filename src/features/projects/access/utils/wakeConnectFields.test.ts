import { describe, expect, it } from "vitest";

import {
  checkWakeKeyField,
  checkWakeUrlField,
  splitPastedWakeUrlAndKey,
} from "@/features/projects/access/utils/wakeConnectFields";

describe("checkWakeUrlField", () => {
  it("empty is neither valid nor an error", () => {
    expect(checkWakeUrlField("  ")).toEqual({ site: null, issue: null });
  });
  it("accepts one public https address and shows its site", () => {
    expect(checkWakeUrlField(" https://grok.example.com/hooks/a ").site).toBe(
      "grok.example.com",
    );
  });
  it("rejects http, private hosts and extra words", () => {
    expect(checkWakeUrlField("http://grok.example.com/x").issue).toBe("https");
    expect(checkWakeUrlField("https://localhost/x").issue).toBe("bad");
    expect(checkWakeUrlField("https://10.0.0.1/x").issue).toBe("bad");
    expect(checkWakeUrlField("https://grok.example.com/x key").issue).toBe(
      "two",
    );
  });
});

describe("checkWakeKeyField", () => {
  it("needs 1 to 2000 characters", () => {
    expect(checkWakeKeyField("").ok).toBe(false);
    expect(checkWakeKeyField("sk_1").ok).toBe(true);
    expect(checkWakeKeyField("k".repeat(2001))).toEqual({
      ok: false,
      issue: "long",
    });
  });
});

describe("splitPastedWakeUrlAndKey", () => {
  it("splits 'URL KEY' in either order, with labels", () => {
    const want = { url: "https://grok.example.com/h/1", key: "sk_live_abc123" };
    expect(
      splitPastedWakeUrlAndKey("https://grok.example.com/h/1 sk_live_abc123"),
    ).toEqual(want);
    expect(
      splitPastedWakeUrlAndKey(
        "Key: sk_live_abc123\nWake link: https://grok.example.com/h/1",
      ),
    ).toEqual(want);
  });
  it("returns null for a lone URL, a lone key or two URLs", () => {
    expect(splitPastedWakeUrlAndKey("https://grok.example.com/h/1")).toBeNull();
    expect(splitPastedWakeUrlAndKey("sk_live_abc123")).toBeNull();
    expect(
      splitPastedWakeUrlAndKey(
        "https://a.example.com/1 https://b.example.com/2",
      ),
    ).toBeNull();
  });
});
