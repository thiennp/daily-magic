import type HarnessItemWriteSpec from "./HarnessItemWriteSpec.type";

export default interface HarnessInstallBundle {
  readonly name: string;
  readonly slug: string;
  readonly items: readonly HarnessItemWriteSpec[];
}
