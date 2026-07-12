import type HarnessItemSpec from "./HarnessItemSpec.type";

export default interface HarnessItemWriteSpec extends HarnessItemSpec {
  readonly setSlugs: readonly string[];
}
