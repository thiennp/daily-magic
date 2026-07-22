import os from "node:os";
import { describe, expect, it } from "vitest";

import expandAgentWitchProjectFolderPath from "./expandAgentWitchProjectFolderPath";

describe("expandAgentWitchProjectFolderPath", () => {
  it("expands leading tilde paths", () => {
    expect(expandAgentWitchProjectFolderPath("~/Projects/demo")).toBe(
      `${os.homedir()}/Projects/demo`,
    );
  });
});
