"use client";

import { Modal } from "@/components/ui/modal";
import MarketplaceInstallModalContent from "@/features/marketplace/MarketplaceInstallModalContent";
import type HarnessMarketplaceListing from "@/lib/harness/types/HarnessMarketplaceListing.type";

interface MarketplaceInstallModalProps {
  readonly listing: HarnessMarketplaceListing | null;
  readonly onClose: () => void;
}

export default function MarketplaceInstallModal({
  listing,
  onClose,
}: MarketplaceInstallModalProps) {
  return (
    <Modal isOpen={listing !== null} onClose={onClose} className="max-w-lg p-6">
      {listing !== null ? (
        <MarketplaceInstallModalContent listing={listing} onClose={onClose} />
      ) : null}
    </Modal>
  );
}
