import { describe, expect, it, vi } from "vitest";

import {
  assertAgentWitchNodeRuntimeVersion,
  buildAgentWitchNodeRuntimeTooOldMessage,
} from "./assertAgentWitchNodeRuntimeVersion";

describe("assertAgentWitchNodeRuntimeVersion", () => {
  it("AGENT-065: describes the minimum Node version in user-facing errors", () => {
    const message = buildAgentWitchNodeRuntimeTooOldMessage("v18.20.0");

    expect(message).toContain("20.x");
    expect(message).toContain("v18.20.0");
    expect(message).toContain("nodejs.org");
  });

  it("AGENT-065: exits when Node major is below the supported floor", () => {
    const exitSpy = vi.spyOn(process, "exit").mockImplementation(((
      code?: number | string | null,
    ) => {
      throw new Error(`exit:${String(code)}`);
    }) as never);
    const stderrSpy = vi
      .spyOn(process.stderr, "write")
      .mockImplementation(() => true);

    Object.defineProperty(process, "version", { value: "v16.20.0" });

    expect(() => assertAgentWitchNodeRuntimeVersion()).toThrow("exit:1");
    expect(stderrSpy).toHaveBeenCalled();
    expect(exitSpy).toHaveBeenCalledWith(1);

    exitSpy.mockRestore();
    stderrSpy.mockRestore();
  });
});
