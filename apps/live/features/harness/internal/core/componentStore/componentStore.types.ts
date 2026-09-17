export type ComponentVersionManifestItem = {
  readonly id: string;
  readonly kind: string;
  readonly title: string;
  readonly harnessItemPath: string;
  readonly contentSha256: string;
};

export type ComponentVersionManifest = {
  readonly version: 1;
  readonly componentId: string;
  readonly versionId: string;
  readonly items: readonly ComponentVersionManifestItem[];
  readonly createdAt: string;
};

export type ComponentInstalledIndex = {
  readonly version: 1;
  readonly components: Record<
    string,
    { readonly versionId: string; readonly installedAt: string }
  >;
};
