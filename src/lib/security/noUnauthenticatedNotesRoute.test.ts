import { existsSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

describe("/api/notes scaffold", () => {
  // The tutorial notes route read and wrote the notes table with no auth.
  // It had no callers and was removed; do not reintroduce it unauthenticated.
  it("stays removed", () => {
    expect(existsSync(join(process.cwd(), "src/app/api/notes/route.ts"))).toBe(
      false,
    );
  });
});
