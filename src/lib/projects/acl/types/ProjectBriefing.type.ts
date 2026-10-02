export type ProjectBriefingPeer = {
  readonly projectDisplayName: string | null;
  readonly teamLabel: string | null;
};

export type ProjectBriefing = {
  readonly projectId: string;
  readonly projectName: string;
  readonly caller: {
    readonly projectDisplayName: string | null;
    readonly teamLabel: string | null;
  };
  readonly peers: readonly ProjectBriefingPeer[];
  readonly howToDispatch: string;
  readonly playbooks: {
    readonly boundHarnessSetSlugs: readonly string[];
    readonly note: string | null;
  };
  readonly briefingText: string;
};
