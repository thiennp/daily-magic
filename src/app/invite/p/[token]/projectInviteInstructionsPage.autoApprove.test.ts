import { readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

const readSrc = (relativePath: string): string =>
  readFileSync(join(process.cwd(), relativePath), "utf8");

describe("ProjectInviteInstructionsPage autoApprove", () => {
  it("peeks the invite and passes autoApprove into the instructions body", () => {
    const page = readSrc("src/app/invite/p/[token]/page.tsx");
    expect(page).toContain("peekProjectInviteByToken");
    expect(page).toContain("autoApprove={autoApprove}");
    expect(page).toContain("Assistant project invite");
    expect(page).toContain("Assistant invite |");
    expect(page).toMatch(/for AI assistants/);
    expect(page).toMatch(/to your assistant/);
    expect(page).not.toMatch(/Bot invite|Bot project invite|for AI bots/);
  });
});
