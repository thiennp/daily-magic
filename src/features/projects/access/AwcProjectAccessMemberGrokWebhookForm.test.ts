import { readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

import { AWC_GROK_WAKE_AWAITING_COPY } from "@/features/projects/access/awcGrokWakeAwaitingCopy.constant";
import { AWC_GROK_WEBHOOK_FORM_COPY } from "@/features/projects/access/awcGrokWebhookFormCopy.constant";
import { mapWakeLinkSaveError } from "@/features/projects/access/hooks/useMemberGrokWebhookForm";

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

  it("hides the other-wake-link status block from the owner form", () => {
    expect(src).not.toContain("hmacWebhookUrlHost");
    expect(src).not.toContain("copy.hmacHeading");
    expect(src).not.toContain("copy.hmacSecretSet");
    expect(src).not.toContain("hmacStatusLine");
    expect(AWC_GROK_WEBHOOK_FORM_COPY.hmacHint).toContain("never shown");
    expect(`${src}${hook}`).not.toMatch(/awc_whsec_/);
  });

  it("Access form uses Product EN: title, help with {name}, save, toast", () => {
    expect(src).toContain("wake.formTitle");
    expect(src).toContain("wake.formHelp");
    expect(src).toContain("wake.save");
    expect(src).toContain("wake.toastSaved");
    expect(src).toContain("wake.rowAction");
    expect(AWC_GROK_WAKE_AWAITING_COPY.save).toBe("Save wake link");
  });

  it("maps a rejected paste to the Product 'copy it again' line", () => {
    const error = AWC_GROK_WAKE_AWAITING_COPY.error;
    for (const code of [
      "invalid_url",
      "https_only",
      "blocked_host",
      "invalid_bearer",
    ]) {
      expect(mapWakeLinkSaveError(code)).toBe(error);
    }
    expect(mapWakeLinkSaveError(undefined)).toBe(error);
    expect(mapWakeLinkSaveError("naming_required")).toBe(
      "Give this bot a project nickname first.",
    );
  });

  it("deep link expands the form and focuses the wake link field", () => {
    expect(src).toContain("openRequest");
    expect(src).toContain("openForm()");
    expect(src).toContain('input[name="grok-webhook-url"]');
    expect(src).toContain("awcGrokWakeLinkHash(membershipId)");
  });

  it("My bots keeps the shared form hint (points to the bot info pane, not chat or a link)", () => {
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
