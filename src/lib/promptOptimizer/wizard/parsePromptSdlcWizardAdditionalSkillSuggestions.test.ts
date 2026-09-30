import { describe, expect, it } from "vitest";

import { normalizePromptSdlcWizardAdditionalSkillSuggestions } from "./normalizePromptSdlcWizardAdditionalSkillSuggestions";
import { parsePromptSdlcWizardAdditionalSkillSuggestions } from "./parsePromptSdlcWizardAdditionalSkillSuggestions";

describe("normalizePromptSdlcWizardAdditionalSkillSuggestions", () => {
  it("drops orchestrator fileName and dedupes slugs", () => {
    const normalized = normalizePromptSdlcWizardAdditionalSkillSuggestions({
      orchestratorFileName: "support-reply",
      suggestions: [
        {
          fileName: "Support Reply",
          name: "Support Reply",
          description: "Dup",
          rationale: "Same slug",
        },
        {
          fileName: "support-reply",
          name: "Orchestrator clone",
          description: "Bad",
          rationale: "Must drop",
        },
        {
          fileName: "verify-output",
          name: "Verify output",
          description: "Checks artifacts",
          rationale: "Modules failed checks",
        },
      ],
    });
    expect(normalized).toHaveLength(1);
    expect(normalized[0]?.fileName).toBe("verify-output");
  });
});

describe("parsePromptSdlcWizardAdditionalSkillSuggestions", () => {
  it("parses summary and suggestions JSON", () => {
    const result = parsePromptSdlcWizardAdditionalSkillSuggestions(
      JSON.stringify({
        summary: "Modules missed verification.",
        suggestions: [
          {
            fileName: "verify-output",
            name: "Verify output",
            description: "Validate files after each module.",
            rationale: "Step 4 scores were low on completeness.",
          },
        ],
      }),
      "billing-orchestrator",
    );
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.summary).toContain("verification");
      expect(result.suggestions[0]?.fileName).toBe("verify-output");
    }
  });

  it("rejects verdict-shaped JSON", () => {
    const result = parsePromptSdlcWizardAdditionalSkillSuggestions(
      JSON.stringify({ score: 40, passed: false, reasons: "weak" }),
      null,
    );
    expect(result.ok).toBe(false);
  });
});
