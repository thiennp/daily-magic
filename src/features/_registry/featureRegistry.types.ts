export type FeatureMigrationStatus =
  "documented" | "in_progress" | "migrated" | "planned";

export interface FeatureRegistryEntry {
  readonly slug: string;
  readonly title: string;
  readonly purpose: string;
  readonly featurePath: string;
  readonly libPath: string | null;
  readonly routePaths: readonly string[];
  readonly apiPaths: readonly string[];
  readonly dependsOn: readonly string[];
  readonly migrationStatus: FeatureMigrationStatus;
}
