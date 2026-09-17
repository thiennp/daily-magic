export default interface ProjectCompositionItem {
  readonly id: string;
  readonly componentId: string;
  readonly kind: "harness" | "workflow" | "agent";
  readonly name: string;
  readonly versionLabel: string | null;
}
