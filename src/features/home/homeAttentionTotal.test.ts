import { readFileSync } from "node:fs";
import { describe, expect, it, vi } from "vitest";

import {
  publishHomeAttentionTotal,
  readHomeAttentionTotal,
  subscribeHomeAttentionTotal,
} from "@/features/home/utils/homeAttentionTotalStore";

describe("Home attention total (a13083ee)", () => {
  it("shares one total between the badge and the greeting", () => {
    const listener = vi.fn();
    const stop = subscribeHomeAttentionTotal(listener);
    publishHomeAttentionTotal(6);
    publishHomeAttentionTotal(6);
    expect(readHomeAttentionTotal()).toBe(6);
    expect(listener).toHaveBeenCalledTimes(1);
    publishHomeAttentionTotal(null);
    stop();
  });

  it("greeting reads the panel total and rows show their age", () => {
    const head = readFileSync("src/features/home/HomePageHead.tsx", "utf8");
    expect(head).toContain("panelTotal ?? attentionRuns.length");
    const row = readFileSync("src/features/home/HomeAttentionRow.tsx", "utf8");
    expect(row).toContain("formatRelativeTimeAgo(run.updatedAt, nowMs)");
  });
});
