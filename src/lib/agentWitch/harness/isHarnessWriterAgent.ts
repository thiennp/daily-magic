import {
  HARNESS_WRITER_AGENTS,
  type HarnessWriterAgent,
} from "./types/HarnessWriterAgent.constant";

const isHarnessWriterAgent = (value: unknown): value is HarnessWriterAgent =>
  typeof value === "string" &&
  (HARNESS_WRITER_AGENTS as readonly string[]).includes(value);

export default isHarnessWriterAgent;
