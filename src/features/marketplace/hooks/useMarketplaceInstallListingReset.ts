import { useEffect } from "react";

export function useMarketplaceInstallListingReset(
  capabilityId: string,
  refreshDevices: () => void | Promise<void>,
  reset: () => void,
): void {
  useEffect(() => {
    reset();
    void refreshDevices();
  }, [capabilityId, refreshDevices, reset]);
}
