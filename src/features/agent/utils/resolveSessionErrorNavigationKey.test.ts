import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

import { resolveSessionErrorNavigationKey } from "@/features/agent/utils/resolveSessionErrorNavigationKey";

describe("resolveSessionErrorNavigationKey (d7110873)", () => {
  it("changes on another page and on a fresh New task open", () => {
    const docked = resolveSessionErrorNavigationKey({
      pathname: "/",
      isSendTaskOpen: false,
    });
    expect(
      resolveSessionErrorNavigationKey({ pathname: "/", isSendTaskOpen: true }),
    ).not.toBe(docked);
    expect(
      resolveSessionErrorNavigationKey({
        pathname: "/projects",
        isSendTaskOpen: false,
      }),
    ).not.toBe(docked);
  });

  it("is wired into the panel error hooks", () => {
    const source = readFileSync(
      "src/features/agent/hooks/useClearStaleMacDispatchError.ts",
      "utf8",
    );
    expect(source).toContain("useClearSessionErrorOnNavigate({");
  });
});
