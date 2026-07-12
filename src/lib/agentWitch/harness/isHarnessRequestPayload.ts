import isHarnessWriterAgent from "./isHarnessWriterAgent";
import { HARNESS_ITEM_KINDS } from "./types/HarnessItemKind.constant";
import type { HarnessItemKind } from "./types/HarnessItemKind.constant";
import type HarnessItemWriteSpec from "./types/HarnessItemWriteSpec.type";
import type HarnessRequestSpec from "./types/HarnessRequestSpec.type";
import type { HarnessWriterAgent } from "./types/HarnessWriterAgent.constant";

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const isHarnessItemKind = (value: unknown): value is HarnessItemKind =>
  typeof value === "string" &&
  (HARNESS_ITEM_KINDS as readonly string[]).includes(value);

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
    typeof value.id === "string" &&
    value.id.length > 0 &&
    isHarnessItemKind(value.kind) &&
    typeof value.title === "string" &&
    value.title.length > 0 &&
    typeof value.content === "string" &&
    hasSetSlugs
  );
};

const isHarnessRequestSpec = (value: unknown): value is HarnessRequestSpec => {
  if (!isRecord(value) || typeof value.mode !== "string") {
    return false;
  }

  if (value.mode === "create-set") {
    return (
      typeof value.name === "string" &&
      value.name.length > 0 &&
      typeof value.slug === "string" &&
      value.slug.length > 0
    );
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
    typeof payload.instruction === "string" &&
    payload.instruction.trim().length > 0
  );
};

export default isHarnessRequestPayload;
