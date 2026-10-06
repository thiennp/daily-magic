import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

import { describe, expect, it } from "vitest";

const SELF_TEST = fileURLToPath(
  new URL("./testAwlMacSigning.sh", import.meta.url),
);

describe("AWL Mac signing helpers", () => {
  it("mask secrets, gate dry-run steps and resolve the signing mode", () => {
    const output = execFileSync("bash", [SELF_TEST], { encoding: "utf8" });
    expect(output).toContain("ALL PASSED");
  });
});
