import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

import { AWC_PROJECT_MESSENGER_COPY } from "@/features/projects/messenger/awcProjectMessengerCopy.constant";

const walk = (dir: string): string[] => {
  const out: string[] = [];
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) {
      out.push(...walk(path));
    } else if (/\.(ts|tsx)$/.test(name) && !name.endsWith(".test.ts")) {
      out.push(path);
    }
  }
  return out;
};

describe("AWC_PROJECT_MESSENGER_COPY", () => {
  it("keeps forbidden jargon out of user-facing copy", () => {
    const blob = JSON.stringify(AWC_PROJECT_MESSENGER_COPY).toLowerCase();
    expect(blob).not.toContain("project_messenger_reply");
    expect(blob).not.toContain("hmac");
    expect(blob).not.toContain("dor");
  });

  it("messenger sources never mention project_messenger_reply", () => {
    const root = join(process.cwd(), "src/features/projects/messenger");
    for (const file of walk(root)) {
      const source = readFileSync(file, "utf8");
      expect(source.includes("project_messenger_reply")).toBe(false);
    }
  });
});
