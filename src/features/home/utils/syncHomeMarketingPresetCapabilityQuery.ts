import { toPresetMarketplaceCapabilityId } from "@/lib/marketplace/presetMarketplaceCapabilityId";

export const applyPresetCapabilityIdToSearchParams = (
  templateId: string,
  searchParams: URLSearchParams,
): URLSearchParams => {
  const next = new URLSearchParams(searchParams.toString());
  next.set("capabilityId", toPresetMarketplaceCapabilityId(templateId));

  return next;
};

export const removePresetCapabilityIdFromSearchParams = (
  templateId: string,
  searchParams: URLSearchParams,
): URLSearchParams => {
  const capabilityId = toPresetMarketplaceCapabilityId(templateId);
  const next = new URLSearchParams(searchParams.toString());

  if (next.get("capabilityId") === capabilityId) {
    next.delete("capabilityId");
  }

  return next;
};

export const buildPathWithSearchParams = (
  pathname: string,
  searchParams: URLSearchParams,
): string => {
  const query = searchParams.toString();

  return query.length > 0 ? `${pathname}?${query}` : pathname;
};
