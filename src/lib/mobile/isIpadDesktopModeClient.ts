/**
 * iPadOS Safari defaults to a desktop Mac UA ("Macintosh", platform "MacIntel").
 * Real Macs report `maxTouchPoints === 0`; iPads report 5.
 */
export default function isIpadDesktopModeClient(input: {
  readonly platform: string | null;
  readonly userAgent: string | null;
  readonly maxTouchPoints: number;
}): boolean {
  const looksLikeMac = /mac/i.test(
    `${input.platform ?? ""} ${input.userAgent ?? ""}`,
  );

  return looksLikeMac && input.maxTouchPoints > 1;
}
