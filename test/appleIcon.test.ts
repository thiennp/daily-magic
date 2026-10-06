import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

import { describe, expect, it } from "vitest";

const APP_DIR = path.join(process.cwd(), "src/app");

/** Next.js only serves apple-icon as .png/.jpg; an .svg is ignored (404). */
describe("apple-touch-icon", () => {
  it("ships src/app/apple-icon.png at 180x180", () => {
    const filePath = path.join(APP_DIR, "apple-icon.png");
    expect(existsSync(filePath)).toBe(true);
    const bytes = readFileSync(filePath);
    expect(bytes.subarray(1, 4).toString("ascii")).toBe("PNG");
    expect(bytes.readUInt32BE(16)).toBe(180);
    expect(bytes.readUInt32BE(20)).toBe(180);
  });
});
