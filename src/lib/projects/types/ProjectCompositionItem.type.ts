export default interface ProjectCompositionItem {
  readonly id: string;
  readonly kind: "harness" | "workflow" | "agent";
  readonly name: string;
  readonly versionLabel: string | null;
}
