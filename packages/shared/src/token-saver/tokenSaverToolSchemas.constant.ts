import {
  CHECK_CONTEXT_TOOL_SCHEMA,
  GET_CONTEXT_TOOL_SCHEMA,
  GET_PITFALLS_TOOL_SCHEMA,
} from "./tokenSaverToolSchemasA.constant";
import {
  GET_SKILL_TOOL_SCHEMA,
  RECORD_OUTCOME_TOOL_SCHEMA,
} from "./tokenSaverToolSchemasB.constant";

export const TOKEN_SAVER_TOOL_NAMES = [
  "check_context",
  "get_context",
  "get_pitfalls",
  "get_skill",
  "record_outcome",
] as const;

export type TokenSaverToolName = (typeof TOKEN_SAVER_TOOL_NAMES)[number];

export {
  CHECK_CONTEXT_TOOL_SCHEMA,
  GET_CONTEXT_TOOL_SCHEMA,
  GET_PITFALLS_TOOL_SCHEMA,
  GET_SKILL_TOOL_SCHEMA,
  RECORD_OUTCOME_TOOL_SCHEMA,
};

export const TOKEN_SAVER_TOOL_SCHEMAS = [
  CHECK_CONTEXT_TOOL_SCHEMA,
  GET_CONTEXT_TOOL_SCHEMA,
  GET_PITFALLS_TOOL_SCHEMA,
  GET_SKILL_TOOL_SCHEMA,
  RECORD_OUTCOME_TOOL_SCHEMA,
] as const;
