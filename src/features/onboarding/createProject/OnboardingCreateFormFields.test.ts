import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

import { ONBOARDING_COPY as C } from "@/features/onboarding/onboardingCopy.constant";

describe("OnboardingCreateFormFields Product EN follow-up", () => {
  it("drops the project description field (name only)", () => {
    const dir = dirname(fileURLToPath(import.meta.url));
    const fields = readFileSync(join(dir, "OnboardingCreateFormFields.tsx"), "utf8");
    const form = readFileSync(join(dir, "OnboardingCreateForm.tsx"), "utf8");
    const hook = readFileSync(join(dir, "useOnboardingCreateProject.ts"), "utf8");
    const done = readFileSync(join(dir, "OnboardingCreateDone.tsx"), "utf8");

    expect(fields).toContain("ob-pn");
    expect(fields).not.toContain("ob-pd");
    expect(fields).not.toContain("description");
    expect(form).not.toContain("description");
    expect(hook).not.toContain("description");
    expect(hook).not.toContain("setDescription");
    expect(done).not.toContain("description");
    expect(done).toContain("createdOwnerLine");
  });

  it("removes description copy keys and keeps owner line", () => {
    expect(C).not.toHaveProperty("descriptionLabel");
    expect(C).not.toHaveProperty("descriptionOptional");
    expect(C).not.toHaveProperty("descriptionHint");
    expect(C.createdOwnerLine).toBe("You are the owner");
    expect(C.projectNameLabel).toBe("Project name");
  });
});
