import { describe, expect, it } from "vitest";

import { ONBOARDING_COPY as C } from "@/features/onboarding/onboardingCopy.constant";
import { ONBOARDING_STEP_LABELS } from "@/features/onboarding/onboardingSteps.constant";

describe("onboarding Product EN freeze", () => {
  it("uses Assistant not Bot on the visible progress step", () => {
    expect(ONBOARDING_STEP_LABELS.bot).toBe("Assistant");
    expect(ONBOARDING_STEP_LABELS.machine).toBe("Computer");
  });

  it("prefers assistant wording in create and add-assistant copy", () => {
    expect(C.welcomeLead).toContain("assistants");
    expect(C.welcomePts[0]?.title).toContain("assistants");
    expect(C.botTitle).toBe("Add an assistant");
    expect(C.botNeedAdd.toLowerCase()).toContain("assistant");
    expect(C.botTitle.toLowerCase()).not.toContain("bot");
  });

  it("keeps Download AgentWitch Local label for connect step", () => {
    expect(C.downloadButton).toBe("Download AgentWitch Local");
    expect(C.downloadTitleAnother).toBe("Connect another computer");
  });

  it("keeps AgentWitch as one word", () => {
    expect(C.welcomeTitle).toBe("Welcome to AgentWitch");
    expect(C.downloadButton).toContain("AgentWitch");
    expect(C.downloadButton).not.toMatch(/Agent Witch/);
  });

  it("first task copy points at project chat not a New task route", () => {
    expect(C.taskCta.toLowerCase()).toContain("chat");
    expect(C.taskHint.toLowerCase()).toContain("project chat");
    expect(C.taskLead("demo").toLowerCase()).toContain("chat");
    expect(C.taskCta.toLowerCase()).not.toBe("new task");
  });
});
