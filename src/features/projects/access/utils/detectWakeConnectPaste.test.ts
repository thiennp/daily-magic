import { describe, expect, it } from "vitest";

import { detectWakeConnectPaste as detect } from "@/features/projects/access/utils/detectWakeConnectPaste";

const URL = "https://grok.example.com/hooks/wake/abc123";
const KEY = "sk_live_0123456789abcdef";

describe("detectWakeConnectPaste (DF-036 chips)", () => {
  it("nothing pasted: both parts missing", () => {
    expect(detect("")).toEqual({ link: "missing", site: null, keyFound: false });
  });

  it("https link + key: site shown, key found", () => {
    expect(detect(`${URL}\n${KEY}`)).toEqual({ link: "ok", site: "grok.example.com", keyFound: true });
    expect(detect(URL)).toEqual({ link: "ok", site: "grok.example.com", keyFound: false });
  });

  it("rejected address (http://) reads check, not missing (EN S5)", () => {
    expect(detect(`http://grok.example.com/x ${KEY}`)).toEqual({ link: "check", site: null, keyFound: true });
  });

  it("key only: link still missing", () => {
    expect(detect(KEY)).toEqual({ link: "missing", site: null, keyFound: true });
  });
});
