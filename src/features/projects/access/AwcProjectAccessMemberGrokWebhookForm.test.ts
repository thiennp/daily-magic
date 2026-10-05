import { readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

import { AWC_GROK_WEBHOOK_FORM_COPY } from "@/features/projects/access/awcGrokWebhookFormCopy.constant";

const read = (path: string): string =>
  readFileSync(join(process.cwd(), path), "utf8");
const src = read(
  "src/features/projects/access/AwcProjectAccessMemberGrokWebhookForm.tsx",
);
const input = read(
  "src/features/projects/access/AwcProjectAccessSecretInput.tsx",
);
const hook = read(
  "src/features/projects/access/hooks/useMemberGrokWebhookForm.ts",
);

describe("member Grok webhook secret form", () => {
  it("masks both inputs and turns autocomplete off", () => {
    expect(input).toContain('type="password"');
    expect(input).toContain('autoComplete="off"');
    expect(src.match(/<AwcProjectAccessSecretInput/g)).toHaveLength(2);
    expect(src).toContain('autoComplete="off"');
    expect(hook).toContain("saveMemberGrokWebhook");
    expect(`${src}${input}${hook}`).not.toMatch(/console\./);
  });

  it("shows host + key set after save, never the key", () => {
    expect(src).toContain("copy.keySet");
    expect(src).toContain("grokWebhookUrlHost");
    expect(hook).toMatch(/setWebhookKey\(""\)/);
  });

  it("shows HMAC webhook host status without the secret", () => {
    expect(src).toContain("hmacWebhookUrlHost");
    expect(src).toContain("copy.hmacHeading");
    expect(src).toContain("copy.hmacSecretSet");
    expect(AWC_GROK_WEBHOOK_FORM_COPY.hmacHint).toContain(
      "register_project_webhook",
    );
    expect(AWC_GROK_WEBHOOK_FORM_COPY.hmacHint).toContain("never shown");
    expect(`${src}${hook}`).not.toMatch(/awc_whsec_/);
  });

  it("points to the bot info pane, not chat or a link", () => {
    expect(AWC_GROK_WEBHOOK_FORM_COPY.hint).toContain(
      "click the bot's name in the chat header",
    );
    expect(AWC_GROK_WEBHOOK_FORM_COPY.hint).toContain("Routines");
    expect(AWC_GROK_WEBHOOK_FORM_COPY.hint).not.toMatch(
      /https?:\/\/|grokbot:\/\/|sidebar/i,
    );
    expect(src).not.toMatch(/<a\b/);
  });
});
