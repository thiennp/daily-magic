import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

describe("MacDeviceIcon", () => {
  it("HOME-027: defaults to h-4 w-4 shrink-0 when className is omitted", () => {
    const source = readFileSync(
      join(dirname(fileURLToPath(import.meta.url)), "MacDeviceIcon.tsx"),
      "utf8",
    );

    expect(source).toContain('className={className ?? "h-4 w-4 shrink-0"}');
  });
});
