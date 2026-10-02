export type ProjectPeerSelf = {
  readonly projectDisplayName: string | null;
  readonly teamLabel: string | null;
  readonly isAgent: boolean;
};

export type ProjectPeer = {
  readonly projectDisplayName: string | null;
  readonly teamLabel: string | null;
  readonly isAgent: boolean;
  readonly isOwner: boolean;
};

export type ListProjectPeersResult =
  | {
      readonly ok: true;
      readonly self: ProjectPeerSelf;
      readonly peers: readonly ProjectPeer[];
    }
  | { readonly ok: false; readonly code: "forbidden" };
