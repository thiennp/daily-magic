import { describe, expect, it } from "vitest";

import fs from "node:fs";

import { resolveAgentWitchInstallBundleOutfile } from "@agent-witch/install-bundle";

describe("buildAgentWitchInstallBundle output", () => {
  it("AGENT-065: ships a CommonJS bundle without ESM dynamic-require shim", () => {
    const bundlePath = resolveAgentWitchInstallBundleOutfile(process.cwd());
    const source = fs.readFileSync(bundlePath, "utf8");

    expect(source.startsWith("#!/usr/bin/env node")).toBe(true);
    expect(source).toContain('"use strict"');
    expect(source).not.toContain("Dynamic require of");
    expect(source).not.toContain("local.agentwitch.com");
    expect(source).toContain("127.0.0.1");
  });
});
