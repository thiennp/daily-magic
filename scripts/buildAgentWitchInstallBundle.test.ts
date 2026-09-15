import { describe, expect, it } from "vitest";

import fs from "node:fs";
import path from "node:path";

import { AGENT_WITCH_APP_BUNDLE_FILE_NAME } from "@/lib/agentWitch/agentWitchInstallApp.constant";

describe("buildAgentWitchInstallBundle output", () => {
  it("AGENT-065: ships a CommonJS bundle without ESM dynamic-require shim", () => {
    const bundlePath = path.join(
      process.cwd(),
      "public/install/agent-witch/app",
      AGENT_WITCH_APP_BUNDLE_FILE_NAME,
    );
    const source = fs.readFileSync(bundlePath, "utf8");

    expect(source.startsWith("#!/usr/bin/env node")).toBe(true);
    expect(source).toContain('"use strict"');
    expect(source).not.toContain("Dynamic require of");
  });
});
