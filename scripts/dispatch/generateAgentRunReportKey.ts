import { randomUUID } from "node:crypto";

/** Unique filename key for a single Mac agent run report file. */
export const generateAgentRunReportKey = (): string => randomUUID();
