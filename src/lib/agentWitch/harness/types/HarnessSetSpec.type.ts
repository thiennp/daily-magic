import type HarnessItemSpec from "./HarnessItemSpec.type";

export default interface HarnessSetSpec {
  readonly name: string;
  readonly slug: string;
  readonly items: readonly HarnessItemSpec[];
}
