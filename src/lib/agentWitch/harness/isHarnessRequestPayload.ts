import isHarnessWriterAgent from "./isHarnessWriterAgent";
import { HARNESS_ITEM_KINDS } from "./types/HarnessItemKind.constant";
import type { HarnessItemKind } from "./types/HarnessItemKind.constant";
import type HarnessItemSpec from "./types/HarnessItemSpec.type";
import type HarnessSetSpec from "./types/HarnessSetSpec.type";
import type { HarnessWriterAgent } from "./types/HarnessWriterAgent.constant";

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const isHarnessItemKind = (value: unknown): value is HarnessItemKind =>
  typeof value === "string" &&
  (HARNESS_ITEM_KINDS as readonly string[]).includes(value);

const isHarnessItemSpec = (value: unknown): value is HarnessItemSpec => {
  if (!isRecord(value)) {
    return false;
  }

  return (
    typeof value.id === "string" &&
    value.id.length > 0 &&
    isHarnessItemKind(value.kind) &&
    typeof value.title === "string" &&
    value.title.length > 0 &&
    typeof value.content === "string"
  );
};

const isHarnessSetSpec = (value: unknown): value is HarnessSetSpec => {
  if (!isRecord(value)) {
    return false;
  }

  if (
    typeof value.name !== "string" ||
    value.name.length === 0 ||
    typeof value.slug !== "string" ||
    value.slug.length === 0 ||
    !Array.isArray(value.items)
  ) {
    return false;
  }

  return value.items.every((item) => isHarnessItemSpec(item));
};

export interface HarnessRequestPayload {
  readonly writerAgent: HarnessWriterAgent;
  readonly spec: HarnessSetSpec;
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
    isHarnessSetSpec(payload.spec) &&
    typeof payload.instruction === "string" &&
    payload.instruction.trim().length > 0
  );
};

export default isHarnessRequestPayload;
