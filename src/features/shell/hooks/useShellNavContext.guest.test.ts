import { readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

describe("useShellNavContext guest gating", () => {
  it("skips shell-context fetch when signed out and de-dupes in-flight", () => {
    const source = readFileSync(
      join(process.cwd(), "src/features/shell/hooks/useShellNavContext.ts"),
      "utf8",
    );

    expect(source).toContain('status !== "authenticated"');
    expect(source).toContain("shellContextInflight");
    expect(source).toContain('SHELL_CONTEXT_API_PATH = "/api/me/shell-context"');
    expect(source).toContain("useSession");
  });
});
