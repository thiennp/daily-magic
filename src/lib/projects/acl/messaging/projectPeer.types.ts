export type ProjectPeerSelf = {
  readonly projectDisplayName: string | null;
  readonly teamLabel: string | null;
  readonly isAgent: boolean;
  /** Membership UUID when the actor is a member; null for owner-self (no membership row). */
  readonly membershipId?: string | null;
};

export type ProjectPeer = {
  readonly projectDisplayName: string | null;
  readonly teamLabel: string | null;
  readonly isAgent: boolean;
  readonly isOwner: boolean;
  /** Membership UUID for agent peers; null/omitted for owner peer (no membership row). */
  readonly membershipId?: string | null;
};

export type ListProjectPeersResult =
  | {
      readonly ok: true;
      readonly self: ProjectPeerSelf;
      readonly peers: readonly ProjectPeer[];
    }
  | { readonly ok: false; readonly code: "forbidden" };
