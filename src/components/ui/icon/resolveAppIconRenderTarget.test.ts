import { describe, expect, it } from "vitest";

import { resolveAppIconRenderTarget } from "@/components/ui/icon/resolveAppIconRenderTarget";

describe("resolveAppIconRenderTarget", () => {
  it("resolves a React component export", () => {
    const Icon = () => null;
    expect(resolveAppIconRenderTarget(Icon)).toEqual({
      kind: "component",
      Icon,
    });
  });

  it("resolves a default image URL export", () => {
    expect(resolveAppIconRenderTarget({ default: "/icons/bolt.svg" })).toEqual({
      kind: "image",
      src: "/icons/bolt.svg",
    });
  });
});
