import { HarnessSharingVisibility } from "@/lib/harness/HarnessSharingVisibility.constant";
import type { HarnessSetSharingVisibilityValue } from "@/lib/harness/harnessSetSharingQueries";

const SET_SHARING_VALUES: readonly HarnessSetSharingVisibilityValue[] = [
  "inherit",
  HarnessSharingVisibility.PRIVATE,
  HarnessSharingVisibility.GROUP,
  HarnessSharingVisibility.PUBLIC,
];

export interface HarnessSetSharingBody {
  readonly setSlug: string;
  readonly visibility: HarnessSetSharingVisibilityValue;
}

export const parseHarnessSetSharingBody = (
  body: unknown,
): HarnessSetSharingBody | null => {
  if (typeof body !== "object" || body === null) {
    return null;
  }

  const setSlug =
    "setSlug" in body && typeof body.setSlug === "string"
      ? body.setSlug.trim()
      : "";
  const visibility =
    "visibility" in body && typeof body.visibility === "string"
      ? body.visibility
      : "";

  if (
    setSlug.length === 0 ||
    !SET_SHARING_VALUES.includes(visibility as HarnessSetSharingVisibilityValue)
  ) {
    return null;
  }

  return {
    setSlug,
    visibility: visibility as HarnessSetSharingVisibilityValue,
  };
};
