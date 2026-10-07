import { describe, expect, it } from "vitest";

import { isPublicWakeLinkHost as isPublic } from "@/features/projects/access/utils/isPublicWakeLinkHost";

describe("isPublicWakeLinkHost (DF-036 F10, mirrors assertSafeProjectWebhookUrl)", () => {
  it.each(["grok.example.com", "hooks.x.ai", "8.8.8.8", "[2606:4700::1111]", "172.32.0.1", "100.128.0.1"])(
    "%s is public",
    (host) => expect(isPublic(host)).toBe(true),
  );

  it.each([
    "localhost",
    "api.localhost",
    "printer.local",
    "box.internal",
    "nas.lan",
    "intranet",
    "127.0.0.1",
    "10.1.2.3",
    "172.16.0.1",
    "192.168.0.10",
    "169.254.169.254",
    "100.64.0.1",
    "0.0.0.0",
    "[::1]",
    "[fd00::1]",
    "[fe80::1]",
    "[::ffff:192.168.1.1]",
  ])("%s is not public", (host) => expect(isPublic(host)).toBe(false));
});
