export type ProjectBriefingPeer = {
  readonly projectDisplayName: string | null;
  readonly teamLabel: string | null;
  /** Present when list_project_peers / ACL expose it; Softvale prefers this for dispatch. */
  readonly membershipId?: string | null;
};

export type ProjectBriefing = {
  readonly projectId: string;
  readonly projectName: string;
  readonly caller: {
    readonly projectDisplayName: string | null;
    readonly teamLabel: string | null;
    readonly membershipId?: string | null;
  };
  readonly peers: readonly ProjectBriefingPeer[];
  readonly howToDispatch: string;
  readonly playbooks: {
    readonly boundHarnessSetSlugs: readonly string[];
    readonly note: string | null;
  };
  readonly briefingText: string;
};
