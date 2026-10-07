import { describe, expect, it } from "vitest";

import {
  WAKE_KEY_MAX_LENGTH,
  parseWakeConnectPaste as parse,
} from "@/features/projects/access/utils/parseWakeConnectPaste";

const URL = "https://grok.example.com/hooks/wake/abc123";
const KEY = "sk_live_0123456789abcdef";

describe("parseWakeConnectPaste (P1-S1b, DF-036 F10)", () => {
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

  it("bad_link for localhost, LAN and user:pass addresses (server would refuse)", () => {
    for (const link of [
      "https://localhost/x",
      "https://192.168.1.4/x",
      "https://10.0.0.2/x",
      "https://printer.local/x",
      "https://me:pw@grok.example.com/x",
    ]) {
      expect(parse(`${link} ${KEY}`)).toEqual({ ok: false, error: "bad_link" });
    }
  });

  it("any key length the server accepts (1–2000)", () => {
    expect(parse(`${URL} k`)).toEqual({ ok: true, webhookUrl: URL, webhookKey: "k" });
    const max = "a".repeat(WAKE_KEY_MAX_LENGTH);
    expect(parse(`${URL} ${max}`)).toEqual({ ok: true, webhookUrl: URL, webhookKey: max });
    expect(parse(`${URL} ${max}a`)).toEqual({ ok: false, error: "missing_key" });
  });

  it("missing_key when only the link was pasted", () => {
    expect(parse(URL)).toEqual({ ok: false, error: "missing_key" });
    expect(parse(`Wake link: ${URL}\nKey:`)).toEqual({ ok: false, error: "missing_key" });
  });
});
