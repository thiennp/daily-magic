import { describe, expect, it } from "vitest";

import { PRODUCT_CONNECT_UPDATES } from "@/lib/agentAccess/productConnectUpdates.constant";

describe("product connect catalog — poll inbox (no cloudflare receiver)", () => {
  it("does not ship the deprecated local-wake-receiver entry", () => {
    expect(
      PRODUCT_CONNECT_UPDATES.some((e) => e.id === "local-wake-receiver"),
    ).toBe(false);
  });

  it("announces poll inbox delivery at catalog v28", () => {
    const entry = PRODUCT_CONNECT_UPDATES.find(
      (e) => e.id === "poll-inbox-delivery-no-tunnel",
    );
    expect(entry?.catalogVersion).toBe(28);
    expect(entry?.adapt).toMatch(/delivery_mode poll/i);
    expect(entry?.adapt).toMatch(/deprecated/i);
    expect(entry?.summary).not.toMatch(/behind a cloudflared tunnel/i);
  });
});
