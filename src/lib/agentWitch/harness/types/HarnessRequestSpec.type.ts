import type HarnessItemWriteSpec from "./HarnessItemWriteSpec.type";

export default interface HarnessRequestSpec {
  readonly mode: "create-set" | "write-items";
  readonly name?: string;
  readonly slug?: string;
  readonly items?: readonly HarnessItemWriteSpec[];
}
