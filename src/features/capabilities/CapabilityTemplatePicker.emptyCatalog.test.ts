import { readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

describe("CapabilityTemplatePicker empty catalog", () => {
  it("shows global empty only when the full template catalog is empty", () => {
    const pickerSource = readFileSync(
      join(
        process.cwd(),
        "src/features/capabilities/CapabilityTemplatePicker.tsx",
      ),
      "utf8",
    );
    const hookSource = readFileSync(
      join(
        process.cwd(),
        "src/features/capabilities/hooks/useCapabilityTemplatePicker.ts",
      ),
      "utf8",
    );

    expect(pickerSource).toContain("picker.isTemplatesCatalogEmpty");
    expect(pickerSource).not.toContain(
      "picker.displayedTemplates.length === 0",
    );
    expect(hookSource).toContain(
      "isTemplatesCatalogEmpty: templates.length === 0",
    );
  });
});
