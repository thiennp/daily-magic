import {
  isHarnessSharingVisibility,
  type HarnessSharingVisibilityValue,
} from "@/lib/harness/HarnessSharingVisibility.constant";

export const parseHarnessSharingVisibilityBody = (
  body: unknown,
): HarnessSharingVisibilityValue | undefined => {
  if (!body || typeof body !== "object") {
    return undefined;
  }

  const visibility = (body as { readonly visibility?: unknown }).visibility;

  if (
    typeof visibility === "string" &&
    isHarnessSharingVisibility(visibility)
  ) {
    return visibility;
  }

  return undefined;
};
