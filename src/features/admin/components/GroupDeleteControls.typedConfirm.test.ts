import { readFileSync } from "node:fs";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { COMPANIES_RULES_HUB_COPY as C } from "@/features/admin/companiesRulesHubCopy.constant";

const read = (relativePath: string): string =>
  readFileSync(path.join(process.cwd(), relativePath), "utf8");

describe("company delete typed-name confirm (companies-rules COPY.md)", () => {
  it("asks to type the company name before Delete company", () => {
    expect(C.deleteTypeToConfirmBefore).toBe("Type");
    expect(C.deleteTypeToConfirmAfter).toBe("to confirm");

    const controls = read(
      "src/features/admin/components/GroupDeleteControls.tsx",
    );
    expect(controls).toContain("typedConfirmText={selectedGroup?.name}");
    expect(controls).toContain("C.deleteTypeToConfirmBefore");

    const modal = read("src/features/shell/ConfirmDestructiveModal.tsx");
    expect(modal).toContain("typed.trim() === typedConfirmText");
    expect(modal).toContain("disabled={isConfirming || !typedMatches}");
  });
});
