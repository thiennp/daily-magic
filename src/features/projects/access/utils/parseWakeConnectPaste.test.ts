import { describe, expect, it } from "vitest";

import { parseWakeConnectPaste as parse } from "@/features/projects/access/utils/parseWakeConnectPaste";

const URL = "https://grok.example.com/hooks/wake/abc123";
const KEY = "sk_live_0123456789abcdef";

describe("parseWakeConnectPaste (P1-S1b)", () => {
  it("reads link + key on two lines, with labels, in any order", () => {
    const ok = { ok: true, webhookUrl: URL, webhookKey: KEY };
    expect(parse(`${URL}\n${KEY}`)).toEqual(ok);
    expect(parse(`Wake link: ${URL}\nKey: ${KEY}`)).toEqual(ok);
    expect(parse(`Authorization: Bearer ${KEY}\nWebhook URL: ${URL}`)).toEqual(ok);
    expect(parse(`"${URL}", "${KEY}"`)).toEqual(ok);
  });

  it("bad_link when there is no https link", () => {
    expect(parse(KEY)).toEqual({ ok: false, error: "bad_link" });
    expect(parse(`http://grok.example.com/x ${KEY}`)).toEqual({ ok: false, error: "bad_link" });
    expect(parse("")).toEqual({ ok: false, error: "bad_link" });
  });

  it("missing_key when only the link was pasted", () => {
    expect(parse(URL)).toEqual({ ok: false, error: "missing_key" });
    expect(parse(`Wake link: ${URL}\nKey:`)).toEqual({ ok: false, error: "missing_key" });
  });
});
