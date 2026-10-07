import { describe, expect, it } from "vitest";

import { detectWakeConnectPaste as detect } from "@/features/projects/access/utils/detectWakeConnectPaste";

const URL = "https://grok.example.com/hooks/wake/abc123";
const KEY = "sk_live_0123456789abcdef";

describe("detectWakeConnectPaste (DF-036 chips, F7, F9, F10)", () => {
  it("nothing pasted: both parts missing, no issue, not ready", () => {
    expect(detect("")).toEqual({ link: "missing", site: null, keyFound: false, issue: null, ready: false });
  });

  it("https link + key: site shown, key found, ready", () => {
    expect(detect(`${URL}\n${KEY}`)).toEqual({
      link: "ok",
      site: "grok.example.com",
      keyFound: true,
      issue: null,
      ready: true,
    });
  });

  it("link only asks for the key; key only asks for the link (muted guidance)", () => {
    expect(detect(URL)).toMatchObject({ link: "ok", keyFound: false, issue: "need_key", ready: false });
    expect(detect(KEY)).toMatchObject({ link: "missing", keyFound: true, issue: "need_link", ready: false });
  });

  it("rejected address (http://) reads check, not missing (EN S5)", () => {
    expect(detect(`http://grok.example.com/x ${KEY}`)).toMatchObject({
      link: "check",
      site: null,
      keyFound: true,
      issue: "https",
      ready: false,
    });
  });

  it("no ✓ for localhost or private addresses (F10)", () => {
    expect(detect(`https://localhost:3000/x ${KEY}`)).toMatchObject({ link: "check", issue: "bad", ready: false });
    expect(detect(`https://172.20.1.1/x ${KEY}`)).toMatchObject({ link: "check", issue: "bad" });
  });

  it("two addresses and an over-long key are named", () => {
    expect(detect(`${URL} https://other.example.com/y`)).toMatchObject({ link: "check", issue: "two" });
    expect(detect(`${URL} ${"x".repeat(2001)}`)).toMatchObject({ keyFound: false, issue: "long", ready: false });
  });

  it("a short key counts (server accepts 1–2000)", () => {
    expect(detect(`${URL} abc`)).toMatchObject({ keyFound: true, ready: true });
  });
});
