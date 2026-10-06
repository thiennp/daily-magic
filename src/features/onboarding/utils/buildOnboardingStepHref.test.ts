import { describe, expect, it } from "vitest";

import {
  buildOnboardingProjectChatHref,
  buildOnboardingStepHref,
} from "@/features/onboarding/utils/buildOnboardingStepHref";

describe("buildOnboardingStepHref", () => {
  it("wires project without projectId", () => {
    expect(buildOnboardingStepHref("project", null)).toBe(
      "/onboarding/project",
    );
  });

  it("requires projectId for machine bot task", () => {
    expect(buildOnboardingStepHref("machine", null)).toBeNull();
    expect(buildOnboardingStepHref("bot", "")).toBeNull();
    expect(buildOnboardingStepHref("task", null)).toBeNull();
  });

  it("orders project → machine → bot → task with projectId", () => {
    expect(buildOnboardingStepHref("machine", "p1")).toBe(
      "/onboarding/machine?projectId=p1",
    );
    expect(buildOnboardingStepHref("bot", "p1")).toBe(
      "/onboarding/bot?projectId=p1",
    );
    expect(buildOnboardingStepHref("task", "p1")).toBe(
      "/onboarding/task?projectId=p1",
    );
  });

  it("hands first task into project chat only", () => {
    expect(buildOnboardingProjectChatHref("abc")).toBe(
      "/projects/abc?chat=1",
    );
  });
});
