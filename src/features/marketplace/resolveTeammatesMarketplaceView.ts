export type TeammatesMarketplaceView =
  "list" | "guest_auth" | "signed_in_empty_team" | "signed_in_empty_solo";

export function resolveTeammatesMarketplaceView(input: {
  readonly isSignedIn: boolean;
  readonly listingCount: number;
  readonly teamNavEnabled: boolean;
}): TeammatesMarketplaceView {
  if (!input.isSignedIn) {
    return "guest_auth";
  }

  if (input.listingCount > 0) {
    return "list";
  }

  return input.teamNavEnabled ? "signed_in_empty_team" : "signed_in_empty_solo";
}
