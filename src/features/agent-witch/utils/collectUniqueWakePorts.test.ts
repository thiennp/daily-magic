import { describe, expect, it } from "vitest";

import { collectUniqueWakePorts } from "@/features/agent-witch/utils/collectUniqueWakePorts";

describe("collectUniqueWakePorts", () => {
  it("deduplicates valid wake ports", () => {
    expect(collectUniqueWakePorts([47_892, 64_616, 47_892, null, 0])).toEqual([
      47_892, 64_616,
    ]);
  });
});
