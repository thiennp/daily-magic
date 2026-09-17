import { isNonEmptyString, isOneOf, isString } from "guardz";

import isRecord from "@/lib/agentWitch/isRecord";
import isHarnessWriterAgent from "./isHarnessWriterAgent";
import { HARNESS_ITEM_KINDS } from "./types/HarnessItemKind.constant";
import type { HarnessItemKind } from "./types/HarnessItemKind.constant";
import type HarnessItemWriteSpec from "./types/HarnessItemWriteSpec.type";
import type HarnessRequestSpec from "./types/HarnessRequestSpec.type";
import type { HarnessWriterAgent } from "./types/HarnessWriterAgent.constant";

const isHarnessItemKind = (value: unknown): value is HarnessItemKind =>
  isOneOf(...HARNESS_ITEM_KINDS)(value);

const isHarnessItemWriteSpec = (
  value: unknown,
): value is HarnessItemWriteSpec => {
  if (!isRecord(value)) {
    return false;
  }

  const setSlugs = value.setSlugs;
  const hasSetSlugs =
    Array.isArray(setSlugs) &&
    setSlugs.length > 0 &&
    setSlugs.every(
      (slug) => typeof slug === "string" && slug.trim().length > 0,
    );

  return (
    isNonEmptyString(value.id) &&
    isHarnessItemKind(value.kind) &&
    isNonEmptyString(value.title) &&
    isString(value.content) &&
    hasSetSlugs
  );
};

const isHarnessRequestSpec = (value: unknown): value is HarnessRequestSpec => {
  if (!isRecord(value) || typeof value.mode !== "string") {
    return false;
  }

  if (value.mode === "create-set") {
    return isNonEmptyString(value.name) && isNonEmptyString(value.slug);
  }

  if (value.mode === "write-items") {
    return (
      Array.isArray(value.items) &&
      value.items.length > 0 &&
      value.items.every((item) => isHarnessItemWriteSpec(item))
    );
  }

  return false;
};

export interface HarnessRequestPayload {
  readonly writerAgent: HarnessWriterAgent;
  readonly spec: HarnessRequestSpec;
  readonly instruction: string;
}

const isHarnessRequestPayload = (
  payload: unknown,
): payload is HarnessRequestPayload => {
  if (!isRecord(payload)) {
    return false;
  }

  return (
    isHarnessWriterAgent(payload.writerAgent) &&
    isHarnessRequestSpec(payload.spec) &&
    isNonEmptyString(payload.instruction)
  );
};

export default isHarnessRequestPayload;
