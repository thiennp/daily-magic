import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

import { describe, expect, it } from "vitest";

const SELF_TEST = fileURLToPath(
  new URL("./testAwlMacSigning.sh", import.meta.url),
);

// The shell self-test spawns many fake security/codesign runs; under full-suite load it can exceed vitest's 5s default.
const SELF_TEST_TIMEOUT_MS = 60_000;

describe("AWL Mac signing helpers", () => {
  it(
    "mask secrets, gate dry-run steps and resolve the signing mode",
    () => {
      const output = execFileSync("bash", [SELF_TEST], { encoding: "utf8" });
      expect(output).toContain("ALL PASSED");
    },
    SELF_TEST_TIMEOUT_MS,
  );
});
