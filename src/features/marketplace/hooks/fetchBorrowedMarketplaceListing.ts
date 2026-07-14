import type { BorrowedMarketplaceListingState } from "@/features/marketplace/hooks/borrowedMarketplaceListingState.type";

export default async function fetchBorrowedMarketplaceListing(
  capabilityId: string,
): Promise<BorrowedMarketplaceListingState | null> {
  const response = await fetch(`/api/harness/marketplace/${capabilityId}`);
  if (!response.ok) {
    return null;
  }

  const data: unknown = await response.json();
  if (
    typeof data !== "object" ||
    data === null ||
    !("borrow" in data) ||
    typeof (data as { borrow: BorrowedMarketplaceListingState }).borrow !==
      "object"
  ) {
    return null;
  }

  return (data as { borrow: BorrowedMarketplaceListingState }).borrow;
}
