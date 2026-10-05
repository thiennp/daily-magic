import { timingSafeEqual } from "node:crypto";

import { computePkceS256Challenge } from "@/lib/agentWitch/macBootstrap/computePkceS256Challenge";

export const verifyPkceS256 = (input: {
  readonly codeVerifier: string;
  readonly codeChallenge: string;
}): boolean => {
  const expected = computePkceS256Challenge(input.codeVerifier);
  const actual = input.codeChallenge.trim();
  if (expected.length !== actual.length) {
    return false;
  }
  return timingSafeEqual(Buffer.from(expected), Buffer.from(actual));
};
