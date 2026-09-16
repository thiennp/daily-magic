import { buildHomePopularPresetMarketplaceCallbackPath } from "@/features/home/utils/buildHomePopularPresetMarketplaceCallbackPath";

export const buildHomePopularPresetSignInHref = (
  templateId: string,
): string => {
  const callbackPath =
    buildHomePopularPresetMarketplaceCallbackPath(templateId);

  return `/login?callbackUrl=${encodeURIComponent(callbackPath)}`;
};
