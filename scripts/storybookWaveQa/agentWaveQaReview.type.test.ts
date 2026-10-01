import { describe, expect, it } from "vitest";

import { validateAgentWaveQaReview } from "./agentWaveQaReview.type";

const validAwcReview = {
  reviewMethod: "agent",
  reviewer: "A",
  deployable: "AWC",
  pageId: "home-marketing",
  role: "ux",
  captureRound: 1,
  captureRef:
    "/opt/cursor/artifacts/storybook-waves/AWC/home-marketing/round-1/manifest.json",
  scoreDesktop: 96,
  scoreMobile: 94,
  scoreOverall: 95,
  passed: true,
  scoreBreakdown: [
    {
      area: "mobile-cta",
      pointsDeducted: 5,
      reason: "Secondary link competes with primary CTA on narrow viewport.",
    },
  ],
  whyBelowThreshold: "",
  topIssues: [],
  mustFix: [],
  quickWins: [],
};

describe("validateAgentWaveQaReview", () => {
  it("accepts a consistent AWC review at the pass threshold", () => {
    const result = validateAgentWaveQaReview(validAwcReview);
    expect(result.ok).toBe(true);
  });

  it("rejects AWC scoreOverall that does not match desktop/mobile average", () => {
    const result = validateAgentWaveQaReview({
      ...validAwcReview,
      scoreOverall: 90,
      passed: false,
      scoreBreakdown: [
        {
          area: "hero",
          pointsDeducted: 10,
          reason:
            "Desktop hero spacing feels cramped against the styleguide rhythm.",
        },
      ],
      whyBelowThreshold:
        "Hero spacing on desktop and mobile needs another pass before we record this wave.",
      mustFix: ["Fix hero vertical rhythm on desktop capture"],
    });
    expect(result.ok).toBe(false);
    if (result.ok) {
      return;
    }
    expect(result.errors.some((e) => e.field === "scoreOverall")).toBe(true);
  });

  it("requires AWL scoreMobile to be null", () => {
    const result = validateAgentWaveQaReview({
      ...validAwcReview,
      deployable: "AWL",
      scoreMobile: 90,
      scoreDesktop: 95,
      scoreOverall: 95,
    });
    expect(result.ok).toBe(false);
  });
});
