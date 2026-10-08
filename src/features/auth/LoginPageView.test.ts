import { readFileSync } from "node:fs";
import path from "node:path";

import { describe, expect, it } from "vitest";

const read = (file: string) =>
  readFileSync(path.join(process.cwd(), "src/features/auth", file), "utf8");

describe("LoginPageView layout (design: single centered card)", () => {
  it("renders one centered card instead of a two-column hero", () => {
    const view = read("LoginPageView.tsx");
    const card = read("LoginCard.tsx");
    expect(view).not.toMatch(/lg:grid-cols-2/);
    expect(view).toMatch(/<LoginCard/);
    expect(card).toMatch(/max-w-\[440px\]/);
  });
});
