import { delay, http, HttpResponse } from "msw";

import type HarnessMarketplaceListing from "@/lib/harness/types/HarnessMarketplaceListing.type";
import listPresetMarketplaceListings from "@/lib/marketplace/listPresetMarketplaceListings";
import type { StorybookPageStatus } from "@/utils/storybook/storybookPageStatus.constant";

export const awcStorybookMarketplaceLoadingHandler = http.get(
  "/api/harness/marketplace",
  async () => {
    await delay("infinite");
  },
);

export const awcStorybookMarketplaceErrorHandler = http.get(
  "/api/harness/marketplace",
  () => HttpResponse.json({ error: "Server error" }, { status: 500 }),
);

const marketplaceListingsForStatus = (
  status: StorybookPageStatus,
): readonly HarnessMarketplaceListing[] => {
  if (status === "empty") {
    return [];
  }

  return listPresetMarketplaceListings();
};

export const createAwcStorybookMarketplaceSuccessHandler = (
  status: StorybookPageStatus,
) =>
  http.get("/api/harness/marketplace", () =>
    HttpResponse.json({
      ok: true,
      listings: marketplaceListingsForStatus(status),
    }),
  );
