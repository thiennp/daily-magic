import { isOneOf } from "guardz";

import {
  HARNESS_WRITER_AGENTS,
  type HarnessWriterAgent,
} from "./types/HarnessWriterAgent.constant";

const isHarnessWriterAgent = (value: unknown): value is HarnessWriterAgent =>
  isOneOf(...HARNESS_WRITER_AGENTS)(value);

export default isHarnessWriterAgent;
