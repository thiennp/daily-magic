import { readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

const read = (path: string): string =>
  readFileSync(join(process.cwd(), path), "utf8");

describe("owned-bot Grok webhook secret form", () => {
  it("masks inputs and clears the key after save like the owner form", () => {
    const src = read(
      "src/features/my-bots/MyBotOwnedGrokWebhookForm.tsx",
    );
    const hook = read(
      "src/features/my-bots/hooks/useOwnedBotGrokWebhookForm.ts",
    );
    expect(src).toContain("AwcProjectAccessSecretInput");
    expect(src.match(/<AwcProjectAccessSecretInput/g)).toHaveLength(2);
    expect(src).toContain('autoComplete="off"');
    expect(hook).toContain("saveOwnedBotGrokWebhook");
    expect(hook).toMatch(/setWebhookKey\(""\)/);
    expect(src).toContain("grokWebhookUrlHost");
  });
});
