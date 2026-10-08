import { describe, expect, it } from "vitest";

import { PRICING_CONFIG } from "@/features/pricing/pricingConfig.constant";
import { PRICING_PLAN_CARDS } from "@/features/pricing/pricingPlans.constant";
import { PRICING_FAQ_ITEMS } from "@/features/pricing/pricingCopy.constant";
import { PRICING_COMPARE_SECTIONS } from "@/features/pricing/pricingCompare.constant";
import { formatUsd } from "@/features/pricing/formatUsd";

describe("PRICING_CONFIG (provisional seat prices)", () => {
  it("keeps Pro $29 / Team $49 / Team 3-seat minimum in one constant", () => {
    expect(PRICING_CONFIG.currency).toBe("USD");
    expect(PRICING_CONFIG.pro.pricePerSeatMonth).toBe(29);
    expect(PRICING_CONFIG.team.pricePerSeatMonth).toBe(49);
    expect(PRICING_CONFIG.team.minSeats).toBe(3);
    expect(PRICING_CONFIG.pro.minSeats).toBe(1);
  });

  it("caps computers at 2 for every package", () => {
    expect(PRICING_CONFIG.trial.maxComputers).toBe(5);
    expect(PRICING_CONFIG.pro.maxComputers).toBe(5);
    expect(PRICING_CONFIG.team.maxComputers).toBe(5);
  });

  it("limits assistants to Pro 3 / Team 10", () => {
    expect(PRICING_CONFIG.pro.assistantsConnect).toBe(3);
    expect(PRICING_CONFIG.team.assistantsConnect).toBe(10);
    expect(PRICING_CONFIG.trial.assistantsConnect).toBe(3);
  });
});

describe("pricing plan cards (locked product rules)", () => {
  it("shows Trial, Pro, Team only — no self-serve Free card", () => {
    expect(PRICING_PLAN_CARDS.map((card) => card.id)).toEqual([
      "trial",
      "pro",
      "team",
    ]);
    expect(
      PRICING_PLAN_CARDS.some((card) => card.name.toLowerCase() === "free"),
    ).toBe(false);
  });

  it("omits AI credit lines from package card feats", () => {
    const joined = PRICING_PLAN_CARDS.flatMap((card) => card.feats)
      .join(" ")
      .toLowerCase();
    expect(joined.includes("ai credit")).toBe(false);
    expect(joined.includes("credit pack")).toBe(false);
  });

  it("states cancel anytime in trust and FAQ surfaces", () => {
    const trust = PRICING_FAQ_ITEMS.some((item) =>
      item.question.toLowerCase().includes("cancel anytime"),
    );
    expect(trust).toBe(true);
    const cardPrices = PRICING_PLAN_CARDS.map((card) => card.priceLabel);
    expect(cardPrices).toContain("$0");
    expect(cardPrices).toContain("$29");
    expect(cardPrices).toContain("$49");
  });

  it("formats USD with the usd helper (not eur)", () => {
    expect(formatUsd(29)).toBe("$29");
    expect(formatUsd(0.9)).toBe("$0.90");
  });
});

describe("pricing FAQ and compare (EN needles)", () => {
  it("includes cancel anytime and trial copy", () => {
    const blob = PRICING_FAQ_ITEMS.map((item) => item.question + item.answer)
      .join(" ")
      .toLowerCase();
    expect(blob.includes("cancel anytime")).toBe(true);
    expect(blob.includes("first month is free")).toBe(true);
  });

  it("does not ship viewers-are-free sample claims", () => {
    const blob = PRICING_FAQ_ITEMS.map((item) => item.answer)
      .join(" ")
      .toLowerCase();
    expect(blob.includes("viewers are free")).toBe(false);
    expect(blob.includes("viewers do not")).toBe(false);
  });

  it("keeps skill-from-repeat and prompt optimizer outside package cards", () => {
    const cardBlob = PRICING_PLAN_CARDS.flatMap((card) => card.feats)
      .join(" ")
      .toLowerCase();
    expect(cardBlob.includes("prompt optimizer")).toBe(false);
    expect(cardBlob.includes("skill from repeated")).toBe(false);

    const compareBlob = PRICING_COMPARE_SECTIONS.flatMap((section) =>
      section.rows.map((row) => row.feature),
    )
      .join(" ")
      .toLowerCase();
    expect(compareBlob.includes("skill from repeated work")).toBe(true);
    expect(compareBlob.includes("prompt optimizer")).toBe(true);
  });

  it("never uses Agent Witch two-word product name in plan copy", () => {
    const blob = [
      ...PRICING_PLAN_CARDS.flatMap((card) => [card.tag, ...card.feats]),
      ...PRICING_FAQ_ITEMS.map((item) => item.answer),
    ].join(" ");
    expect(blob.includes("Agent Witch")).toBe(false);
    expect(blob.includes("AgentWitch")).toBe(true);
  });
});
