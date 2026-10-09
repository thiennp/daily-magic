import { beforeEach, describe, expect, it, vi } from "vitest";

const lookupMock = vi.hoisted(() => vi.fn());
vi.mock("node:dns/promises", () => ({ lookup: lookupMock }));

import { assertSafeProjectWebhookUrl } from "@/lib/projects/acl/webhooks/assertSafeProjectWebhookUrl";

const resolvesTo = (address: string) =>
  lookupMock.mockResolvedValue([
    { address, family: address.includes(":") ? 6 : 4 },
  ]);
const ask = () => assertSafeProjectWebhookUrl("https://hooks.example.com/x");

describe("assertSafeProjectWebhookUrl IPv6 answers", () => {
  beforeEach(() => lookupMock.mockReset());

  it.each([
    "::",
    "::1",
    "fe80::1",
    "fec0::1",
    "fd00::1",
    "ff02::1",
    "64:ff9b::7f00:1",
    "2002:7f00:1::1",
    "::ffff:7f00:1",
    "2001:db8::1",
  ])("blocks %s", async (address) => {
    resolvesTo(address);
    expect(await ask()).toMatchObject({ ok: false, code: "blocked_host" });
  });

  it("allows a public global unicast address", async () => {
    resolvesTo("2606:4700:4700::1111");
    expect(await ask()).toMatchObject({ ok: true });
  });
});
