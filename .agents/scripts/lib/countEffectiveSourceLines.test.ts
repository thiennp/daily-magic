import { describe, expect, it } from "vitest";

import { countEffectiveSourceLines } from "./countEffectiveSourceLines";

describe("countEffectiveSourceLines", () => {
  it("excludes blank lines and import statements", () => {
    const content = `
import { memo } from "react";
import type { UserDTO } from "@/types/UserDTO.type";

const VALUE = 1;

export const buildUserLabel = (user: UserDTO): string => user.name;
`;

    expect(countEffectiveSourceLines(content)).toBe(2);
  });

  it("excludes multiline import statements", () => {
    const content = `
import {
  alpha,
  beta,
} from "gamma";

export const total = alpha + beta;
`;

    expect(countEffectiveSourceLines(content)).toBe(1);
  });

  it("excludes side-effect imports", () => {
    const content = `
import "./globals.css";

export const READY = true;
`;

    expect(countEffectiveSourceLines(content)).toBe(1);
  });
});
