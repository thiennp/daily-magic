import { describe, expect, it } from "vitest";

import {
  isSafeBundleRelativePath,
  isTrustedUpdateOrigin,
  resolveBundleTarget,
} from "./safeBundleDownload";

describe("safe bundle download", () => {
  it("accepts plain bundle file names and refuses anything that climbs or is absolute", () => {
    for (const ok of ["agent-witch.js", "scripts/a.sh", "lib/x/y-1.2.mjs"]) {
      expect(isSafeBundleRelativePath(ok)).toBe(true);
    }
    for (const bad of [
      "../../Library/LaunchAgents/x.plist",
      "/etc/passwd",
      "a/../../b",
      ".zshrc",
      "a//b",
      "",
    ]) {
      expect(isSafeBundleRelativePath(bad)).toBe(false);
    }
    expect(resolveBundleTarget("/i", "scripts/a.sh")).toBe("/i/scripts/a.sh");
    expect(resolveBundleTarget("/i", "../x")).toBeNull();
  });

  it("downloads code only over https, or from this computer", () => {
    expect(isTrustedUpdateOrigin("https://www.agentwitch.com")).toBe(true);
    expect(isTrustedUpdateOrigin("http://127.0.0.1:3000")).toBe(true);
    expect(isTrustedUpdateOrigin("http://evil.example")).toBe(false);
    expect(isTrustedUpdateOrigin("ftp://x")).toBe(false);
    expect(isTrustedUpdateOrigin("not a url")).toBe(false);
  });
});
