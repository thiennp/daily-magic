import { readFileSync } from "node:fs";
import path from "node:path";

import { describe, expect, it } from "vitest";

const stripComments = (source: string): string =>
  source
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/^\s*\/\/.*$/gm, "");

const pathDisplaySource = stripComments(
  readFileSync(
    path.join(process.cwd(), "src/features/projects/AwcProjectPathDisplay.tsx"),
    "utf8",
  ),
);

const headerSource = stripComments(
  readFileSync(
    path.join(process.cwd(), "src/features/projects/AwcProjectDetailHeader.tsx"),
    "utf8",
  ),
);

describe("AwcProjectPathDisplay", () => {
  it("does not use CSS rtl direction (avoids ~/ flip)", () => {
    expect(pathDisplaySource).not.toMatch(/direction\s*:\s*rtl/);
    expect(pathDisplaySource).not.toMatch(/\bdir=["']rtl["']/);
    expect(pathDisplaySource).not.toMatch(/\brtl:/);
    expect(pathDisplaySource).toContain("formatProjectPathTruncation");
    expect(pathDisplaySource).toContain("<bdi>");
    expect(pathDisplaySource).toContain("min-w-0");
    expect(pathDisplaySource).toContain("overflow-hidden");
    expect(pathDisplaySource).toContain("text-ellipsis");
  });

  it("header meta row keeps min-w-0 so mobile path can shrink", () => {
    expect(headerSource).toContain("AwcProjectPathDisplay");
    expect(headerSource).toMatch(/min-w-0/);
    expect(headerSource).toMatch(/overflow-hidden|min-w-0 max-w-full/);
  });
});
