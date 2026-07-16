import { describe, expect, it } from "vitest";

import { buildWorkflowFieldValidationErrors } from "@/lib/workflows/buildWorkflowPrompt";

describe("buildWorkflowFieldValidationErrors", () => {
  it("maps required field errors by field key", () => {
    expect(
      buildWorkflowFieldValidationErrors(
        [
          {
            key: "email",
            label: "Original email",
            type: "textarea",
            required: true,
          },
          { key: "tone", label: "Tone", type: "text", required: true },
        ],
        { email: " ", tone: "Friendly" },
      ),
    ).toEqual({
      email: "Original email is required.",
    });
  });
});
